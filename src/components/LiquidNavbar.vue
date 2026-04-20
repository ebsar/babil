<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { generateDisplacementMapDataUrl } from '../lib/liquidMath'

const props = defineProps({
  mode: {
    type: String,
    default: 'shader',
  },
  effect: {
    type: String,
    default: 'liquidGlass',
  },
  displacementScale: {
    type: Number,
    default: 82,
  },
  blurAmount: {
    type: Number,
    default: 0.22,
  },
  saturation: {
    type: Number,
    default: 150,
  },
  aberrationIntensity: {
    type: Number,
    default: 3.5,
  },
  elasticity: {
    type: Number,
    default: 0.24,
  },
  cornerRadius: {
    type: Number,
    default: 999,
  },
  overLight: {
    type: Boolean,
    default: false,
  },
})

const links = ['Studio', 'Library', 'Signals', 'Launches']
const wrapperRef = ref(null)
const glassRef = ref(null)
const mapUrl = ref('')
const isHovered = ref(false)
const isActive = ref(false)
const glassSize = ref({ width: 760, height: 88 })
const pointer = ref({
  offsetX: 0,
  offsetY: 0,
  translateX: 0,
  translateY: 0,
  scaleX: 1,
  scaleY: 1,
})

const isFirefox =
  typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox')

const filterId = `glass-filter-${Math.random().toString(36).slice(2, 10)}`
let resizeObserver
let mapFrame = 0
let pointerFrame = 0
const pointerCache = {
  x: 0,
  y: 0,
}

const queueMapUpdate = () => {
  cancelAnimationFrame(mapFrame)
  mapFrame = requestAnimationFrame(() => {
    mapUrl.value = generateDisplacementMapDataUrl({
      mode: props.mode,
      effect: props.effect,
      width: glassSize.value.width,
      height: glassSize.value.height,
      cornerRadius: props.cornerRadius,
    })
  })
}

const updateSize = () => {
  if (!glassRef.value) {
    return
  }

  const rect = glassRef.value.getBoundingClientRect()
  glassSize.value = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  }

  queueMapUpdate()
}

const computePointerState = (clientX, clientY) => {
  if (!wrapperRef.value) {
    return
  }

  const rect = wrapperRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = clientX - centerX
  const deltaY = clientY - centerY
  const edgeDistanceX = Math.max(0, Math.abs(deltaX) - rect.width / 2)
  const edgeDistanceY = Math.max(0, Math.abs(deltaY) - rect.height / 2)
  const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY)
  const activationZone = 240

  if (edgeDistance > activationZone) {
    pointer.value = {
      offsetX: (deltaX / Math.max(rect.width, 1)) * 100,
      offsetY: (deltaY / Math.max(rect.height, 1)) * 100,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
    }
    return
  }

  const fade = 1 - edgeDistance / activationZone
  const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  const normalizedX = centerDistance === 0 ? 0 : deltaX / centerDistance
  const normalizedY = centerDistance === 0 ? 0 : deltaY / centerDistance
  const stretch = Math.min(centerDistance / 320, 1) * props.elasticity * fade

  pointer.value = {
    offsetX: (deltaX / Math.max(rect.width, 1)) * 120,
    offsetY: (deltaY / Math.max(rect.height, 1)) * 120,
    translateX: deltaX * props.elasticity * 0.11 * fade,
    translateY: deltaY * props.elasticity * 0.09 * fade,
    scaleX: Math.max(
      0.86,
      1 + Math.abs(normalizedX) * stretch * 0.34 - Math.abs(normalizedY) * stretch * 0.16,
    ),
    scaleY: Math.max(
      0.86,
      1 + Math.abs(normalizedY) * stretch * 0.34 - Math.abs(normalizedX) * stretch * 0.16,
    ),
  }
}

const handlePointerMove = (event) => {
  pointerCache.x = event.clientX
  pointerCache.y = event.clientY
  cancelAnimationFrame(pointerFrame)
  pointerFrame = requestAnimationFrame(() => {
    computePointerState(pointerCache.x, pointerCache.y)
  })
}

const resetActive = () => {
  isActive.value = false
}

const handleLeave = () => {
  isHovered.value = false
  isActive.value = false
}

const blurPixels = computed(() => (props.overLight ? 12 : 4) + props.blurAmount * 32)
const greenScale = computed(() =>
  Math.max(props.displacementScale * 0.18, props.displacementScale * (1 - props.aberrationIntensity * 0.05)),
)
const blueScale = computed(() =>
  Math.max(props.displacementScale * 0.12, props.displacementScale * (1 - props.aberrationIntensity * 0.1)),
)
const surfaceScale = computed(() => {
  if (props.displacementScale <= 0) {
    return 0
  }

  const multiplier = props.mode === 'shader' ? 0.42 : 0.28
  return props.displacementScale * multiplier
})
const edgeTableValues = computed(() => `0 ${Math.min(0.85, props.aberrationIntensity * 0.06)} 1`)
const aberrationBlur = computed(() => Math.max(0.12, 0.58 - props.aberrationIntensity * 0.06))

const wrapperStyle = computed(() => ({
  '--nav-radius': props.cornerRadius >= 999 ? '999px' : `${props.cornerRadius}px`,
  '--glow-angle': `${135 + pointer.value.offsetX * 1.18}deg`,
  '--glow-stop-one': `${Math.max(12, 33 + pointer.value.offsetY * 0.28)}%`,
  '--glow-stop-two': `${Math.min(90, 67 + pointer.value.offsetY * 0.34)}%`,
  '--glow-alpha-one': (0.15 + Math.abs(pointer.value.offsetX) * 0.008).toFixed(3),
  '--glow-alpha-two': (0.42 + Math.abs(pointer.value.offsetX) * 0.012).toFixed(3),
  '--overlay-alpha-one': (0.3 + Math.abs(pointer.value.offsetX) * 0.008).toFixed(3),
  '--overlay-alpha-two': (0.58 + Math.abs(pointer.value.offsetX) * 0.012).toFixed(3),
  '--soft-shadow-opacity': props.overLight ? 0.18 : 0,
  '--blend-shadow-opacity': props.overLight ? 1 : 0,
  transform: `translate3d(${pointer.value.translateX}px, ${pointer.value.translateY}px, 0) scaleX(${pointer.value.scaleX}) scaleY(${pointer.value.scaleY})`,
}))

const backdropStyle = computed(() => ({
  filter: isFirefox ? undefined : `url(#${filterId})`,
  backdropFilter: `blur(${blurPixels.value}px) saturate(${props.saturation}%)`,
  WebkitBackdropFilter: `blur(${blurPixels.value}px) saturate(${props.saturation}%)`,
}))

onMounted(() => {
  updateSize()

  if (glassRef.value) {
    resizeObserver = new ResizeObserver(() => updateSize())
    resizeObserver.observe(glassRef.value)
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerup', resetActive, { passive: true })
  window.addEventListener('resize', updateSize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(mapFrame)
  cancelAnimationFrame(pointerFrame)

  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', resetActive)
  window.removeEventListener('resize', updateSize)
})

watch(
  () => [props.mode, props.effect, props.cornerRadius],
  () => {
    queueMapUpdate()
  },
)
</script>

<template>
  <div
    ref="wrapperRef"
    class="liquid-navbar"
    :class="{
      'is-hovered': isHovered,
      'is-active': isActive,
      'is-over-light': overLight,
    }"
    :style="wrapperStyle"
  >
    <svg class="liquid-navbar__defs" aria-hidden="true">
      <defs>
        <filter
          :id="filterId"
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
          color-interpolation-filters="sRGB"
        >
          <feImage
            x="0"
            y="0"
            width="100%"
            height="100%"
            result="DISPLACEMENT_MAP"
            :href="mapUrl"
            preserveAspectRatio="xMidYMid slice"
          />

          <feColorMatrix
            in="DISPLACEMENT_MAP"
            type="matrix"
            values="0.3 0.3 0.3 0 0
                    0.3 0.3 0.3 0 0
                    0.3 0.3 0.3 0 0
                    0 0 0 1 0"
            result="EDGE_INTENSITY"
          />

          <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
            <feFuncA type="discrete" :tableValues="edgeTableValues" />
          </feComponentTransfer>

          <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            :scale="surfaceScale"
            xChannelSelector="R"
            yChannelSelector="B"
            result="SURFACE_DISPLACED"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            :scale="displacementScale"
            xChannelSelector="R"
            yChannelSelector="B"
            result="RED_DISPLACED"
          />
          <feColorMatrix
            in="RED_DISPLACED"
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="RED_CHANNEL"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            :scale="greenScale"
            xChannelSelector="R"
            yChannelSelector="B"
            result="GREEN_DISPLACED"
          />
          <feColorMatrix
            in="GREEN_DISPLACED"
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="GREEN_CHANNEL"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            :scale="blueScale"
            xChannelSelector="R"
            yChannelSelector="B"
            result="BLUE_DISPLACED"
          />
          <feColorMatrix
            in="BLUE_DISPLACED"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="BLUE_CHANNEL"
          />

          <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
          <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

          <feGaussianBlur in="RGB_COMBINED" :stdDeviation="aberrationBlur" result="ABERRATED_BLURRED" />
          <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION" />

          <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feComposite in="SURFACE_DISPLACED" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />
          <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
        </filter>
      </defs>
    </svg>

    <div class="liquid-navbar__overlight liquid-navbar__overlight--soft"></div>
    <div class="liquid-navbar__overlight liquid-navbar__overlight--blend"></div>

    <div
      ref="glassRef"
      class="liquid-navbar__shell"
      @mouseenter="isHovered = true"
      @mouseleave="handleLeave"
      @pointerdown="isActive = true"
      @pointerup="isActive = false"
      @pointercancel="isActive = false"
    >
      <span class="glass__warp" :style="backdropStyle"></span>

      <div class="liquid-navbar__content">
        <a class="liquid-navbar__brand" href="#">
          <span class="liquid-navbar__brand-mark"></span>
          Driftline
        </a>

        <div class="liquid-navbar__links">
          <a v-for="link in links" :key="link" href="#">{{ link }}</a>
        </div>

        <button class="liquid-navbar__cta" type="button">
          Tune Signal
        </button>
      </div>
    </div>

    <span class="liquid-navbar__ring liquid-navbar__ring--screen"></span>
    <span class="liquid-navbar__ring liquid-navbar__ring--overlay"></span>
    <div class="liquid-navbar__highlight liquid-navbar__highlight--hover"></div>
    <div class="liquid-navbar__highlight liquid-navbar__highlight--press"></div>
    <div class="liquid-navbar__highlight liquid-navbar__highlight--sheen"></div>
  </div>
</template>

<style scoped>
.liquid-navbar {
  position: relative;
  display: inline-block;
  pointer-events: auto;
  border-radius: var(--nav-radius);
  transform-origin: center center;
  transition: transform 0.2s ease-out;
  will-change: transform;
}

.liquid-navbar__defs {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.liquid-navbar__overlight,
.liquid-navbar__ring,
.liquid-navbar__highlight {
  position: absolute;
  inset: 0;
  border-radius: var(--nav-radius);
  pointer-events: none;
}

.liquid-navbar__overlight--soft {
  background: rgba(9, 14, 26, 0.95);
  opacity: var(--soft-shadow-opacity);
  transition: opacity 0.18s ease-out;
}

.liquid-navbar__overlight--blend {
  background: rgba(11, 14, 26, 0.92);
  mix-blend-mode: overlay;
  opacity: var(--blend-shadow-opacity);
  transition: opacity 0.18s ease-out;
}

.liquid-navbar__shell {
  position: relative;
  overflow: hidden;
  border-radius: var(--nav-radius);
  min-width: min(820px, calc(100vw - 3rem));
  box-shadow: 0 18px 56px rgba(4, 8, 17, 0.28);
}

.glass__warp {
  position: absolute;
  inset: 0;
}

.liquid-navbar__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 1rem 1.25rem;
  color: rgba(249, 252, 255, 0.98);
}

.liquid-navbar__brand,
.liquid-navbar__links a,
.liquid-navbar__cta {
  color: inherit;
  text-decoration: none;
}

.liquid-navbar__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-family: 'Avenir Next', 'Trebuchet MS', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
}

.liquid-navbar__brand-mark {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 48%),
    linear-gradient(135deg, rgba(255, 208, 168, 0.9), rgba(94, 212, 223, 0.95));
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.2),
    0 10px 18px rgba(67, 159, 177, 0.4);
}

.liquid-navbar__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.liquid-navbar__links a {
  padding: 0.65rem 0.95rem;
  border-radius: 999px;
  font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
  font-size: 0.94rem;
  letter-spacing: 0.02em;
  transition:
    background-color 0.16s ease,
    color 0.16s ease,
    transform 0.16s ease;
}

.liquid-navbar__links a:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.liquid-navbar__cta {
  border: 0;
  padding: 0.78rem 1.05rem;
  border-radius: 999px;
  background:
    linear-gradient(135deg, rgba(255, 231, 208, 0.95), rgba(255, 255, 255, 0.82));
  color: #112133;
  font: 700 0.9rem/1 'Trebuchet MS', sans-serif;
  letter-spacing: 0.04em;
  cursor: pointer;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 10px 18px rgba(0, 0, 0, 0.12);
}

.liquid-navbar__ring {
  padding: 1.5px;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  box-shadow:
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.55),
    inset 0 1px 3px rgba(255, 255, 255, 0.22),
    0 1px 6px rgba(0, 0, 0, 0.24);
}

.liquid-navbar__ring--screen {
  mix-blend-mode: screen;
  opacity: 0.22;
  background:
    linear-gradient(
      var(--glow-angle),
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, var(--glow-alpha-one)) var(--glow-stop-one),
      rgba(255, 255, 255, var(--glow-alpha-two)) var(--glow-stop-two),
      rgba(255, 255, 255, 0) 100%
    );
}

.liquid-navbar__ring--overlay {
  mix-blend-mode: overlay;
  background:
    linear-gradient(
      var(--glow-angle),
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, var(--overlay-alpha-one)) var(--glow-stop-one),
      rgba(255, 255, 255, var(--overlay-alpha-two)) var(--glow-stop-two),
      rgba(255, 255, 255, 0) 100%
    );
}

.liquid-navbar__highlight {
  transition: opacity 0.18s ease-out;
}

.liquid-navbar__highlight--hover {
  opacity: 0;
  background-image:
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.44) 0%, rgba(255, 255, 255, 0) 52%);
  mix-blend-mode: overlay;
}

.liquid-navbar__highlight--press {
  opacity: 0;
  background-image:
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0) 78%);
  mix-blend-mode: overlay;
}

.liquid-navbar__highlight--sheen {
  opacity: 0;
  background-image:
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0) 100%);
  mix-blend-mode: overlay;
}

.liquid-navbar.is-hovered .liquid-navbar__highlight--hover {
  opacity: 0.52;
}

.liquid-navbar.is-active {
  transition-duration: 0.12s;
}

.liquid-navbar.is-active .liquid-navbar__highlight--press {
  opacity: 0.44;
}

.liquid-navbar.is-hovered .liquid-navbar__highlight--sheen {
  opacity: 0.34;
}

.liquid-navbar.is-active .liquid-navbar__highlight--sheen {
  opacity: 0.72;
}

@media (max-width: 860px) {
  .liquid-navbar__shell {
    min-width: min(100%, calc(100vw - 2rem));
  }

  .liquid-navbar__content {
    gap: 0.7rem;
    padding: 0.9rem;
  }

  .liquid-navbar__links {
    display: none;
  }

  .liquid-navbar__cta {
    padding-inline: 0.9rem;
  }
}

@media (max-width: 560px) {
  .liquid-navbar__brand {
    font-size: 0.86rem;
    letter-spacing: 0.06em;
  }

  .liquid-navbar__cta {
    font-size: 0.82rem;
  }
}
</style>
