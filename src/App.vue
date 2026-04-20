<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const appShell = ref(null)
const currentLang = ref('en')

const heroScript = `𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹
𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾
𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭`

const quoteScript = `𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹
𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾 𒌷 𒀭 𒂗 𒍪 𒁲 𒀭 𒂗 𒍪 𒁲 𒀭 𒁹 𒄿 𒈾`

let observer

function setLang(lang) {
  currentLang.value = lang
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
})

onBeforeUnmount(() => {
  observer?.disconnect()
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
          </a>
        </li>
        <li>
          <a href="#services">
            <span class="content-en">Services</span>
            <span class="content-es">Servicios</span>
            <span class="content-bs">Usluge</span>
          </a>
        </li>
        <li>
          <a href="#languages">
            <span class="content-en">Languages</span>
            <span class="content-es">Idiomas</span>
            <span class="content-bs">Jezici</span>
          </a>
        </li>
        <li>
          <a href="#contact">
            <span class="content-en">Contact</span>
            <span class="content-es">Contacto</span>
            <span class="content-bs">Kontakt</span>
          </a>
        </li>
      </ul>

      <div class="nav-lang">
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
        <p class="hero-tagline">
          <span class="content-en">Translation &amp; Interpretation Services</span>
          <span class="content-es">Servicios de Traducción e Interpretación</span>
          <span class="content-bs">Usluge Prevođenja i Tumačenja</span>
        </p>
        <div class="hero-langs">
          <span>English</span>
          <span>Español</span>
          <span>Bosanski</span>
        </div>
      </div>

      <div class="hero-scroll" aria-hidden="true">
        <span class="content-en">Scroll</span>
        <span class="content-es">Desplazar</span>
        <span class="content-bs">Skrolaj</span>
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
            </div>

            <h2 class="about-heading content-en">Bridging worlds through the power of language</h2>
            <h2 class="about-heading content-es">Uniendo mundos a través del poder del idioma</h2>
            <h2 class="about-heading content-bs">Premošćujemo svjetove snagom jezika</h2>

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

            <div class="about-stats">
              <div class="stat">
                <div class="stat-number">25+</div>
                <div class="stat-label content-en">Language Pairs</div>
                <div class="stat-label content-es">Pares de Idiomas</div>
                <div class="stat-label content-bs">Jezičnih Parova</div>
              </div>
              <div class="stat">
                <div class="stat-number">500+</div>
                <div class="stat-label content-en">Projects Completed</div>
                <div class="stat-label content-es">Proyectos Completados</div>
                <div class="stat-label content-bs">Završenih Projekata</div>
              </div>
              <div class="stat">
                <div class="stat-number">98%</div>
                <div class="stat-label content-en">Client Satisfaction</div>
                <div class="stat-label content-es">Satisfacción del Cliente</div>
                <div class="stat-label content-bs">Zadovoljstvo Klijenata</div>
              </div>
              <div class="stat">
                <div class="stat-number">48h</div>
                <div class="stat-label content-en">Average Turnaround</div>
                <div class="stat-label content-es">Tiempo de Entrega</div>
                <div class="stat-label content-bs">Prosječan Rok Dostave</div>
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
        </div>

        <h2 class="services-heading content-en">Precision at every level of language</h2>
        <h2 class="services-heading content-es">Precisión en cada nivel del idioma</h2>
        <h2 class="services-heading content-bs">Preciznost na svakom nivou jezika</h2>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">𒄿</div>
            <div class="service-title content-en">Document Translation</div>
            <div class="service-title content-es">Traducción de Documentos</div>
            <div class="service-title content-bs">Prevođenje Dokumenata</div>
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
          </div>

          <div class="service-card">
            <div class="service-icon">𒀭</div>
            <div class="service-title content-en">Live Interpretation</div>
            <div class="service-title content-es">Interpretación en Vivo</div>
            <div class="service-title content-bs">Simultano Tumačenje</div>
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
          </div>

          <div class="service-card">
            <div class="service-icon">𒌷</div>
            <div class="service-title content-en">Certified Translation</div>
            <div class="service-title content-es">Traducción Certificada</div>
            <div class="service-title content-bs">Ovjereni Prijevod</div>
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
          </div>

          <div class="service-card">
            <div class="service-icon">𒁹</div>
            <div class="service-title content-en">Business Localization</div>
            <div class="service-title content-es">Localización Empresarial</div>
            <div class="service-title content-bs">Poslovna Lokalizacija</div>
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
          </div>

          <div class="service-card">
            <div class="service-icon">𒂗</div>
            <div class="service-title content-en">Medical Interpretation</div>
            <div class="service-title content-es">Interpretación Médica</div>
            <div class="service-title content-bs">Medicinska Tumačenja</div>
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
          </div>

          <div class="service-card">
            <div class="service-icon">𒍪</div>
            <div class="service-title content-en">Legal Services</div>
            <div class="service-title content-es">Servicios Legales</div>
            <div class="service-title content-bs">Pravne Usluge</div>
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
            </div>

            <h2 class="lang-intro-heading content-en">Three languages.<br />One voice.</h2>
            <h2 class="lang-intro-heading content-es">Tres idiomas.<br />Una voz.</h2>
            <h2 class="lang-intro-heading content-bs">Tri jezika.<br />Jedan glas.</h2>

            <p class="lang-intro-body content-en">
              We provide expert translation and interpretation across English, Spanish, and Bosnian
              — covering communities across the Americas, Europe, and the Balkans.
            </p>
            <p class="lang-intro-body content-es">
              Ofrecemos traducción e interpretación experta en inglés, español y bosnio, cubriendo
              comunidades en las Américas, Europa y los Balcanes.
            </p>
            <p class="lang-intro-body content-bs">
              Pružamo stručne prijevode i tumačenja na engleskom, španskom i bosanskom jeziku —
              pokrivajući zajednice u Americi, Evropi i na Balkanu.
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

        <div class="process-steps">
          <div class="process-step">
            <div class="step-num">I</div>
            <div class="step-title content-en">Submit</div>
            <div class="step-title content-es">Enviar</div>
            <div class="step-title content-bs">Pošalji</div>
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
          </div>

          <div class="process-step">
            <div class="step-num">II</div>
            <div class="step-title content-en">Review</div>
            <div class="step-title content-es">Revisión</div>
            <div class="step-title content-bs">Pregled</div>
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
          </div>

          <div class="process-step">
            <div class="step-num">III</div>
            <div class="step-title content-en">Translate</div>
            <div class="step-title content-es">Traducir</div>
            <div class="step-title content-bs">Prevodi</div>
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
          </div>

          <div class="process-step">
            <div class="step-num">IV</div>
            <div class="step-title content-en">Deliver</div>
            <div class="step-title content-es">Entregar</div>
            <div class="step-title content-bs">Isporuka</div>
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
            </div>

            <h2 class="contact-heading content-en">Let's start the conversation</h2>
            <h2 class="contact-heading content-es">Comencemos la conversación</h2>
            <h2 class="contact-heading content-bs">Započnimo razgovor</h2>

            <p class="contact-body content-en">
              Whether you need a certified translation, a live interpreter, or a full localization
              project — we're here to help, in any of our three languages.
            </p>
            <p class="contact-body content-es">
              Ya sea que necesite una traducción certificada, un intérprete en vivo o un proyecto
              de localización completo — estamos aquí para ayudar, en cualquiera de nuestros tres
              idiomas.
            </p>
            <p class="contact-body content-bs">
              Bilo da trebate ovjereni prijevod, živog tumača ili cjeloviti projekat lokalizacije —
              ovdje smo da pomognemo, na bilo kom od naša tri jezika.
            </p>

            <div class="contact-details">
              <div class="contact-item">
                <span class="contact-item-label">Email</span>
                <span class="contact-item-value">info@babil-translations.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-item-label">Phone</span>
                <span class="contact-item-value">+1 (800) BABIL-00</span>
              </div>
              <div class="contact-item">
                <span class="contact-item-label content-en">Hours</span>
                <span class="contact-item-label content-es">Horario</span>
                <span class="contact-item-label content-bs">Radno Vrijeme</span>
                <span class="contact-item-value content-en">Mon–Fri, 8am–6pm</span>
                <span class="contact-item-value content-es">Lun–Vie, 8am–6pm</span>
                <span class="contact-item-value content-bs">Pon–Pet, 8–18h</span>
              </div>
            </div>
          </div>

          <div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label content-en">First Name</label>
                <label class="form-label content-es">Nombre</label>
                <label class="form-label content-bs">Ime</label>
                <input type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label content-en">Last Name</label>
                <label class="form-label content-es">Apellido</label>
                <label class="form-label content-bs">Prezime</label>
                <input type="text" class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" />
            </div>

            <div class="form-group">
              <label class="form-label content-en">Service Needed</label>
              <label class="form-label content-es">Servicio Requerido</label>
              <label class="form-label content-bs">Potrebna Usluga</label>
              <select class="form-select">
                <option class="content-en">Document Translation</option>
                <option class="content-es">Traducción de Documentos</option>
                <option class="content-bs">Prevođenje Dokumenata</option>
                <option>Live Interpretation / Interpretación en Vivo / Tumačenje</option>
                <option>Certified Translation / Ovjereni Prijevod</option>
                <option>Business Localization / Localización Empresarial</option>
                <option>Legal Services / Servicios Legales / Pravne Usluge</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label content-en">Your Message</label>
              <label class="form-label content-es">Su Mensaje</label>
              <label class="form-label content-bs">Vaša Poruka</label>
              <textarea class="form-textarea" placeholder=""></textarea>
            </div>

            <button type="button" class="submit-btn">
              <span class="content-en">Send Request →</span>
              <span class="content-es">Enviar Solicitud →</span>
              <span class="content-bs">Pošalji Zahtjev →</span>
            </button>
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

      <span class="footer-copy">© 2026 Babil Translation &amp; Interpretation Services</span>

      <ul class="footer-links">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </footer>
  </div>
</template>
