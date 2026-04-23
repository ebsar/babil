<script setup>
import { computed, reactive, ref } from 'vue'

const currentLang = ref('sq')

const content = {
  en: {
    documentLang: 'en',
    logoLabel: 'HIDRO TONI home',
    navLabel: 'Primary navigation',
    nav: {
      services: 'Services',
      process: 'Process',
      contact: 'Contact',
    },
    headerCta: 'Request Service',
    languageLabel: 'Language',
    hero: {
      eyebrow: 'Plumbing, drains, water lines, and pipe work',
      title: 'Clean plumbing service for homes and businesses.',
      lede:
        'HIDRO TONI helps with drain problems, pipe installation, water service, and reliable residential or commercial plumbing support.',
      primaryCta: 'Book A Service Visit',
      secondaryCta: 'See Services',
      proofLabel: 'Service highlights',
      cardLabel: 'HIDRO TONI service card',
      cardTop: 'Service Call',
    },
    proofPoints: [
      { value: 'Rapid', label: 'response for urgent leaks and backups' },
      { value: 'Clean', label: 'work areas protected from start to finish' },
      { value: 'Clear', label: 'scope, pricing, and next steps before work begins' },
    ],
    servicesEyebrow: 'What We Do',
    servicesTitle: 'Three core services, one dependable plumbing partner.',
    services: [
      {
        id: 'drain-cleaning',
        label: 'Plumbing & Drain Services',
        eyebrow: 'Blocked drains, leaks, repairs',
        description:
          'Fast help for clogs, slow drains, pipe leaks, toilet issues, fixture repairs, and everyday plumbing problems.',
        points: ['Drain cleaning', 'Leak detection', 'Toilet and faucet repairs', 'Preventive maintenance'],
      },
      {
        id: 'water-pipe-installation',
        label: 'Water & Pipe Installation Services',
        eyebrow: 'Clean installs, steady pressure',
        description:
          'Reliable water line, pipe, valve, and fixture installation for remodels, upgrades, and new plumbing work.',
        points: ['Water line installation', 'Pipe replacement', 'Fixture setup', 'Pressure troubleshooting'],
      },
      {
        id: 'residential-commercial',
        label: 'Residential & Commercial Plumbing',
        eyebrow: 'Homes, shops, offices',
        description:
          'Professional plumbing support for homeowners, landlords, restaurants, offices, retail spaces, and property managers.',
        points: ['Home plumbing service', 'Commercial maintenance', 'Tenant-ready repairs', 'Scheduled project work'],
      },
    ],
    emergency: {
      eyebrow: 'Urgent Plumbing Help',
      title: 'Leaks, backups, and pressure issues need a fast, organized response.',
      text:
        'From a backed-up drain to a burst pipe, HIDRO TONI focuses on stopping damage, restoring flow, and explaining the repair clearly before work begins.',
      cta: 'Send An Urgent Request',
    },
    commonRequestsEyebrow: 'Common Requests',
    serviceAreas: [
      'Drain cleaning and clog removal',
      'Water line installation',
      'Pipe repair and replacement',
      'Fixture and faucet installation',
      'Toilet repair and replacement',
      'Commercial plumbing maintenance',
    ],
    processEyebrow: 'How It Works',
    processTitle: 'A straightforward service process from first message to final test.',
    processSteps: [
      {
        step: '01',
        title: 'Tell Us The Issue',
        text: 'Share what is happening, where it is located, and whether the problem is urgent.',
      },
      {
        step: '02',
        title: 'Get A Clear Plan',
        text: 'We review the service need, explain the best repair or installation path, and schedule the visit.',
      },
      {
        step: '03',
        title: 'Professional Service',
        text: 'The work is completed with care for your property, clean finishes, and practical recommendations.',
      },
      {
        step: '04',
        title: 'Test And Walkthrough',
        text: 'We test flow, pressure, drainage, and fixtures before leaving so you know the job is complete.',
      },
    ],
    contact: {
      eyebrow: 'Request Service',
      title: 'Tell HIDRO TONI what plumbing help you need.',
      text:
        'Choose a service, describe the issue, and include your contact details. The request will be routed through the website contact system.',
      selectedService: 'Selected Service',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      phonePlaceholder: 'Your phone number',
      serviceNeeded: 'Service Needed',
      propertyType: 'Property Type',
      timing: 'Timing',
      message: 'Message',
      messagePlaceholder:
        'Describe the plumbing issue, installation need, property type, and preferred timing.',
      sending: 'Sending Request...',
      submit: 'Send Service Request',
      success:
        'Your request has been sent. HIDRO TONI will review it and follow up as soon as possible.',
      error: 'The request could not be sent right now. Please check the details and try again.',
    },
    serviceOptions: [
      { value: 'drain-cleaning', label: 'Plumbing & Drain Services' },
      { value: 'water-pipe-installation', label: 'Water & Pipe Installation Services' },
      { value: 'residential-plumbing', label: 'Residential Plumbing' },
      { value: 'commercial-plumbing', label: 'Commercial Plumbing' },
      { value: 'emergency-repairs', label: 'Emergency Leak or Backup' },
      { value: 'water-heater-service', label: 'Water Heater / Fixture Service' },
    ],
    propertyTypes: [
      { value: 'residential', label: 'Residential' },
      { value: 'commercial', label: 'Commercial' },
    ],
    urgencyOptions: [
      { value: 'emergency', label: 'Emergency request' },
      { value: 'same-day', label: 'As soon as possible' },
      { value: 'this-week', label: 'This week' },
      { value: 'planning', label: 'Planning a project' },
    ],
    footer:
      'Plumbing & Drain Services | Water & Pipe Installation | Residential & Commercial Plumbing',
  },
  sq: {
    documentLang: 'sq',
    logoLabel: 'HIDRO TONI faqja kryesore',
    navLabel: 'Navigimi kryesor',
    nav: {
      services: 'Sh\u00ebrbimet',
      process: 'Procesi',
      contact: 'Kontakti',
    },
    headerCta: 'K\u00ebrko Sh\u00ebrbim',
    languageLabel: 'Gjuha',
    hero: {
      eyebrow: 'Hidraulik\u00eb, kanalizime, linja uji dhe tuba',
      title: 'Sh\u00ebrbime hidraulike t\u00eb pastra p\u00ebr sht\u00ebpi dhe biznese.',
      lede:
        'HIDRO TONI ndihmon me probleme kanalizimi, instalim tubash, sh\u00ebrbime uji dhe mb\u00ebshtetje t\u00eb besueshme hidraulike p\u00ebr banesa ose biznese.',
      primaryCta: 'Rezervo Vizit\u00eb Sh\u00ebrbimi',
      secondaryCta: 'Shiko Sh\u00ebrbimet',
      proofLabel: 'Pikat kryesore t\u00eb sh\u00ebrbimit',
      cardLabel: 'Kartela e sh\u00ebrbimit HIDRO TONI',
      cardTop: 'Thirrje Sh\u00ebrbimi',
    },
    proofPoints: [
      { value: 'Shpejt', label: 'p\u00ebrgjigje p\u00ebr rrjedhje dhe bllokime urgjente' },
      { value: 'Past\u00ebr', label: 'hap\u00ebsira e pun\u00ebs mbrohet nga fillimi n\u00eb fund' },
      { value: 'Qart\u00eb', label: 'shpjegim i pun\u00ebs, \u00e7mimit dhe hapave para fillimit' },
    ],
    servicesEyebrow: '\u00c7far\u00eb Ofrojm\u00eb',
    servicesTitle: 'Tre sh\u00ebrbime kryesore, nj\u00eb partner hidraulik i besuesh\u00ebm.',
    services: [
      {
        id: 'drain-cleaning',
        label: 'Sh\u00ebrbime Hidraulike & Kanalizimi',
        eyebrow: 'Kanalizime t\u00eb bllokuara, rrjedhje, riparime',
        description:
          'Ndihm\u00eb e shpejt\u00eb p\u00ebr bllokime, kullime t\u00eb ngadalta, rrjedhje tubash, probleme tualeti, riparime rubinetash dhe probleme t\u00eb p\u00ebrditshme hidraulike.',
        points: [
          'Pastrimi i kanalizimeve',
          'Zbulimi i rrjedhjeve',
          'Riparime tualeti dhe rubinetash',
          'Mir\u00ebmbajtje parandaluese',
        ],
      },
      {
        id: 'water-pipe-installation',
        label: 'Sh\u00ebrbime Instalimi Uji & Tubash',
        eyebrow: 'Instalime t\u00eb pastra, presion i q\u00ebndruesh\u00ebm',
        description:
          'Instalim i besuesh\u00ebm i linjave t\u00eb ujit, tubave, valvulave dhe pajisjeve p\u00ebr rinovime, p\u00ebrmir\u00ebsime dhe pun\u00eb t\u00eb re hidraulike.',
        points: [
          'Instalim linjash uji',
          'Nd\u00ebrrim tubash',
          'Montim pajisjesh',
          'Kontroll presioni',
        ],
      },
      {
        id: 'residential-commercial',
        label: 'Hidraulik\u00eb P\u00ebr Banesa & Biznese',
        eyebrow: 'Sht\u00ebpi, dyqane, zyra',
        description:
          'Mb\u00ebshtetje profesionale hidraulike p\u00ebr pronar\u00eb sht\u00ebpish, qiradh\u00ebn\u00ebs, restorante, zyra, dyqane dhe menaxher\u00eb pronash.',
        points: [
          'Sh\u00ebrbime p\u00ebr sht\u00ebpi',
          'Mir\u00ebmbajtje biznesi',
          'Riparime p\u00ebr qiramarr\u00ebs',
          'Pun\u00eb t\u00eb planifikuara',
        ],
      },
    ],
    emergency: {
      eyebrow: 'Ndihm\u00eb Urgjente Hidraulike',
      title: 'Rrjedhjet, bllokimet dhe problemet e presionit k\u00ebrkojn\u00eb reagim t\u00eb shpejt\u00eb.',
      text:
        'Nga kanalizimi i bllokuar deri te tubi i \u00e7ar\u00eb, HIDRO TONI fokusohet n\u00eb ndalimin e d\u00ebmit, rikthimin e rrjedh\u00ebs dhe shpjegimin e qart\u00eb t\u00eb riparimit para fillimit.',
      cta: 'D\u00ebrgo K\u00ebrkes\u00eb Urgjente',
    },
    commonRequestsEyebrow: 'K\u00ebrkesa T\u00eb Shpeshta',
    serviceAreas: [
      'Pastrimi i kanalizimeve dhe heqja e bllokimeve',
      'Instalimi i linjave t\u00eb ujit',
      'Riparimi dhe nd\u00ebrrimi i tubave',
      'Instalimi i rubinetave dhe pajisjeve',
      'Riparimi dhe nd\u00ebrrimi i tualeteve',
      'Mir\u00ebmbajtje hidraulike p\u00ebr biznese',
    ],
    processEyebrow: 'Si Funksionon',
    processTitle: 'Proces i thjesht\u00eb nga mesazhi i par\u00eb deri te testimi final.',
    processSteps: [
      {
        step: '01',
        title: 'Tregoni Problemin',
        text: 'Na tregoni \u00e7far\u00eb po ndodh, ku ndodhet problemi dhe n\u00ebse \u00ebsht\u00eb urgjent.',
      },
      {
        step: '02',
        title: 'Merrni Nj\u00eb Plan T\u00eb Qart\u00eb',
        text: 'Ne shqyrtojm\u00eb nevoj\u00ebn, shpjegojm\u00eb zgjidhjen m\u00eb t\u00eb mir\u00eb dhe caktojm\u00eb vizit\u00ebn.',
      },
      {
        step: '03',
        title: 'Sh\u00ebrbim Profesional',
        text: 'Puna kryhet me kujdes p\u00ebr pron\u00ebn tuaj, p\u00ebrfundim t\u00eb past\u00ebr dhe k\u00ebshilla praktike.',
      },
      {
        step: '04',
        title: 'Testim Dhe Shpjegim',
        text: 'Testojm\u00eb rrjedh\u00ebn, presionin, kanalizimin dhe pajisjet para se t\u00eb largohemi.',
      },
    ],
    contact: {
      eyebrow: 'K\u00ebrko Sh\u00ebrbim',
      title: 'Tregoni HIDRO TONI \u00e7far\u00eb ndihme hidraulike ju duhet.',
      text:
        'Zgjidhni sh\u00ebrbimin, p\u00ebrshkruani problemin dhe vendosni t\u00eb dh\u00ebnat e kontaktit. K\u00ebrkesa do t\u00eb d\u00ebrgohet p\u00ebrmes sistemit t\u00eb kontaktit t\u00eb faqes.',
      selectedService: 'Sh\u00ebrbimi i zgjedhur',
      firstName: 'Emri',
      lastName: 'Mbiemri',
      email: 'Email',
      phone: 'Telefoni',
      phonePlaceholder: 'Numri juaj i telefonit',
      serviceNeeded: 'Sh\u00ebrbimi i nevojsh\u00ebm',
      propertyType: 'Lloji i pron\u00ebs',
      timing: 'Koha',
      message: 'Mesazhi',
      messagePlaceholder:
        'P\u00ebrshkruani problemin hidraulik, nevoj\u00ebn p\u00ebr instalim, llojin e pron\u00ebs dhe koh\u00ebn e preferuar.',
      sending: 'Duke D\u00ebrguar...',
      submit: 'D\u00ebrgo K\u00ebrkes\u00ebn',
      success:
        'K\u00ebrkesa juaj u d\u00ebrgua. HIDRO TONI do ta shqyrtoj\u00eb dhe do t\u00eb kontaktoj\u00eb sa m\u00eb shpejt.',
      error: 'K\u00ebrkesa nuk mund t\u00eb d\u00ebrgohet tani. Ju lutemi kontrolloni t\u00eb dh\u00ebnat dhe provoni p\u00ebrs\u00ebri.',
    },
    serviceOptions: [
      { value: 'drain-cleaning', label: 'Sh\u00ebrbime Hidraulike & Kanalizimi' },
      { value: 'water-pipe-installation', label: 'Sh\u00ebrbime Instalimi Uji & Tubash' },
      { value: 'residential-plumbing', label: 'Hidraulik\u00eb P\u00ebr Banesa' },
      { value: 'commercial-plumbing', label: 'Hidraulik\u00eb P\u00ebr Biznese' },
      { value: 'emergency-repairs', label: 'Rrjedhje Ose Bllokim Urgjent' },
      { value: 'water-heater-service', label: 'Boiler / Pajisje Hidraulike' },
    ],
    propertyTypes: [
      { value: 'residential', label: 'Banes\u00eb' },
      { value: 'commercial', label: 'Biznes' },
    ],
    urgencyOptions: [
      { value: 'emergency', label: 'K\u00ebrkes\u00eb urgjente' },
      { value: 'same-day', label: 'Sa m\u00eb shpejt' },
      { value: 'this-week', label: 'K\u00ebt\u00eb jav\u00eb' },
      { value: 'planning', label: 'Po planifikoj nj\u00eb projekt' },
    ],
    footer: 'Sh\u00ebrbime Hidraulike & Kanalizimi | Instalim Uji & Tubash | Banesa & Biznese',
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

const statusMessage = computed(() => {
  if (submitStatus.value === 'success') {
    return copy.value.contact.success
  }

  if (submitStatus.value === 'error') {
    return copy.value.contact.error
  }

  return ''
})

function setLanguage(lang) {
  currentLang.value = lang
  submitStatus.value = 'idle'
  document.documentElement.lang = content[lang].documentLang
}

async function handleSubmit() {
  submitStatus.value = 'idle'
  isSubmitting.value = true

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...contactForm,
        language: currentLang.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Contact request failed')
    }

    Object.assign(contactForm, formDefaults)
    submitStatus.value = 'success'
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="site-shell" :data-lang="currentLang">
    <div class="ambient ambient-one"></div>
    <div class="ambient ambient-two"></div>

    <header class="site-header">
      <a class="brand" href="#home" :aria-label="copy.logoLabel">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 144 72" role="img">
            <defs>
              <linearGradient id="waveHot" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stop-color="#f03737" />
                <stop offset="48%" stop-color="#8b1024" />
                <stop offset="100%" stop-color="#148fe4" />
              </linearGradient>
              <linearGradient id="waveCool" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stop-color="#ef3535" />
                <stop offset="42%" stop-color="#101a35" />
                <stop offset="100%" stop-color="#49a9ea" />
              </linearGradient>
            </defs>
            <path
              d="M10 22c21-9 34-9 55 1 22 10 36 10 59-1"
              fill="none"
              stroke="url(#waveHot)"
              stroke-linecap="round"
              stroke-width="10"
            />
            <path
              d="M10 42c21-9 34-9 55 1 22 10 36 10 59-1"
              fill="none"
              stroke="url(#waveCool)"
              stroke-linecap="round"
              stroke-width="10"
            />
          </svg>
        </span>
        <span class="brand-type">
          <span>HIDRO</span>
          <span>TONI</span>
        </span>
      </a>

      <nav class="nav-links" :aria-label="copy.navLabel">
        <a href="#services">{{ copy.nav.services }}</a>
        <a href="#process">{{ copy.nav.process }}</a>
        <a href="#contact">{{ copy.nav.contact }}</a>
      </nav>

      <div class="header-actions">
        <div class="language-switch" :aria-label="copy.languageLabel">
          <button
            type="button"
            class="language-button"
            :class="{ active: currentLang === 'en' }"
            :aria-pressed="currentLang === 'en'"
            @click="setLanguage('en')"
          >
            EN
          </button>
          <button
            type="button"
            class="language-button"
            :class="{ active: currentLang === 'sq' }"
            :aria-pressed="currentLang === 'sq'"
            @click="setLanguage('sq')"
          >
            AL
          </button>
        </div>
        <a class="header-cta" href="#contact">{{ copy.headerCta }}</a>
      </div>
    </header>

    <main>
      <section id="home" class="hero-section">
        <div class="hero-copy">
          <p class="eyebrow">{{ copy.hero.eyebrow }}</p>
          <h1>{{ copy.hero.title }}</h1>
          <p class="hero-lede">
            {{ copy.hero.lede }}
          </p>

          <div class="hero-actions">
            <a class="primary-button" href="#contact">{{ copy.hero.primaryCta }}</a>
            <a class="secondary-button" href="#services">{{ copy.hero.secondaryCta }}</a>
          </div>

          <div class="proof-grid" :aria-label="copy.hero.proofLabel">
            <article v-for="item in copy.proofPoints" :key="item.value">
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </article>
          </div>
        </div>

        <aside class="hero-card" :aria-label="copy.hero.cardLabel">
          <div class="hero-card-top">
            <span>{{ copy.hero.cardTop }}</span>
            <span>HIDRO TONI</span>
          </div>
          <div class="pipe-illustration" aria-hidden="true">
            <span class="pipe pipe-a"></span>
            <span class="pipe pipe-b"></span>
            <span class="pipe pipe-c"></span>
            <span class="valve"></span>
            <span class="drop drop-a"></span>
            <span class="drop drop-b"></span>
          </div>
          <div class="hero-service-list">
            <p v-for="service in copy.services" :key="service.id">{{ service.label }}</p>
          </div>
        </aside>
      </section>

      <section id="services" class="section services-section">
        <div class="section-heading">
          <p class="eyebrow">{{ copy.servicesEyebrow }}</p>
          <h2>{{ copy.servicesTitle }}</h2>
        </div>

        <div class="service-grid">
          <article v-for="service in copy.services" :key="service.id" class="service-card">
            <span class="service-number">{{ service.eyebrow }}</span>
            <h3>{{ service.label }}</h3>
            <p>{{ service.description }}</p>
            <ul>
              <li v-for="point in service.points" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="split-section">
        <div class="split-panel emergency-panel">
          <p class="eyebrow">{{ copy.emergency.eyebrow }}</p>
          <h2>{{ copy.emergency.title }}</h2>
          <p>{{ copy.emergency.text }}</p>
          <a class="secondary-button light" href="#contact">{{ copy.emergency.cta }}</a>
        </div>

        <div class="split-panel checklist-panel">
          <p class="eyebrow">{{ copy.commonRequestsEyebrow }}</p>
          <ul class="service-checklist">
            <li v-for="item in copy.serviceAreas" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>

      <section id="process" class="section process-section">
        <div class="section-heading narrow">
          <p class="eyebrow">{{ copy.processEyebrow }}</p>
          <h2>{{ copy.processTitle }}</h2>
        </div>

        <div class="process-grid">
          <article v-for="item in copy.processSteps" :key="item.step" class="process-card">
            <span>{{ item.step }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>

      <section id="contact" class="contact-section">
        <div class="contact-copy">
          <p class="eyebrow">{{ copy.contact.eyebrow }}</p>
          <h2>{{ copy.contact.title }}</h2>
          <p>{{ copy.contact.text }}</p>

          <div class="contact-mini-card">
            <span>{{ copy.contact.selectedService }}</span>
            <strong>{{ selectedService.label }}</strong>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <input v-model="contactForm.website" class="honeypot" type="text" tabindex="-1" autocomplete="off" />

          <div class="form-row">
            <label>
              {{ copy.contact.firstName }}
              <input v-model.trim="contactForm.firstName" type="text" name="firstName" required />
            </label>
            <label>
              {{ copy.contact.lastName }}
              <input v-model.trim="contactForm.lastName" type="text" name="lastName" required />
            </label>
          </div>

          <div class="form-row">
            <label>
              {{ copy.contact.email }}
              <input v-model.trim="contactForm.email" type="email" name="email" required />
            </label>
            <label>
              {{ copy.contact.phone }}
              <input
                v-model.trim="contactForm.phone"
                type="tel"
                name="phone"
                :placeholder="copy.contact.phonePlaceholder"
              />
            </label>
          </div>

          <div class="form-row">
            <label>
              {{ copy.contact.serviceNeeded }}
              <select v-model="contactForm.service" name="service" required>
                <option v-for="service in copy.serviceOptions" :key="service.value" :value="service.value">
                  {{ service.label }}
                </option>
              </select>
            </label>
            <label>
              {{ copy.contact.propertyType }}
              <select v-model="contactForm.propertyType" name="propertyType" required>
                <option v-for="type in copy.propertyTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </label>
          </div>

          <label>
            {{ copy.contact.timing }}
            <select v-model="contactForm.urgency" name="urgency" required>
              <option v-for="urgency in copy.urgencyOptions" :key="urgency.value" :value="urgency.value">
                {{ urgency.label }}
              </option>
            </select>
          </label>

          <label>
            {{ copy.contact.message }}
            <textarea
              v-model.trim="contactForm.message"
              name="message"
              rows="5"
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
      <a class="brand footer-brand" href="#home" :aria-label="copy.logoLabel">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 144 72">
            <path
              d="M10 22c21-9 34-9 55 1 22 10 36 10 59-1"
              fill="none"
              stroke="#ef3535"
              stroke-linecap="round"
              stroke-width="10"
            />
            <path
              d="M10 42c21-9 34-9 55 1 22 10 36 10 59-1"
              fill="none"
              stroke="#3ca5e9"
              stroke-linecap="round"
              stroke-width="10"
            />
          </svg>
        </span>
        <span class="brand-type">
          <span>HIDRO</span>
          <span>TONI</span>
        </span>
      </a>
      <p>{{ copy.footer }}</p>
      <a href="#contact">{{ copy.headerCta }}</a>
    </footer>
  </div>
</template>
