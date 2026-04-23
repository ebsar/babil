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
const DEFAULT_TO_EMAIL = 'info@hidrotoni.com'

const serviceLabels = {
  'drain-cleaning': 'Plumbing & Drain Services',
  'water-pipe-installation': 'Water & Pipe Installation Services',
  'residential-plumbing': 'Residential Plumbing',
  'commercial-plumbing': 'Commercial Plumbing',
  'emergency-repairs': 'Emergency Leak or Backup',
  'water-heater-service': 'Water Heater / Fixture Service',
}

const propertyTypeLabels = {
  residential: 'Residential',
  commercial: 'Commercial',
}

const urgencyLabels = {
  emergency: 'Emergency request',
  'same-day': 'As soon as possible',
  'this-week': 'This week',
  planning: 'Planning a project',
}

const languageLabels = {
  en: 'English',
  sq: 'Albanian',
}

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(''),
  service: z.enum([
    'drain-cleaning',
    'water-pipe-installation',
    'residential-plumbing',
    'commercial-plumbing',
    'emergency-repairs',
    'water-heater-service',
  ]),
  propertyType: z.enum(['residential', 'commercial']).default('residential'),
  urgency: z.enum(['emergency', 'same-day', 'this-week', 'planning']).default('same-day'),
  language: z.enum(['en', 'sq']).default('en'),
  message: z.string().trim().min(10).max(2500),
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
const hasEmailDeliveryConfig = Boolean(
  transporter && (process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER),
)

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
    subject: `New HIDRO TONI service request: ${submission.firstName} ${submission.lastName}`,
    text: [
      `First name: ${submission.firstName}`,
      `Last name: ${submission.lastName}`,
      `Email: ${submission.email}`,
      `Phone: ${submission.phone || 'Not provided'}`,
      `Service: ${serviceLabels[submission.service]}`,
      `Property type: ${propertyTypeLabels[submission.propertyType]}`,
      `Timing: ${urgencyLabels[submission.urgency]}`,
      `Website language: ${languageLabels[submission.language]}`,
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

    let stored = false
    let emailSent = false

    try {
      await saveSubmission(submission)
      stored = true
    } catch (error) {
      console.error('Contact submission storage failed:', error)
    }

    try {
      emailSent = await sendNotification(submission)
    } catch (error) {
      console.error('Contact email delivery failed:', error)
    }

    if (stored || emailSent) {
      return res.status(200).json({ ok: true, stored, emailSent })
    }

    return res.status(hasEmailDeliveryConfig ? 500 : 503).json({
      error: hasEmailDeliveryConfig
        ? 'Unable to process the contact request right now.'
        : 'Contact form delivery is not configured on the server.',
    })
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
  console.log(`HIDRO TONI contact server running at http://localhost:${PORT}`)
})
