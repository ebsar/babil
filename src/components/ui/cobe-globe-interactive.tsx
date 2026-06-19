"use client"

import createGlobe from "cobe"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react"

interface InteractiveMarker {
  id: string
  location: [number, number]
  name: string
  detail: string
}

interface GlobeInteractiveProps {
  markers?: InteractiveMarker[]
  className?: string
  speed?: number
}

type AnchorStyle = CSSProperties & {
  positionAnchor?: string
}

const defaultMarkers: InteractiveMarker[] = [
  { id: "english", location: [51.51, -0.13], name: "English", detail: "Hello" },
  { id: "spanish", location: [40.42, -3.7], name: "Español", detail: "Hola" },
  { id: "bosnian", location: [43.86, 18.41], name: "Bosanski", detail: "Zdravo" },
]

export function GlobeInteractive({
  markers = defaultMarkers,
  className = "",
  speed = 0.0025,
}: GlobeInteractiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = { x: event.clientX, y: event.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }

    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!pointerInteracting.current) return

      dragOffset.current = {
        phi: (event.clientX - pointerInteracting.current.x) / 300,
        theta: (event.clientY - pointerInteracting.current.y) / 1000,
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    window.addEventListener("pointercancel", handlePointerUp, { passive: true })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("pointercancel", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId = 0
    let revealTimer = 0
    let resizeObserver: ResizeObserver | null = null
    let phi = 0

    const init = () => {
      const width = canvas.offsetWidth
      if (!width || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.18,
        dark: 0,
        diffuse: 1.4,
        mapSamples: 16000,
        mapBrightness: 5,
        mapBaseBrightness: 0.08,
        baseColor: [0.85, 0.83, 0.76],
        markerColor: [0.55, 0.45, 0.33],
        glowColor: [0.91, 0.89, 0.82],
        markerElevation: 0.015,
        markers: markers.map((marker) => ({
          location: marker.location,
          size: 0.04,
          id: marker.id,
        })),
        arcs: [],
        arcColor: [0.55, 0.45, 0.33],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.86,
      })

      const animate = () => {
        if (!isPausedRef.current) phi += speed
        globe?.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.18 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = window.requestAnimationFrame(animate)
      }

      animate()
      revealTimer = window.setTimeout(() => {
        canvas.style.opacity = "1"
      }, 0)
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if ((entries[0]?.contentRect.width ?? 0) <= 0) return
        resizeObserver?.disconnect()
        init()
      })
      resizeObserver.observe(canvas)
    }

    return () => {
      resizeObserver?.disconnect()
      window.clearTimeout(revealTimer)
      window.cancelAnimationFrame(animationId)
      globe?.destroy()
    }
  }, [markers, speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        aria-label="Interactive globe showing Babil Translation language locations"
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />

      {markers.map((marker) => {
        const isExpanded = expanded === marker.id
        const markerStyle: AnchorStyle = {
          position: "absolute",
          positionAnchor: `--cobe-${marker.id}`,
          bottom: "anchor(top)",
          left: "anchor(center)",
          translate: "-50% 0",
          marginBottom: 7,
          opacity: `var(--cobe-visible-${marker.id}, 0)`,
          filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`,
          transform: isExpanded ? "scale(1.04)" : "scale(1)",
        }

        return (
          <button
            key={marker.id}
            type="button"
            onClick={() => setExpanded(isExpanded ? null : marker.id)}
            onPointerEnter={() => {
              isPausedRef.current = true
            }}
            onPointerLeave={() => {
              isPausedRef.current = false
            }}
            onFocus={() => {
              isPausedRef.current = true
            }}
            onBlur={() => {
              isPausedRef.current = false
            }}
            aria-expanded={isExpanded}
            className="flex min-w-max flex-col items-center border border-[#8b7355]/45 bg-[#1a1814] px-3 py-2 text-[#e8e4d4] shadow-[0_8px_24px_rgba(26,24,20,0.18)] transition-[opacity,filter,transform,padding] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355]"
            style={markerStyle}
          >
            <span className="font-['Space_Mono'] text-[0.58rem] font-bold uppercase tracking-[0.16em]">
              {marker.name}
            </span>
            {isExpanded && (
              <span className="mt-1 font-['Cormorant_Garamond'] text-xs italic text-[#b8a07a]">
                {marker.detail}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
