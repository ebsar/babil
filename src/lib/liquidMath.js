export const GLASS_MODES = ['standard', 'polar', 'prominent', 'shader']

export const SHADER_EFFECTS = [
  'liquidGlass',
  'flowingLiquid',
  'transparentIce',
  'unevenGlass',
  'mosaicGlass',
]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const mix = (from, to, amount) => from * (1 - amount) + to * amount

const smoothStep = (edge0, edge1, value) => {
  if (edge0 === edge1) {
    return value < edge0 ? 0 : 1
  }

  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

const length2 = (x, y) => Math.sqrt(x * x + y * y)

const roundedRectSDF = (x, y, halfWidth, halfHeight, radius) => {
  const qx = Math.abs(x) - halfWidth + radius
  const qy = Math.abs(y) - halfHeight + radius
  return Math.min(Math.max(qx, qy), 0) + length2(Math.max(qx, 0), Math.max(qy, 0)) - radius
}

const noise = (x, y) => {
  const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (seed - Math.floor(seed)) * 2 - 1
}

const fbm = (x, y, octaves = 4) => {
  let value = 0
  let amplitude = 0.5
  let frequency = 1

  for (let index = 0; index < octaves; index += 1) {
    value += amplitude * noise(x * frequency, y * frequency)
    amplitude *= 0.5
    frequency *= 2
  }

  return value
}

const toCentered = (uv) => ({
  ix: uv.x - 0.5,
  iy: uv.y - 0.5,
})

const clampUv = (point) => ({
  x: clamp(point.x, 0, 1),
  y: clamp(point.y, 0, 1),
})

const resolveShape = ({ cornerRadius = 999, width, height }) => {
  const aspect = width / Math.max(height, 1)
  const halfWidth = clamp(0.28 + Math.min(aspect, 8) * 0.022, 0.3, 0.42)
  const halfHeight = 0.165
  const pillRadius = Math.min(halfWidth, halfHeight)
  const squareRadius = pillRadius * 0.18

  const normalizedCorner =
    cornerRadius >= 999
      ? 1
      : clamp(cornerRadius / Math.max(Math.min(width, height) * 0.5, 1), 0.05, 1)

  return {
    halfWidth,
    halfHeight,
    radius: mix(squareRadius, pillRadius, normalizedCorner),
  }
}

const buildStandardGenerator = (shape) => (uv) => {
  const { ix, iy } = toCentered(uv)
  const distance = roundedRectSDF(ix, iy, shape.halfWidth, shape.halfHeight, shape.radius)
  const mask = smoothStep(0.46, -0.18, distance)
  const edgeBoost = smoothStep(-0.02, 0.16, distance)
  const bend = 1 - mask * 0.12 + edgeBoost * 0.22

  return clampUv({
    x: ix * bend + 0.5,
    y: iy * (bend * 0.94) + 0.5,
  })
}

const buildPolarGenerator = (shape) => (uv) => {
  const { ix, iy } = toCentered(uv)
  const distance = roundedRectSDF(ix, iy, shape.halfWidth, shape.halfHeight, shape.radius)
  const mask = smoothStep(0.55, -0.14, distance)
  const radius = Math.max(length2(ix, iy), 0.0001)
  const tangentX = -iy / radius
  const tangentY = ix / radius
  const swirl = mask * (0.028 + radius * 0.08)
  const pull = mask * 0.05

  return clampUv({
    x: ix + tangentX * swirl - ix * pull + 0.5,
    y: iy + tangentY * swirl - iy * pull + 0.5,
  })
}

const buildProminentGenerator = (shape) => (uv) => {
  const { ix, iy } = toCentered(uv)
  const distance = roundedRectSDF(ix, iy, shape.halfWidth, shape.halfHeight, shape.radius)
  const mask = smoothStep(0.5, -0.2, distance)
  const edgeGlow = smoothStep(-0.03, 0.2, distance)
  const bendX = ix * (1.05 + edgeGlow * 0.34)
  const bendY = iy * (0.98 + edgeGlow * 0.26)

  return clampUv({
    x: bendX - ix * mask * 0.16 + 0.5,
    y: bendY - iy * mask * 0.1 + 0.5,
  })
}

const buildShaderGenerator = ({ effect, shape }) => {
  const glassMask = (x, y, feather = 0.15) => {
    const distance = roundedRectSDF(x, y, shape.halfWidth, shape.halfHeight, shape.radius)
    return {
      distance,
      mask: smoothStep(0.48, -feather, distance),
    }
  }

  const generators = {
    liquidGlass: (uv) => {
      const { ix, iy } = toCentered(uv)
      const { distance } = glassMask(ix, iy)
      const displacement = smoothStep(0.75, 0, distance - 0.08)
      const scaled = smoothStep(0, 1, displacement)

      return clampUv({
        x: ix * scaled + 0.5,
        y: iy * scaled + 0.5,
      })
    },
    flowingLiquid: (uv) => {
      const { ix, iy } = toCentered(uv)
      const { mask, distance } = glassMask(ix, iy, 0.2)
      const wave = Math.sin(uv.x * 7 + uv.y * 4) * Math.cos(uv.y * 9) * 0.018
      const lift = smoothStep(0.76, 0, distance - 0.06)
      const scaled = smoothStep(0, 1, lift)

      return clampUv({
        x: ix * scaled + wave * mask + 0.5,
        y: iy * scaled + wave * 0.6 * mask + 0.5,
      })
    },
    transparentIce: (uv) => {
      const { ix, iy } = toCentered(uv)
      const { distance, mask } = glassMask(ix, iy, 0.22)
      const crystalNoise = fbm(uv.x * 8, uv.y * 8, 3) * 0.05
      const fineDetail = noise(uv.x * 20, uv.y * 20) * 0.02
      const crackPattern = Math.sin(uv.x * 15 + crystalNoise * 10) * Math.cos(uv.y * 12) * 0.03
      const distortionX = ix + (crystalNoise + fineDetail + crackPattern) * mask
      const distortionY = iy + (crystalNoise * 0.8 + fineDetail) * mask
      const edgeEffect = smoothStep(0, 0.1, distance) * 0.1

      return clampUv({
        x: distortionX * (1 - edgeEffect) + 0.5,
        y: distortionY * (1 - edgeEffect) + 0.5,
      })
    },
    unevenGlass: (uv) => {
      const { ix, iy } = toCentered(uv)
      const surfaceWarp = fbm(uv.x * 3, uv.y * 3, 2) * 0.08
      const surfaceDetail = noise(uv.x * 6 + surfaceWarp, uv.y * 6) * 0.04
      const warpedX = ix + surfaceWarp * 0.3
      const warpedY = iy + surfaceWarp * 0.3
      const { mask } = glassMask(warpedX, warpedY, 0.16)
      const ripples = Math.sin(uv.x * 8 + surfaceWarp * 5) * Math.sin(uv.y * 8) * 0.02
      const strength = mask * (1 + surfaceDetail * 0.5)

      return clampUv({
        x: ix + (surfaceWarp + ripples) * strength + 0.5,
        y: iy + (surfaceWarp * 0.9 + surfaceDetail + ripples * 0.7) * strength + 0.5,
      })
    },
    mosaicGlass: (uv) => {
      const { ix, iy } = toCentered(uv)
      const tileSize = 0.05
      const tileX = Math.floor(uv.x / tileSize)
      const tileY = Math.floor(uv.y / tileSize)
      const tileSeed = Math.sin(tileX * 12.9898 + tileY * 78.233) * 43758.5453
      const tileRandom = tileSeed - Math.floor(tileSeed)
      const tileAngle = tileRandom * Math.PI * 2
      const refractionX = Math.cos(tileAngle) * 0.03
      const refractionY = Math.sin(tileAngle) * 0.03
      const { mask } = glassMask(ix, iy, 0.12)
      const localX = (uv.x % tileSize) / tileSize
      const localY = (uv.y % tileSize) / tileSize
      const groutThickness = 0.12
      const isGroutLine =
        localX < groutThickness ||
        localX > 1 - groutThickness ||
        localY < groutThickness ||
        localY > 1 - groutThickness
      const surfaceNoise = noise(tileX * 3.7, tileY * 3.7) * 0.02
      const tileVariation = (tileRandom - 0.5) * 0.04
      let finalDistortionX
      let finalDistortionY

      if (isGroutLine) {
        finalDistortionX = surfaceNoise * 0.16
        finalDistortionY = surfaceNoise * 0.16
      } else {
        const tileDistortion = 1 + tileVariation
        finalDistortionX = (refractionX + surfaceNoise) * tileDistortion
        finalDistortionY = (refractionY + surfaceNoise) * tileDistortion
      }

      return clampUv({
        x: ix + finalDistortionX * mask + 0.5,
        y: iy + finalDistortionY * mask + 0.5,
      })
    },
  }

  return generators[effect] || generators.liquidGlass
}

const pickGenerator = (options) => {
  const shape = resolveShape(options)

  switch (options.mode) {
    case 'standard':
      return buildStandardGenerator(shape)
    case 'polar':
      return buildPolarGenerator(shape)
    case 'prominent':
      return buildProminentGenerator(shape)
    case 'shader':
    default:
      return buildShaderGenerator({
        effect: options.effect,
        shape,
      })
  }
}

export function generateDisplacementMapDataUrl({
  mode,
  effect,
  width,
  height,
  cornerRadius = 999,
}) {
  if (typeof document === 'undefined' || width <= 0 || height <= 0) {
    return ''
  }

  const longestSide = Math.max(width, height)
  const resolutionScale = longestSide > 720 ? 720 / longestSide : 1
  const w = Math.max(96, Math.round(width * resolutionScale))
  const h = Math.max(42, Math.round(height * resolutionScale))
  const generator = pickGenerator({
    mode,
    effect,
    width,
    height,
    cornerRadius,
  })

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h

  const context = canvas.getContext('2d')
  if (!context) {
    return ''
  }

  let maxScale = 0
  const rawValues = new Float32Array(w * h * 2)
  let rawIndex = 0

  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const uv = {
        x: (x + 0.5) / w,
        y: (y + 0.5) / h,
      }
      const mapped = generator(uv)
      const dx = mapped.x * w - x
      const dy = mapped.y * h - y

      rawValues[rawIndex++] = dx
      rawValues[rawIndex++] = dy
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
    }
  }

  const imageData = context.createImageData(w, h)
  const data = imageData.data
  const scale = maxScale > 0 ? Math.max(maxScale, 1) : 1

  rawIndex = 0
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const dx = rawValues[rawIndex++]
      const dy = rawValues[rawIndex++]
      const edgeDistance = Math.min(x, y, w - x - 1, h - y - 1)
      const edgeFactor = clamp(edgeDistance / 2.75, 0, 1)

      const encodedX = dx * edgeFactor
      const encodedY = dy * edgeFactor
      const red = encodedX / scale + 0.5
      const green = encodedY / scale + 0.5
      const blue = green
      const pixelIndex = (y * w + x) * 4

      data[pixelIndex] = clamp(Math.round(red * 255), 0, 255)
      data[pixelIndex + 1] = clamp(Math.round(green * 255), 0, 255)
      data[pixelIndex + 2] = clamp(Math.round(blue * 255), 0, 255)
      data[pixelIndex + 3] = 255
    }
  }

  context.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}
