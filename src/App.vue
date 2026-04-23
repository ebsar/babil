<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

const currentLang = ref('sq')

const content = {
  sq: {
    lang: 'sq',
    nav: {
      services: 'Sherbimet',
      contact: 'Kontakti',
    },
    cta: 'Kerko Sherbim',
    hero: {
      eyebrow: 'HIDRO TONI',
      title: 'Hidraulike e paster, moderne dhe e qete.',
      text: 'Riparime, kanalizime dhe instalime per banesa dhe biznese.',
      primary: 'Kontakto Tani',
      secondary: 'Shiko Sherbimet',
      tags: ['Kanalizime', 'Instalime', 'Riparime', 'Urgjenca'],
    },
    servicesTitle: 'Sherbimet',
    services: [
      {
        title: 'Plumbing & Drain',
        text: 'Bllokime, rrjedhje, riparime dhe probleme te perditshme.',
      },
      {
        title: 'Water & Pipe Installation',
        text: 'Instalim tubash, linjash uji, rubinetash dhe pajisjesh.',
      },
      {
        title: 'Residential & Commercial',
        text: 'Sherbim per shtepi, apartamente, lokale dhe hapesira biznesi.',
      },
    ],
    highlights: ['Pune e paster', 'Pergjigje e shpejte', 'Pamje me profesionale'],
    contact: {
      eyebrow: 'Kontakt',
      title: 'Na shkruani per nje vizite.',
      text: 'Forma eshte e thjeshte dhe e qarte.',
      summaryTitle: 'Permbledhja',
      summaryService: 'Sherbimi',
      summaryProperty: 'Prona',
      summaryUrgency: 'Koha',
      firstName: 'Emri',
      lastName: 'Mbiemri',
      email: 'Email',
      phone: 'Telefoni',
      phonePlaceholder: 'Numri i telefonit',
      service: 'Sherbimi',
      property: 'Lloji i prones',
      timing: 'Koha',
      message: 'Mesazhi',
      messagePlaceholder: 'Pershkruani shkurt problemin ose punen qe ju duhet.',
      sending: 'Duke derguar...',
      submit: 'Dergo Kerkesen',
      success: "Kerkesa u dergua me sukses. HIDRO TONI do t'ju kontaktoje se shpejti.",
      error: 'Kerkesa nuk u dergua. Ju lutemi provoni perseri.',
    },
    serviceOptions: [
      { value: 'drain-cleaning', label: 'Kanalizime / Bllokime' },
      { value: 'water-pipe-installation', label: 'Instalim Uji & Tubash' },
      { value: 'residential-plumbing', label: 'Hidraulike per Banesa' },
      { value: 'commercial-plumbing', label: 'Hidraulike per Biznese' },
      { value: 'emergency-repairs', label: 'Rrjedhje Urgjente' },
      { value: 'water-heater-service', label: 'Boiler / Pajisje' },
    ],
    propertyTypes: [
      { value: 'residential', label: 'Banese' },
      { value: 'commercial', label: 'Biznes' },
    ],
    urgencyOptions: [
      { value: 'emergency', label: 'Urgjente' },
      { value: 'same-day', label: 'Sa me shpejt' },
      { value: 'this-week', label: 'Kete jave' },
      { value: 'planning', label: 'Projekt i planifikuar' },
    ],
    footer: 'HIDRO TONI - Plumbing & Drain Services',
  },
  en: {
    lang: 'en',
    nav: {
      services: 'Services',
      contact: 'Contact',
    },
    cta: 'Request Service',
    hero: {
      eyebrow: 'HIDRO TONI',
      title: 'Clean, modern plumbing with a calmer look.',
      text: 'Repairs, drain work, and pipe installation for homes and businesses.',
      primary: 'Contact Now',
      secondary: 'View Services',
      tags: ['Drain', 'Install', 'Repair', 'Urgent'],
    },
    servicesTitle: 'Services',
    services: [
      {
        title: 'Plumbing & Drain',
        text: 'Clogs, leaks, repairs, and everyday plumbing issues.',
      },
      {
        title: 'Water & Pipe Installation',
        text: 'Water lines, pipe installation, faucets, and fixtures.',
      },
      {
        title: 'Residential & Commercial',
        text: 'Service for houses, apartments, offices, and business spaces.',
      },
    ],
    highlights: ['Clean work', 'Fast response', 'More professional feel'],
    contact: {
      eyebrow: 'Contact',
      title: 'Send a quick service request.',
      text: 'The form is simple and clear.',
      summaryTitle: 'Summary',
      summaryService: 'Service',
      summaryProperty: 'Property',
      summaryUrgency: 'Timing',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      phonePlaceholder: 'Phone number',
      service: 'Service',
      property: 'Property Type',
      timing: 'Timing',
      message: 'Message',
      messagePlaceholder: 'Briefly describe the problem or the work you need.',
      sending: 'Sending...',
      submit: 'Send Request',
      success: 'Your request was sent successfully. HIDRO TONI will contact you soon.',
      error: 'The request could not be sent. Please try again.',
    },
    serviceOptions: [
      { value: 'drain-cleaning', label: 'Drain / Clog Service' },
      { value: 'water-pipe-installation', label: 'Water & Pipe Installation' },
      { value: 'residential-plumbing', label: 'Residential Plumbing' },
      { value: 'commercial-plumbing', label: 'Commercial Plumbing' },
      { value: 'emergency-repairs', label: 'Emergency Leak' },
      { value: 'water-heater-service', label: 'Water Heater / Fixture' },
    ],
    propertyTypes: [
      { value: 'residential', label: 'Residential' },
      { value: 'commercial', label: 'Commercial' },
    ],
    urgencyOptions: [
      { value: 'emergency', label: 'Emergency' },
      { value: 'same-day', label: 'As soon as possible' },
      { value: 'this-week', label: 'This week' },
      { value: 'planning', label: 'Planned project' },
    ],
    footer: 'HIDRO TONI - Plumbing & Drain Services',
  },
}

const formDefaults = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: 'drain-cleaning',
  propertyType: 'residential',
  urgency: 'same-day',
  message: '',
  website: '',
}

const contactForm = reactive({ ...formDefaults })
const isSubmitting = ref(false)
const submitStatus = ref('idle')

const copy = computed(() => content[currentLang.value])

const selectedService = computed(
  () =>
    copy.value.serviceOptions.find((service) => service.value === contactForm.service) ??
    copy.value.serviceOptions[0],
)

const selectedProperty = computed(
  () =>
    copy.value.propertyTypes.find((property) => property.value === contactForm.propertyType) ??
    copy.value.propertyTypes[0],
)

const selectedUrgency = computed(
  () =>
    copy.value.urgencyOptions.find((urgency) => urgency.value === contactForm.urgency) ??
    copy.value.urgencyOptions[0],
)

const statusMessage = computed(() => {
  if (submitStatus.value === 'success') return copy.value.contact.success
  if (submitStatus.value === 'error') return copy.value.contact.error
  return ''
})

function setLanguage(lang) {
  currentLang.value = lang
  submitStatus.value = 'idle'
  document.documentElement.lang = content[lang].lang
}

async function handleSubmit() {
  submitStatus.value = 'idle'
  isSubmitting.value = true

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...contactForm,
        language: currentLang.value,
      }),
    })

    if (!response.ok) throw new Error('Contact request failed')

    Object.assign(contactForm, formDefaults)
    submitStatus.value = 'success'
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  document.documentElement.lang = content[currentLang.value].lang
})
</script>

<template>
  <div class="site-shell">
    <div class="water-glow water-glow-left"></div>
    <div class="water-glow water-glow-right"></div>
    <div class="water-grid"></div>

    <header class="site-header">
      <a class="brand" href="#home" aria-label="HIDRO TONI">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 144 72">
            <path d="M10 22c21-9 34-9 55 1 22 10 36 10 59-1" />
            <path d="M10 42c21-9 34-9 55 1 22 10 36 10 59-1" />
          </svg>
        </span>
        <span class="brand-type">
          <span>HIDRO</span>
          <span>TONI</span>
        </span>
      </a>

      <nav class="nav-links" aria-label="Navigation">
        <a href="#services">{{ copy.nav.services }}</a>
        <a href="#contact">{{ copy.nav.contact }}</a>
      </nav>

      <div class="header-actions">
        <div class="language-switch" aria-label="Language">
          <button
            type="button"
            :class="{ active: currentLang === 'sq' }"
            :aria-pressed="currentLang === 'sq'"
            @click="setLanguage('sq')"
          >
            AL
          </button>
          <button
            type="button"
            :class="{ active: currentLang === 'en' }"
            :aria-pressed="currentLang === 'en'"
            @click="setLanguage('en')"
          >
            EN
          </button>
        </div>
        <a class="header-cta" href="#contact">{{ copy.cta }}</a>
      </div>
    </header>

    <main>
      <section id="home" class="hero-section">
        <div class="hero-copy">
          <p class="eyebrow">{{ copy.hero.eyebrow }}</p>
          <h1>{{ copy.hero.title }}</h1>
          <p class="hero-text">{{ copy.hero.text }}</p>

          <div class="hero-actions">
            <a class="primary-button" href="#contact">{{ copy.hero.primary }}</a>
            <a class="secondary-button" href="#services">{{ copy.hero.secondary }}</a>
          </div>

          <div class="hero-tags">
            <span v-for="tag in copy.hero.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="visual-stage">
            <div class="water-orb">
              <span class="orb-core"></span>
              <span class="orb-ring orb-ring-a"></span>
              <span class="orb-ring orb-ring-b"></span>
              <span class="orb-ring orb-ring-c"></span>
            </div>
            <div class="floating-card floating-card-top">24/7</div>
            <div class="floating-card floating-card-right">Flow</div>
            <div class="floating-card floating-card-bottom">Clean Finish</div>
            <div class="wave-stack">
              <span class="wave wave-a"></span>
              <span class="wave wave-b"></span>
              <span class="wave wave-c"></span>
            </div>
          </div>
        </div>
      </section>

      <section class="mini-band">
        <div class="mini-band-inner">
          <span v-for="item in copy.highlights" :key="item">{{ item }}</span>
        </div>
      </section>

      <section id="services" class="section">
        <div class="section-heading">
          <p class="eyebrow">{{ copy.servicesTitle }}</p>
          <h2>HIDRO TONI</h2>
        </div>

        <div class="service-grid">
          <article v-for="service in copy.services" :key="service.title" class="service-card">
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </article>
        </div>
      </section>

      <section id="contact" class="contact-section">
        <div class="contact-side">
          <div class="contact-copy">
            <p class="eyebrow">{{ copy.contact.eyebrow }}</p>
            <h2>{{ copy.contact.title }}</h2>
            <p>{{ copy.contact.text }}</p>
          </div>

          <div class="request-summary">
            <h3>{{ copy.contact.summaryTitle }}</h3>
            <div class="summary-row">
              <span>{{ copy.contact.summaryService }}</span>
              <strong>{{ selectedService.label }}</strong>
            </div>
            <div class="summary-row">
              <span>{{ copy.contact.summaryProperty }}</span>
              <strong>{{ selectedProperty.label }}</strong>
            </div>
            <div class="summary-row">
              <span>{{ copy.contact.summaryUrgency }}</span>
              <strong>{{ selectedUrgency.label }}</strong>
            </div>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <input v-model="contactForm.website" class="honeypot" type="text" tabindex="-1" autocomplete="off" />

          <div class="form-row">
            <label>
              {{ copy.contact.firstName }}
              <input v-model.trim="contactForm.firstName" type="text" required />
            </label>
            <label>
              {{ copy.contact.lastName }}
              <input v-model.trim="contactForm.lastName" type="text" required />
            </label>
          </div>

          <div class="form-row">
            <label>
              {{ copy.contact.email }}
              <input v-model.trim="contactForm.email" type="email" required />
            </label>
            <label>
              {{ copy.contact.phone }}
              <input v-model.trim="contactForm.phone" type="tel" :placeholder="copy.contact.phonePlaceholder" />
            </label>
          </div>

          <div class="form-row">
            <label>
              {{ copy.contact.service }}
              <select v-model="contactForm.service" required>
                <option v-for="service in copy.serviceOptions" :key="service.value" :value="service.value">
                  {{ service.label }}
                </option>
              </select>
            </label>
            <label>
              {{ copy.contact.property }}
              <select v-model="contactForm.propertyType" required>
                <option v-for="type in copy.propertyTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </label>
          </div>

          <label>
            {{ copy.contact.timing }}
            <select v-model="contactForm.urgency" required>
              <option v-for="urgency in copy.urgencyOptions" :key="urgency.value" :value="urgency.value">
                {{ urgency.label }}
              </option>
            </select>
          </label>

          <label>
            {{ copy.contact.message }}
            <textarea
              v-model.trim="contactForm.message"
              rows="4"
              required
              :placeholder="copy.contact.messagePlaceholder"
            ></textarea>
          </label>

          <button class="primary-button form-button" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? copy.contact.sending : copy.contact.submit }}
          </button>

          <p v-if="statusMessage" class="form-status" :class="submitStatus">{{ statusMessage }}</p>
        </form>
      </section>
    </main>

    <footer class="site-footer">
      <p>{{ copy.footer }}</p>
    </footer>
  </div>
</template>
