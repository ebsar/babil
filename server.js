import 'dotenv/config'
import express from 'express'
import nodemailer from 'nodemailer'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = Number.parseInt(process.env.PORT ?? '3001', 10)
const DIST_DIR = path.join(__dirname, 'dist')
const DIST_INDEX = path.join(DIST_DIR, 'index.html')
const DATA_DIR = path.join(__dirname, 'data')
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'contact-submissions.ndjson')
const DEFAULT_TO_EMAIL = 'info@babiltranslation.com'

const serviceLabels = {
  'document-translation': 'Document Translation',
  'live-interpretation': 'Live Interpretation',
  'certified-translation': 'Certified Translation',
  'business-localization': 'Business Localization',
  'legal-services': 'Legal Services',
}

const languageLabels = {
  en: 'English',
  es: 'Spanish',
  bs: 'Bosnian',
  sq: 'Albanian',
}

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  service: z.enum([
    'document-translation',
    'live-interpretation',
    'certified-translation',
    'business-localization',
    'legal-services',
  ]),
  message: z.string().trim().min(20).max(2500),
  language: z.enum(['en', 'es', 'bs', 'sq']),
  website: z.string().optional().default(''),
})

function createTransporter() {
  const host = process.env.SMTP_HOST
  if (!host) {
    return null
  }

  const port = Number.parseInt(process.env.SMTP_PORT ?? '587', 10)
  const secure =
    (process.env.SMTP_SECURE ?? '').toLowerCase() === 'true' || port === 465

  const transportConfig = {
    host,
    port,
    secure,
  }

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transportConfig.auth = {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  }

  return nodemailer.createTransport(transportConfig)
}

const transporter = createTransporter()

async function saveSubmission(submission) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.appendFile(SUBMISSIONS_FILE, `${JSON.stringify(submission)}\n`, 'utf8')
}

async function sendNotification(submission) {
  if (!transporter) {
    return false
  }

  const to = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER

  if (!from) {
    return false
  }

  await transporter.sendMail({
    to,
    from,
    replyTo: submission.email,
    subject: `New Babil contact request: ${submission.firstName} ${submission.lastName}`,
    text: [
      `First name: ${submission.firstName}`,
      `Last name: ${submission.lastName}`,
      `Email: ${submission.email}`,
      `Language: ${languageLabels[submission.language]}`,
      `Service: ${serviceLabels[submission.service]}`,
      '',
      'Message:',
      submission.message,
      '',
      `Received at: ${submission.receivedAt}`,
      `IP address: ${submission.ipAddress}`,
      `User agent: ${submission.userAgent}`,
    ].join('\n'),
  })

  return true
}

const app = express()

app.use(express.json({ limit: '1mb' }))

app.post('/api/contact', async (req, res) => {
  try {
    const honeypot =
      typeof req.body?.website === 'string' ? req.body.website.trim() : ''

    if (honeypot) {
      return res.status(200).json({ ok: true })
    }

    const parsed = contactSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(422).json({
        error: 'Please complete all required fields correctly.',
      })
    }

    const submission = {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
      ipAddress:
        req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ??
        req.socket.remoteAddress ??
        '',
      userAgent: req.get('user-agent') ?? '',
    }

    await saveSubmission(submission)

    let emailSent = false

    try {
      emailSent = await sendNotification(submission)
    } catch (error) {
      console.error('Contact email delivery failed:', error)
    }

    return res.status(200).json({ ok: true, emailSent })
  } catch (error) {
    console.error('Contact form request failed:', error)
    return res.status(500).json({
      error: 'Unable to process the contact request right now.',
    })
  }
})

const distExists = await fs
  .access(DIST_INDEX)
  .then(() => true)
  .catch(() => false)

if (distExists) {
  app.use(express.static(DIST_DIR))
  app.get(/.*/, (_req, res) => {
    res.sendFile(DIST_INDEX)
  })
}

app.listen(PORT, () => {
  console.log(`Contact server running at http://localhost:${PORT}`)
})
