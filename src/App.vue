<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const appShell = ref(null)
const contactForm = ref(null)
const currentLang = ref('sq')

const heroScript = `𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹
𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾
𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭`

const quoteScript = `𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹
𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾`

const serviceOptions = {
  en: [
    'Document Translation',
    'Live Interpretation',
    'Certified Translation',
    'Business Localization',
    'Legal Services',
  ],
  es: [
    'Traducción de Documentos',
    'Interpretación en Vivo',
    'Traducción Certificada',
    'Localización Empresarial',
    'Servicios Legales',
  ],
  bs: [
    'Prevođenje Dokumenata',
    'Tumačenje Uživo',
    'Ovjereni Prijevod',
    'Poslovna Lokalizacija',
    'Pravne Usluge',
  ],
  sq: [
    'Përkthim Dokumentesh',
    'Interpretim i Drejtpërdrejtë',
    'Përkthim i Certifikuar',
    'Lokalizim Biznesi',
    'Shërbime Ligjore',
  ],
}

const serviceCatalog = [
  {
    value: 'document-translation',
    labels: {
      en: 'Document Translation',
      es: 'Traducci\u00f3n de Documentos',
      bs: 'Prevo\u0111enje Dokumenata',
      sq: 'P\u00ebrkthim Dokumentesh',
    },
  },
  {
    value: 'live-interpretation',
    labels: {
      en: 'Live Interpretation',
      es: 'Interpretaci\u00f3n en Vivo',
      bs: 'Tuma\u010denje U\u017eivo',
      sq: 'Interpretim i Drejtp\u00ebrdrejt\u00eb',
    },
  },
  {
    value: 'certified-translation',
    labels: {
      en: 'Certified Translation',
      es: 'Traducci\u00f3n Certificada',
      bs: 'Ovjereni Prijevod',
      sq: 'P\u00ebrkthim i Certifikuar',
    },
  },
  {
    value: 'business-localization',
    labels: {
      en: 'Business Localization',
      es: 'Localizaci\u00f3n Empresarial',
      bs: 'Poslovna Lokalizacija',
      sq: 'Lokalizim Biznesi',
    },
  },
  {
    value: 'legal-services',
    labels: {
      en: 'Legal Services',
      es: 'Servicios Legales',
      bs: 'Pravne Usluge',
      sq: 'Sh\u00ebrbime Ligjore',
    },
  },
]

const currentServiceOptions = computed(() =>
  serviceCatalog.map((service) => ({
    value: service.value,
    label: service.labels[currentLang.value],
  })),
)

const contactCopy = {
  en: {
    servicePlaceholder: 'Select a service',
    messagePlaceholder: 'Tell us what you need, the language pair, and your timeline.',
    submitIdle: 'Send Request \u2192',
    submitSending: 'Sending...',
    success: 'Your request has been received. We will reply as soon as possible.',
    error: 'We could not send your request right now. Please try again or email us directly.',
  },
  es: {
    servicePlaceholder: 'Seleccione un servicio',
    messagePlaceholder:
      'Cu\u00e9ntenos qu\u00e9 necesita, la combinaci\u00f3n de idiomas y su plazo ideal.',
    submitIdle: 'Enviar Solicitud \u2192',
    submitSending: 'Enviando...',
    success: 'Hemos recibido su solicitud. Le responderemos lo antes posible.',
    error:
      'No pudimos enviar su solicitud ahora mismo. Intente de nuevo o escr\u00edbanos por correo.',
  },
  bs: {
    servicePlaceholder: 'Odaberite uslugu',
    messagePlaceholder: 'Recite nam \u0161ta vam treba, jezi\u010dki par i \u017eeljeni rok.',
    submitIdle: 'Po\u0161alji Zahtjev \u2192',
    submitSending: 'Slanje...',
    success: 'Primili smo va\u0161 zahtjev. Odgovorit \u0107emo vam \u0161to prije.',
    error:
      'Trenutno nismo mogli poslati va\u0161 zahtjev. Poku\u0161ajte ponovo ili nam pi\u0161ite e-po\u0161tom.',
  },
  sq: {
    servicePlaceholder: 'Zgjidhni nj\u00eb sh\u00ebrbim',
    messagePlaceholder:
      'Na tregoni \u00e7far\u00eb ju nevojitet, \u00e7iftin e gjuh\u00ebve dhe afatin q\u00eb preferoni.',
    submitIdle: 'D\u00ebrgo K\u00ebrkes\u00ebn \u2192',
    submitSending: 'Duke d\u00ebrguar...',
    success: 'K\u00ebrkesa juaj u pranua. Do t\u2019ju p\u00ebrgjigjemi sa m\u00eb shpejt.',
    error:
      'Nuk mund ta d\u00ebrgojm\u00eb k\u00ebrkes\u00ebn tani. Ju lutemi provoni p\u00ebrs\u00ebri ose na shkruani me email.',
  },
}

const activeContactCopy = computed(() => contactCopy[currentLang.value])
const contactEndpoint = (import.meta.env.VITE_CONTACT_API_URL?.trim() || '/api/contact')

const contactErrorCopy = {
  en: {
    network:
      'The contact server is not reachable right now. Start the site with npm run dev or npm run preview, or email us directly.',
    validation: 'Please review the form fields and try again.',
    generic: 'We could not send your request right now. Please try again or email us directly.',
    emailFallback: 'Email Us Directly',
  },
  es: {
    network:
      'El servidor de contacto no esta disponible ahora mismo. Inicie el sitio con npm run dev o npm run preview, o escribanos directamente por correo.',
    validation: 'Revise los campos del formulario e intentelo de nuevo.',
    generic:
      'No pudimos enviar su solicitud ahora mismo. Intente de nuevo o escribanos por correo.',
    emailFallback: 'Escribanos Por Correo',
  },
  bs: {
    network:
      'Kontakt server trenutno nije dostupan. Pokrenite stranicu sa npm run dev ili npm run preview, ili nam pisite direktno e-postom.',
    validation: 'Provjerite polja obrasca i pokusajte ponovo.',
    generic:
      'Trenutno nismo mogli poslati vas zahtjev. Pokusajte ponovo ili nam pisite e-postom.',
    emailFallback: 'Posalji Email Direktno',
  },
  sq: {
    network:
      'Serveri i kontaktit nuk eshte i arritshem tani. Nise faqen me npm run dev ose npm run preview, ose na shkruaj direkt me email.',
    validation: 'Kontrollo fushat e formularit dhe provo perseri.',
    generic:
      'Nuk mund ta dergojme kerkesen tani. Ju lutemi provoni perseri ose na shkruani me email.',
    emailFallback: 'Na Shkruaj Me Email',
  },
}

const activeContactErrorCopy = computed(() => contactErrorCopy[currentLang.value])

const languageSectionCopy = {
  en: {
    headingHtml: 'Three languages.<br />One voice.',
    body:
      'We provide expert translation and interpretation across English, Spanish, and Bosnian for communities across the Americas, Europe, and the Balkans.',
  },
  es: {
    headingHtml: 'Tres idiomas.<br />Una voz.',
    body:
      'Ofrecemos traduccion e interpretacion experta en ingles, espanol y bosnio para comunidades en las Americas, Europa y los Balcanes.',
  },
  bs: {
    headingHtml: 'Tri jezika.<br />Jedan glas.',
    body:
      'Pruzamo strucne prijevode i tumacenja na engleskom, spanskom i bosanskom jeziku za zajednice u Americi, Evropi i na Balkanu.',
  },
  sq: {
    headingHtml: 'Tri gjuh\u00eb.<br />Nj\u00eb z\u00eb.',
    body:
      'Ofrojm\u00eb p\u00ebrkthim dhe interpretim profesional n\u00eb anglisht, spanjisht dhe boshnjakisht p\u00ebr komunitete n\u00eb Amerik\u00eb, Evrop\u00eb dhe Ballkan.',
  },
}

const activeLanguageSectionCopy = computed(() => languageSectionCopy[currentLang.value])

const contactBodyCopy = {
  en:
    "Whether you need a certified translation, a live interpreter, or a full localization project, we're here to help in English, Spanish, and Bosnian.",
  es:
    'Ya sea que necesite una traduccion certificada, un interprete en vivo o un proyecto completo de localizacion, estamos aqui para ayudarle en ingles, espanol y bosnio.',
  bs:
    'Bilo da trebate ovjereni prijevod, tumaca uzivo ili kompletan projekat lokalizacije, tu smo da pomognemo na engleskom, spanskom i bosanskom jeziku.',
  sq:
    'Qofte se ju nevojitet nje perkthim i certifikuar, nje interpretues i drejtperdrejte apo nje projekt i plote lokalizimi, ne jemi ketu per tju ndihmuar ne anglisht, spanjisht dhe boshnjakisht.',
}

const activeContactBody = computed(() => contactBodyCopy[currentLang.value])
const heroTaglines = [
  'Sh\u00ebrbime t\u00eb P\u00ebrkthimit dhe Interpretimit',
  'Servicios de Traducci\u00f3n e Interpretaci\u00f3n',
  'Translation & Interpretation Services',
  'Usluge Prevo\u0111enja i Tuma\u010denja',
]

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  service: '',
  message: '',
  website: '',
})

const submissionState = ref('idle')
const submissionErrorKey = ref('generic')
const heroTaglineIndex = ref(0)
const heroTaglineCharCount = ref(0)
const heroTaglineDeleting = ref(false)

const activeSubmissionError = computed(
  () => activeContactErrorCopy.value[submissionErrorKey.value] ?? activeContactErrorCopy.value.generic,
)

const typedHeroTagline = computed(() => {
  const characters = Array.from(heroTaglines[heroTaglineIndex.value])
  return characters.slice(0, heroTaglineCharCount.value).join('')
})

const directEmailHref = computed(() => {
  const subject = encodeURIComponent('Babil contact request')
  const body = encodeURIComponent(
    [
      `First name: ${form.firstName || '-'}`,
      `Last name: ${form.lastName || '-'}`,
      `Email: ${form.email || '-'}`,
      `Service: ${form.service || '-'}`,
      '',
      'Message:',
      form.message || '-',
    ].join('\n'),
  )

  return `mailto:info@babiltranslation.com?subject=${subject}&body=${body}`
})

let observer
let heroTypingTimer

function setLang(lang) {
  currentLang.value = lang
}

function scheduleHeroTyping(delay) {
  clearTimeout(heroTypingTimer)
  heroTypingTimer = setTimeout(stepHeroTyping, delay)
}

function stepHeroTyping() {
  const fullTextCharacters = Array.from(heroTaglines[heroTaglineIndex.value])

  if (!heroTaglineDeleting.value) {
    heroTaglineCharCount.value += 1

    if (heroTaglineCharCount.value >= fullTextCharacters.length) {
      heroTaglineCharCount.value = fullTextCharacters.length
      heroTaglineDeleting.value = true
      scheduleHeroTyping(1400)
      return
    }

    scheduleHeroTyping(68)
    return
  }

  heroTaglineCharCount.value = Math.max(heroTaglineCharCount.value - 1, 0)

  if (heroTaglineCharCount.value === 0) {
    heroTaglineDeleting.value = false
    heroTaglineIndex.value = (heroTaglineIndex.value + 1) % heroTaglines.length
    scheduleHeroTyping(260)
    return
  }

  scheduleHeroTyping(34)
}

function clearSubmissionState() {
  if (submissionState.value !== 'submitting') {
    submissionState.value = 'idle'
    submissionErrorKey.value = 'generic'
  }
}

function resetForm() {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.service = ''
  form.message = ''
  form.website = ''
}

async function submitForm() {
  if (!contactForm.value?.reportValidity()) {
    return
  }

  submissionState.value = 'submitting'
  submissionErrorKey.value = 'generic'

  try {
    const response = await fetch(contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        service: form.service,
        message: form.message.trim(),
        language: currentLang.value,
        website: form.website,
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      const requestError = new Error(result.error ?? 'Request failed')
      requestError.status = response.status
      throw requestError
    }

    submissionState.value = 'success'
    resetForm()
  } catch (error) {
    console.error('Unable to submit contact form:', error)

    const isNetworkError =
      error instanceof TypeError ||
      /fetch|network|load failed/i.test(String(error?.message ?? '')) ||
      (typeof window !== 'undefined' && window.location.protocol === 'file:')

    if (error?.status === 422) {
      submissionErrorKey.value = 'validation'
    } else if (isNetworkError) {
      submissionErrorKey.value = 'network'
    } else {
      submissionErrorKey.value = 'generic'
    }

    submissionState.value = 'error'
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUp 0.7s ease both'
          entry.target.style.opacity = '1'
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )

  const elements =
    appShell.value?.querySelectorAll('.service-card, .lang-card, .process-step, .stat') ?? []

  elements.forEach((element) => {
    element.style.opacity = '0'
    observer?.observe(element)
  })

  scheduleHeroTyping(420)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(heroTypingTimer)
})
</script>

<template>
  <div ref="appShell" class="app-shell" :data-lang="currentLang">
    <nav>
      <a href="#" class="nav-logo">
        <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="32" y="5" width="16" height="12" fill="#1a1814" />
          <rect x="25" y="17" width="30" height="12" fill="#1a1814" />
          <rect x="8" y="29" width="22" height="11" fill="#1a1814" />
          <rect x="8" y="29" width="5" height="5" fill="#d8d4c4" />
          <rect x="38" y="29" width="22" height="11" fill="#1a1814" />
          <rect x="55" y="29" width="5" height="5" fill="#d8d4c4" />
          <rect x="5" y="40" width="26" height="13" fill="#1a1814" />
          <rect x="5" y="45" width="5" height="5" fill="#d8d4c4" />
          <rect x="49" y="40" width="26" height="13" fill="#1a1814" />
          <rect x="70" y="45" width="5" height="5" fill="#d8d4c4" />
          <rect x="2" y="53" width="32" height="12" fill="#1a1814" />
          <rect x="2" y="57" width="6" height="5" fill="#d8d4c4" />
          <rect x="46" y="53" width="32" height="12" fill="#1a1814" />
          <rect x="72" y="57" width="6" height="5" fill="#d8d4c4" />
        </svg>
        <span class="nav-logo-text">BABIL</span>
      </a>

      <ul class="nav-links">
        <li>
          <a href="#about">
            <span class="content-en">About</span>
            <span class="content-es">Acerca</span>
            <span class="content-bs">O nama</span>
            <span class="content-sq">Rreth Nesh</span>
          </a>
        </li>
        <li>
          <a href="#services">
            <span class="content-en">Services</span>
            <span class="content-es">Servicios</span>
            <span class="content-bs">Usluge</span>
            <span class="content-sq">Shërbimet</span>
          </a>
        </li>
        <li>
          <a href="#languages">
            <span class="content-en">Languages</span>
            <span class="content-es">Idiomas</span>
            <span class="content-bs">Jezici</span>
            <span class="content-sq">Gjuhët</span>
          </a>
        </li>
        <li>
          <a href="#contact">
            <span class="content-en">Contact</span>
            <span class="content-es">Contacto</span>
            <span class="content-bs">Kontakt</span>
            <span class="content-sq">Kontakt</span>
          </a>
        </li>
      </ul>

      <div class="nav-lang">
        <button
          type="button"
          class="lang-btn"
          :class="{ active: currentLang === 'sq' }"
          @click="setLang('sq')"
        >
          SQ
        </button>
        <button
          type="button"
          class="lang-btn"
          :class="{ active: currentLang === 'en' }"
          @click="setLang('en')"
        >
          EN
        </button>
        <button
          type="button"
          class="lang-btn"
          :class="{ active: currentLang === 'es' }"
          @click="setLang('es')"
        >
          ES
        </button>
        <button
          type="button"
          class="lang-btn"
          :class="{ active: currentLang === 'bs' }"
          @click="setLang('bs')"
        >
          BS
        </button>
      </div>
    </nav>

    <section class="hero">
      <div class="cuneiform-bg" aria-hidden="true">{{ heroScript }}</div>

      <div class="hero-center">
        <svg class="tower-mark" viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="58" y="0" width="44" height="32" fill="#1a1814" />
          <rect x="44" y="32" width="72" height="28" fill="#1a1814" />
          <rect x="63" y="38" width="12" height="12" fill="#d8d4c4" />
          <rect x="20" y="60" width="52" height="28" fill="#1a1814" />
          <rect x="22" y="65" width="10" height="10" fill="#d8d4c4" />
          <rect x="88" y="60" width="52" height="28" fill="#1a1814" />
          <rect x="128" y="65" width="10" height="10" fill="#d8d4c4" />
          <rect x="5" y="88" width="60" height="30" fill="#1a1814" />
          <rect x="7" y="94" width="12" height="12" fill="#d8d4c4" />
          <rect x="95" y="88" width="60" height="30" fill="#1a1814" />
          <rect x="143" y="94" width="12" height="12" fill="#d8d4c4" />
          <rect x="0" y="118" width="70" height="32" fill="#1a1814" />
          <rect x="2" y="124" width="12" height="12" fill="#d8d4c4" />
          <rect x="32" y="124" width="12" height="12" fill="#d8d4c4" />
          <rect x="90" y="118" width="70" height="32" fill="#1a1814" />
          <rect x="146" y="124" width="12" height="12" fill="#d8d4c4" />
          <rect x="114" y="124" width="12" height="12" fill="#d8d4c4" />
          <rect x="0" y="150" width="160" height="25" fill="#1a1814" opacity="0.15" />
        </svg>

        <div class="divider-line"></div>
        <h1 class="hero-name">BABIL</h1>
        <p class="hero-tagline" :aria-label="heroTaglines[heroTaglineIndex]">
          <span class="hero-tagline-text">{{ typedHeroTagline }}</span>
          <span class="hero-tagline-cursor" aria-hidden="true"></span>
          <span class="content-en">Translation &amp; Interpretation Services</span>
          <span class="content-es">Servicios de Traducción e Interpretación</span>
          <span class="content-bs">Usluge Prevođenja i Tumačenja</span>
          <span class="content-sq">Shërbime të Përkthimit dhe Interpretimit</span>
        </p>
        <div class="hero-langs">
          <span>Shqip</span>
          <span>English</span>
          <span>Español</span>
          <span>Bosanski</span>
        </div>
      </div>

      <div class="hero-scroll" aria-hidden="true">
        <span class="content-en">Scroll</span>
        <span class="content-es">Desplazar</span>
        <span class="content-bs">Skrolaj</span>
        <span class="content-sq">Lëviz</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <section id="about" class="about">
      <div class="section-inner">
        <div class="about-grid">
          <div>
            <div class="section-label">
              <span class="content-en">About Babil</span>
              <span class="content-es">Acerca de Babil</span>
              <span class="content-bs">O Babilu</span>
              <span class="content-sq">Rreth Babil</span>
            </div>

            <h2 class="about-heading content-en">Bridging worlds through the power of language</h2>
            <h2 class="about-heading content-es">Uniendo mundos a través del poder del idioma</h2>
            <h2 class="about-heading content-bs">Premošćujemo svjetove snagom jezika</h2>
            <h2 class="about-heading content-sq">Lidhim botët përmes fuqisë së gjuhës</h2>

            <p class="about-body content-en">
              Named after the ancient city of <em>Babylon</em> — the cradle of written language —
              Babil carries forward a legacy of communication across cultures. We believe that every
              word carries weight, and every translation is an act of trust.
            </p>
            <p class="about-body content-es">
              Con el nombre de la antigua ciudad de <em>Babilonia</em> — cuna del lenguaje escrito —
              Babil perpetúa el legado de la comunicación entre culturas. Creemos que cada palabra
              tiene peso, y cada traducción es un acto de confianza.
            </p>
            <p class="about-body content-bs">
              Nazvani po drevnom gradu <em>Babilonu</em> — kolijevci pisanog jezika — Babil
              nastavlja nasljeđe komunikacije između kultura. Vjerujemo da svaka riječ nosi težinu,
              a svaki prijevod je čin povjerenja.
            </p>
            <p class="about-body content-sq">
              I quajtur sipas qytetit antik të <em>Babilonisë</em> — djepit të gjuhës së shkruar —
              Babil vazhdon trashëgiminë e komunikimit mes kulturave. Ne besojmë se çdo fjalë ka
              peshë dhe çdo përkthim është një akt besimi.
            </p>

            <div class="about-stats">
              <div class="stat">
                <div class="stat-number">25+</div>
                <div class="stat-label content-en">Language Pairs</div>
                <div class="stat-label content-es">Pares de Idiomas</div>
                <div class="stat-label content-bs">Jezičnih Parova</div>
                <div class="stat-label content-sq">Çifte Gjuhësh</div>
              </div>
              <div class="stat">
                <div class="stat-number">500+</div>
                <div class="stat-label content-en">Projects Completed</div>
                <div class="stat-label content-es">Proyectos Completados</div>
                <div class="stat-label content-bs">Završenih Projekata</div>
                <div class="stat-label content-sq">Projekte të Përfunduara</div>
              </div>
              <div class="stat">
                <div class="stat-number">98%</div>
                <div class="stat-label content-en">Client Satisfaction</div>
                <div class="stat-label content-es">Satisfacción del Cliente</div>
                <div class="stat-label content-bs">Zadovoljstvo Klijenata</div>
                <div class="stat-label content-sq">Kënaqësia e Klientëve</div>
              </div>
              <div class="stat">
                <div class="stat-number">48h</div>
                <div class="stat-label content-en">Average Turnaround</div>
                <div class="stat-label content-es">Tiempo de Entrega</div>
                <div class="stat-label content-bs">Prosječan Rok Dostave</div>
                <div class="stat-label content-sq">Koha Mesatare e Dorëzimit</div>
              </div>
            </div>
          </div>

          <div class="about-tower-container">
            <svg class="about-tower" viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="58" y="0" width="44" height="32" fill="#1a1814" />
              <rect x="44" y="32" width="72" height="28" fill="#1a1814" />
              <rect x="63" y="38" width="12" height="12" fill="#d8d4c4" />
              <rect x="20" y="60" width="52" height="28" fill="#1a1814" />
              <rect x="22" y="65" width="10" height="10" fill="#d8d4c4" />
              <rect x="88" y="60" width="52" height="28" fill="#1a1814" />
              <rect x="128" y="65" width="10" height="10" fill="#d8d4c4" />
              <rect x="5" y="88" width="60" height="30" fill="#1a1814" />
              <rect x="7" y="94" width="12" height="12" fill="#d8d4c4" />
              <rect x="95" y="88" width="60" height="30" fill="#1a1814" />
              <rect x="143" y="94" width="12" height="12" fill="#d8d4c4" />
              <rect x="0" y="118" width="70" height="32" fill="#1a1814" />
              <rect x="2" y="124" width="12" height="12" fill="#d8d4c4" />
              <rect x="32" y="124" width="12" height="12" fill="#d8d4c4" />
              <rect x="90" y="118" width="70" height="32" fill="#1a1814" />
              <rect x="146" y="124" width="12" height="12" fill="#d8d4c4" />
              <rect x="114" y="124" width="12" height="12" fill="#d8d4c4" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="services">
      <div class="section-inner">
        <div class="section-label">
          <span class="content-en">What We Offer</span>
          <span class="content-es">Lo que Ofrecemos</span>
          <span class="content-bs">Šta Nudimo</span>
          <span class="content-sq">Çfarë Ofrojmë</span>
        </div>

        <h2 class="services-heading content-en">Precision at every level of language</h2>
        <h2 class="services-heading content-es">Precisión en cada nivel del idioma</h2>
        <h2 class="services-heading content-bs">Preciznost na svakom nivou jezika</h2>
        <h2 class="services-heading content-sq">Saktësi në çdo nivel të gjuhës</h2>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">𒄿</div>
            <div class="service-title content-en">Document Translation</div>
            <div class="service-title content-es">Traducción de Documentos</div>
            <div class="service-title content-bs">Prevođenje Dokumenata</div>
            <div class="service-title content-sq">Përkthim Dokumentesh</div>
            <p class="service-desc content-en">
              Legal, medical, technical, and personal documents translated with certified accuracy
              and cultural sensitivity.
            </p>
            <p class="service-desc content-es">
              Documentos legales, médicos, técnicos y personales traducidos con precisión
              certificada y sensibilidad cultural.
            </p>
            <p class="service-desc content-bs">
              Pravni, medicinski, tehnički i lični dokumenti prevedeni s ovjerenom preciznošću i
              kulturnom osjetljivošću.
            </p>
            <p class="service-desc content-sq">
              Dokumente ligjore, mjekësore, teknike dhe personale të përkthyera me saktësi të
              certifikuar dhe ndjeshmëri kulturore.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">𒀭</div>
            <div class="service-title content-en">Live Interpretation</div>
            <div class="service-title content-es">Interpretación en Vivo</div>
            <div class="service-title content-bs">Simultano Tumačenje</div>
            <div class="service-title content-sq">Interpretim i Drejtpërdrejtë</div>
            <p class="service-desc content-en">
              Consecutive and simultaneous interpretation for meetings, hearings, medical
              appointments, and conferences.
            </p>
            <p class="service-desc content-es">
              Interpretación consecutiva y simultánea para reuniones, audiencias, citas médicas y
              conferencias.
            </p>
            <p class="service-desc content-bs">
              Konsekutivno i simultano tumačenje za sastanke, ročišta, medicinske preglede i
              konferencije.
            </p>
            <p class="service-desc content-sq">
              Interpretim konsekutiv dhe simultan për takime, seanca, vizita mjekësore dhe
              konferenca.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">𒌷</div>
            <div class="service-title content-en">Certified Translation</div>
            <div class="service-title content-es">Traducción Certificada</div>
            <div class="service-title content-bs">Ovjereni Prijevod</div>
            <div class="service-title content-sq">Përkthim i Certifikuar</div>
            <p class="service-desc content-en">
              Official certified translations accepted by courts, immigration authorities, and
              government agencies.
            </p>
            <p class="service-desc content-es">
              Traducciones certificadas oficiales aceptadas por tribunales, autoridades de
              inmigración y organismos gubernamentales.
            </p>
            <p class="service-desc content-bs">
              Zvanični ovjereni prijevodi prihvaćeni od sudova, imigracijskih vlasti i vladinih
              agencija.
            </p>
            <p class="service-desc content-sq">
              Përkthime zyrtare të certifikuara të pranuara nga gjykatat, autoritetet e emigracionit
              dhe agjencitë qeveritare.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">𒁹</div>
            <div class="service-title content-en">Business Localization</div>
            <div class="service-title content-es">Localización Empresarial</div>
            <div class="service-title content-bs">Poslovna Lokalizacija</div>
            <div class="service-title content-sq">Lokalizim Biznesi</div>
            <p class="service-desc content-en">
              Website, marketing, and corporate communications adapted for target language
              audiences and cultural contexts.
            </p>
            <p class="service-desc content-es">
              Sitio web, marketing y comunicaciones corporativas adaptados para audiencias en el
              idioma de destino.
            </p>
            <p class="service-desc content-bs">
              Web stranice, marketing i korporativne komunikacije prilagođene ciljanoj publici i
              kulturnom kontekstu.
            </p>
            <p class="service-desc content-sq">
              Faqe interneti, marketing dhe komunikime korporative të përshtatura për audiencat dhe
              kontekstet kulturore të gjuhës së synuar.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">𒂗</div>
            <div class="service-title content-en">Medical Interpretation</div>
            <div class="service-title content-es">Interpretación Médica</div>
            <div class="service-title content-bs">Medicinska Tumačenja</div>
            <div class="service-title content-sq">Interpretim Mjekësor</div>
            <p class="service-desc content-en">
              Specialized healthcare interpreting ensuring accurate patient-provider communication
              in critical settings.
            </p>
            <p class="service-desc content-es">
              Interpretación especializada en salud para garantizar comunicación precisa entre
              paciente y médico.
            </p>
            <p class="service-desc content-bs">
              Specijalizovano medicinsko tumačenje koje osigurava tačnu komunikaciju između
              pacijenta i liječnika.
            </p>
            <p class="service-desc content-sq">
              Interpretim i specializuar shëndetësor që siguron komunikim të saktë midis pacientit
              dhe mjekut në situata kritike.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">𒍪</div>
            <div class="service-title content-en">Legal Services</div>
            <div class="service-title content-es">Servicios Legales</div>
            <div class="service-title content-bs">Pravne Usluge</div>
            <div class="service-title content-sq">Shërbime Ligjore</div>
            <p class="service-desc content-en">
              Court-ready translations and interpretation for depositions, trials, and all legal
              proceedings.
            </p>
            <p class="service-desc content-es">
              Traducciones listas para el tribunal e interpretación para deposiciones, juicios y
              todos los procedimientos legales.
            </p>
            <p class="service-desc content-bs">
              Prijevodi i tumačenja za sudske postupke, saslušanja i sve pravne procedure.
            </p>
            <p class="service-desc content-sq">
              Përkthime dhe interpretime të gatshme për gjykatë për dëshmi, gjykime dhe të gjitha
              procedurat ligjore.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="languages" class="languages">
      <div class="section-inner">
        <div class="languages-layout">
          <div>
            <div class="section-label">
              <span class="content-en">Our Languages</span>
              <span class="content-es">Nuestros Idiomas</span>
              <span class="content-bs">Naši Jezici</span>
              <span class="content-sq">Gjuhët Tona</span>
            </div>

            <h2 class="lang-intro-heading-dynamic" v-html="activeLanguageSectionCopy.headingHtml"></h2>
            <p class="lang-intro-body-dynamic">
              {{ activeLanguageSectionCopy.body }}
            </p>
            <h2 class="lang-intro-heading content-en">Three languages.<br />One voice.</h2>
            <h2 class="lang-intro-heading content-es">Cuatro idiomas.<br />Una voz.</h2>
            <h2 class="lang-intro-heading content-bs">Četiri jezika.<br />Jedan glas.</h2>
            <h2 class="lang-intro-heading content-sq">Katër gjuhë.<br />Një zë.</h2>

            <p class="lang-intro-body content-en">
              We provide expert translation and interpretation across English, Spanish, Bosnian,
              and Albanian — covering communities across the Americas, Europe, and the Balkans.
            </p>
            <p class="lang-intro-body content-es">
              Ofrecemos traducción e interpretación experta en inglés, español, bosnio y albanés,
              cubriendo comunidades en las Américas, Europa y los Balcanes.
            </p>
            <p class="lang-intro-body content-bs">
              Pružamo stručne prijevode i tumačenja na engleskom, španskom, bosanskom i albanskom
              jeziku — pokrivajući zajednice u Americi, Evropi i na Balkanu.
            </p>
            <p class="lang-intro-body content-sq">
              Ofrojmë përkthim dhe interpretim profesional në anglisht, spanjisht, boshnjakisht
              dhe shqip — duke mbuluar komunitete në Amerikë, Evropë dhe Ballkan.
            </p>
          </div>

          <div class="lang-cards">
            <div class="lang-card">
              <span class="lang-flag">🇺🇸</span>
              <div class="lang-name">English</div>
              <span class="lang-native">English</span>
              <p class="lang-desc content-en">
                Native and professional-level English across legal, medical, technical, and
                business domains.
              </p>
              <p class="lang-desc content-es">
                Inglés nativo y de nivel profesional en ámbitos legales, médicos, técnicos y
                empresariales.
              </p>
              <p class="lang-desc content-bs">
                Maternji i profesionalni engleski u pravnim, medicinskim, tehničkim i poslovnim
                oblastima.
              </p>
              <p class="lang-desc content-sq">
                Anglishte amtare dhe e nivelit profesional në fushat juridike, mjekësore, teknike
                dhe të biznesit.
              </p>
            </div>

            <div class="lang-card">
              <span class="lang-flag">🇪🇸</span>
              <div class="lang-name">Spanish</div>
              <span class="lang-native">Español</span>
              <p class="lang-desc content-en">
                Regional Spanish dialects supported — Latin American and Castilian — with cultural
                accuracy.
              </p>
              <p class="lang-desc content-es">
                Dialectos regionales del español — latinoamericano y castellano — con precisión
                cultural.
              </p>
              <p class="lang-desc content-bs">
                Podržani regionalni španski dijalekti — latinoamerički i kastiljski — s kulturnom
                tačnošću.
              </p>
              <p class="lang-desc content-sq">
                Dialekte rajonale të spanjishtes — latinoamerikane dhe kastiliane — me saktësi
                kulturore.
              </p>
            </div>

            <div class="lang-card">
              <span class="lang-flag">🇧🇦</span>
              <div class="lang-name">Bosnian</div>
              <span class="lang-native">Bosanski</span>
              <p class="lang-desc content-en">
                Expert Bosnian translators familiar with Balkan legal systems, healthcare, and
                diaspora communities.
              </p>
              <p class="lang-desc content-es">
                Traductores expertos de bosnio familiarizados con los sistemas legales balcánicos y
                comunidades de la diáspora.
              </p>
              <p class="lang-desc content-bs">
                Stručni bosanski prevodioci upoznati s balkanskim pravnim sistemima, zdravstvenom
                zaštitom i dijasporom.
              </p>
              <p class="lang-desc content-sq">
                Përkthyes profesionistë të boshnjakishtes të njohur me sistemet juridike
                ballkanike, kujdesin shëndetësor dhe diasporën.
              </p>
            </div>

            <div class="lang-card">
              <span class="lang-flag">🇦🇱</span>
              <div class="lang-name">Albanian</div>
              <span class="lang-native">Shqip</span>
              <p class="lang-desc content-en">
                Expert Albanian translation for legal, administrative, family, and cross-border
                communication in Kosovo, Albania, and diaspora communities.
              </p>
              <p class="lang-desc content-es">
                Traducción experta de albanés para comunicación legal, administrativa, familiar y
                transfronteriza en Kosovo, Albania y la diáspora.
              </p>
              <p class="lang-desc content-bs">
                Stručan albanski prijevod za pravnu, administrativnu, porodičnu i prekograničnu
                komunikaciju na Kosovu, u Albaniji i dijaspori.
              </p>
              <p class="lang-desc content-sq">
                Përkthim profesional të shqipes për komunikim ligjor, administrativ, familjar dhe
                ndërkufitar në Kosovë, Shqipëri dhe diasporë.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="process">
      <div class="section-inner">
        <h2 class="process-heading content-en">How It Works</h2>
        <h2 class="process-heading content-es">Cómo Funciona</h2>
        <h2 class="process-heading content-bs">Kako Funkcioniše</h2>
        <h2 class="process-heading content-sq">Si Funksionon</h2>

        <div class="process-steps">
          <div class="process-step">
            <div class="step-num">I</div>
            <div class="step-title content-en">Submit</div>
            <div class="step-title content-es">Enviar</div>
            <div class="step-title content-bs">Pošalji</div>
            <div class="step-title content-sq">Dërgo</div>
            <p class="step-desc content-en">
              Share your document or describe your interpretation needs through our contact form.
            </p>
            <p class="step-desc content-es">
              Comparta su documento o describa sus necesidades de interpretación a través del
              formulario.
            </p>
            <p class="step-desc content-bs">
              Podijelite dokument ili opišite potrebe za tumačenjem putem našeg kontakt obrasca.
            </p>
            <p class="step-desc content-sq">
              Ndani dokumentin tuaj ose përshkruani nevojat tuaja për interpretim përmes formularit
              tonë të kontaktit.
            </p>
          </div>

          <div class="process-step">
            <div class="step-num">II</div>
            <div class="step-title content-en">Review</div>
            <div class="step-title content-es">Revisión</div>
            <div class="step-title content-bs">Pregled</div>
            <div class="step-title content-sq">Shqyrtim</div>
            <p class="step-desc content-en">
              We assess scope, complexity, and provide a transparent quote within 24 hours.
            </p>
            <p class="step-desc content-es">
              Evaluamos el alcance, la complejidad y proporcionamos un presupuesto transparente en
              24 horas.
            </p>
            <p class="step-desc content-bs">
              Procjenjujemo opseg, složenost i dajemo transparentnu ponudu u roku od 24 sata.
            </p>
            <p class="step-desc content-sq">
              Vlerësojmë fushëveprimin, kompleksitetin dhe japim një ofertë të qartë brenda 24
              orëve.
            </p>
          </div>

          <div class="process-step">
            <div class="step-num">III</div>
            <div class="step-title content-en">Translate</div>
            <div class="step-title content-es">Traducir</div>
            <div class="step-title content-bs">Prevodi</div>
            <div class="step-title content-sq">Përkthe</div>
            <p class="step-desc content-en">
              Expert linguists translate or interpret with precision, accuracy, and cultural
              nuance.
            </p>
            <p class="step-desc content-es">
              Lingüistas expertos traducen o interpretan con precisión y matices culturales.
            </p>
            <p class="step-desc content-bs">
              Stručni lingvisti prevode ili tumače s preciznošću, tačnošću i kulturnim nijansama.
            </p>
            <p class="step-desc content-sq">
              Gjuhëtarët tanë ekspertë përkthejnë ose interpretojnë me saktësi, përpikëri dhe
              ndjeshmëri kulturore.
            </p>
          </div>

          <div class="process-step">
            <div class="step-num">IV</div>
            <div class="step-title content-en">Deliver</div>
            <div class="step-title content-es">Entregar</div>
            <div class="step-title content-bs">Isporuka</div>
            <div class="step-title content-sq">Dorëzim</div>
            <p class="step-desc content-en">
              Final delivery in your preferred format — certified, stamped, and ready for official
              use.
            </p>
            <p class="step-desc content-es">
              Entrega final en el formato preferido: certificado, sellado y listo para uso oficial.
            </p>
            <p class="step-desc content-bs">
              Konačna isporuka u željenom formatu — ovjerena, pečatirana i spremna za zvaničnu
              upotrebu.
            </p>
            <p class="step-desc content-sq">
              Dorëzim final në formatin tuaj të preferuar — i certifikuar, i vulosur dhe gati për
              përdorim zyrtar.
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="quote-band">
      <div class="cuneiform-bg" aria-hidden="true">{{ quoteScript }}</div>

      <blockquote class="quote-text content-en">
        "The limits of my language are the limits of my world."
      </blockquote>
      <blockquote class="quote-text content-es">
        "Los límites de mi idioma son los límites de mi mundo."
      </blockquote>
      <blockquote class="quote-text content-bs">
        "Granice mog jezika su granice mog svijeta."
      </blockquote>
      <blockquote class="quote-text content-sq">
        "Kufijtë e gjuhës sime janë kufijtë e botës sime."
      </blockquote>
      <p class="quote-source">— Ludwig Wittgenstein</p>
    </div>

    <section id="contact" class="contact">
      <div class="section-inner">
        <div class="contact-grid">
          <div>
            <div class="section-label">
              <span class="content-en">Get In Touch</span>
              <span class="content-es">Contáctenos</span>
              <span class="content-bs">Kontaktirajte nas</span>
              <span class="content-sq">Na Kontaktoni</span>
            </div>

            <h2 class="contact-heading content-en">Let's start the conversation</h2>
            <h2 class="contact-heading content-es">Comencemos la conversación</h2>
            <h2 class="contact-heading content-bs">Započnimo razgovor</h2>
            <h2 class="contact-heading content-sq">Le ta fillojmë bisedën</h2>

            <p class="contact-body-dynamic">
              {{ activeContactBody }}
            </p>
            <p class="contact-body content-en">
              Whether you need a certified translation, a live interpreter, or a full localization
              project — we're here to help, in any of our four languages.
            </p>
            <p class="contact-body content-es">
              Ya sea que necesite una traducción certificada, un intérprete en vivo o un proyecto
              de localización completo — estamos aquí para ayudar, en cualquiera de nuestros cuatro
              idiomas.
            </p>
            <p class="contact-body content-bs">
              Bilo da trebate ovjereni prijevod, živog tumača ili cjeloviti projekat lokalizacije —
              ovdje smo da pomognemo, na bilo kom od naša četiri jezika.
            </p>
            <p class="contact-body content-sq">
              Qoftë se ju nevojitet një përkthim i certifikuar, një interpretues i drejtpërdrejtë
              apo një projekt i plotë lokalizimi — ne jemi këtu për t'ju ndihmuar, në cilëndo nga
              katër gjuhët tona.
            </p>

            <div class="contact-details">
              <div class="contact-item">
                <span class="contact-item-label content-en">Email</span>
                <span class="contact-item-label content-es">Email</span>
                <span class="contact-item-label content-bs">Email</span>
                <span class="contact-item-label content-sq">Email</span>
                <a class="contact-item-value contact-item-link" href="mailto:info@babiltranslation.com">
                  info@babiltranslation.com
                </a>
              </div>
              <div class="contact-item">
                <span class="contact-item-label content-en">Phone</span>
                <span class="contact-item-label content-es">Teléfono</span>
                <span class="contact-item-label content-bs">Telefon</span>
                <span class="contact-item-label content-sq">Telefoni</span>
                <a class="contact-item-value contact-item-link" href="tel:+38345741555">
                  +38345741555
                </a>
              </div>
              <div class="contact-item">
                <span class="contact-item-label content-en">Hours</span>
                <span class="contact-item-label content-es">Horario</span>
                <span class="contact-item-label content-bs">Radno Vrijeme</span>
                <span class="contact-item-label content-sq">Orari</span>
                <span class="contact-item-value content-en">Mon–Fri, 8am–6pm</span>
                <span class="contact-item-value content-es">Lun–Vie, 8am–6pm</span>
                <span class="contact-item-value content-bs">Pon–Pet, 8–18h</span>
                <span class="contact-item-value content-sq">Hën–Pre, 8:00–18:00</span>
              </div>
            </div>
          </div>

          <div>
            <form
              ref="contactForm"
              class="contact-form"
              @submit.prevent="submitForm"
              @input="clearSubmissionState"
              @change="clearSubmissionState"
            >
              <fieldset class="contact-fieldset" :disabled="submissionState === 'submitting'">
                <div class="form-group honeypot-field" aria-hidden="true">
                  <label class="form-label" for="website">Website</label>
                  <input
                    id="website"
                    v-model="form.website"
                    type="text"
                    class="form-input"
                    name="website"
                    tabindex="-1"
                    autocomplete="off"
                  />
                </div>
                <div class="form-row">
              <div class="form-group">
                <label class="form-label content-en">First Name</label>
                <label class="form-label content-es">Nombre</label>
                <label class="form-label content-bs">Ime</label>
                <label class="form-label content-sq">Emri</label>
                <input
                  v-model.trim="form.firstName"
                  type="text"
                  class="form-input"
                  name="firstName"
                  autocomplete="given-name"
                  maxlength="80"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label content-en">Last Name</label>
                <label class="form-label content-es">Apellido</label>
                <label class="form-label content-bs">Prezime</label>
                <label class="form-label content-sq">Mbiemri</label>
                <input
                  v-model.trim="form.lastName"
                  type="text"
                  class="form-input"
                  name="lastName"
                  autocomplete="family-name"
                  maxlength="80"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <input
                v-model.trim="form.email"
                type="email"
                class="form-input"
                name="email"
                autocomplete="email"
                maxlength="254"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label content-en">Service Needed</label>
              <label class="form-label content-es">Servicio Requerido</label>
              <label class="form-label content-bs">Potrebna Usluga</label>
              <label class="form-label content-sq">Shërbimi i Nevojshëm</label>
              <select v-model="form.service" class="form-select" name="service" required>
                <option value="" disabled>{{ activeContactCopy.servicePlaceholder }}</option>
                <option v-for="option in currentServiceOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label content-en">Your Message</label>
              <label class="form-label content-es">Su Mensaje</label>
              <label class="form-label content-bs">Vaša Poruka</label>
              <label class="form-label content-sq">Mesazhi Juaj</label>
              <textarea
                v-model.trim="form.message"
                class="form-textarea"
                name="message"
                :placeholder="activeContactCopy.messagePlaceholder"
                minlength="20"
                maxlength="2500"
                required
              ></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="submissionState === 'submitting'">
              <span class="content-en">Send Request →</span>
              <span class="content-es">Enviar Solicitud →</span>
              <span class="content-bs">Pošalji Zahtjev →</span>
              <span class="content-sq">Dërgo Kërkesën →</span>
            </button>
            <p v-if="submissionState === 'success'" class="form-status form-status-success" aria-live="polite">
              {{ activeContactCopy.success }}
            </p>
            <div v-else-if="submissionState === 'error'" class="form-status form-status-error" aria-live="polite">
              <p>{{ activeSubmissionError }}</p>
              <a class="form-status-link" :href="directEmailHref">
                {{ activeContactErrorCopy.emailFallback }}
              </a>
            </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="footer-logo">
        <svg width="24" height="26" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="28" y="0" width="24" height="18" fill="#d8d4c4" opacity="0.7" />
          <rect x="18" y="18" width="44" height="16" fill="#d8d4c4" opacity="0.7" />
          <rect x="5" y="34" width="32" height="16" fill="#d8d4c4" opacity="0.7" />
          <rect x="43" y="34" width="32" height="16" fill="#d8d4c4" opacity="0.7" />
          <rect x="0" y="50" width="38" height="18" fill="#d8d4c4" opacity="0.7" />
          <rect x="42" y="50" width="38" height="18" fill="#d8d4c4" opacity="0.7" />
        </svg>
        <span class="footer-logo-text">BABIL</span>
      </div>

      <span class="footer-copy">
        <span class="content-en">© 2026 Babil Translation &amp; Interpretation Services</span>
        <span class="content-es">© 2026 Servicios de Traducción e Interpretación Babil</span>
        <span class="content-bs">© 2026 Babil Usluge Prevođenja i Tumačenja</span>
        <span class="content-sq">© 2026 Babil Shërbime të Përkthimit dhe Interpretimit</span>
      </span>

      <ul class="footer-links">
        <li>
          <a href="#about">
            <span class="content-en">About</span>
            <span class="content-es">Acerca</span>
            <span class="content-bs">O nama</span>
            <span class="content-sq">Rreth Nesh</span>
          </a>
        </li>
        <li>
          <a href="#services">
            <span class="content-en">Services</span>
            <span class="content-es">Servicios</span>
            <span class="content-bs">Usluge</span>
            <span class="content-sq">Shërbimet</span>
          </a>
        </li>
        <li>
          <a href="#contact">
            <span class="content-en">Contact</span>
            <span class="content-es">Contacto</span>
            <span class="content-bs">Kontakt</span>
            <span class="content-sq">Kontakt</span>
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>
