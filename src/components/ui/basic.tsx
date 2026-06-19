"use client"

import { cn } from "@/lib/utils"
import React, { useId } from "react"

export type SpinningTextProps = {
  text: string
  radius?: number
  textClassName?: string
  speed?: number
  direction?: "normal" | "reverse"
  className?: string
}

export const SpinningText: React.FC<SpinningTextProps> = ({
  text,
  radius = 37,
  textClassName = "text-[8px]",
  speed = 10,
  direction = "normal",
  className,
}) => {
  const pathId = `circlePath-${useId().replace(/:/g, "")}`
  const pathLength = 2 * Math.PI * radius

  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <g
          className="spinning-text__ring origin-center animate-spin"
          style={{
            animationDuration: `${speed}s`,
            animationDirection: direction,
          }}
        >
          <path
            id={pathId}
            d={`
              M 50,50
              m -${radius},0
              a ${radius},${radius} 0 1,1 ${radius * 2},0
              a ${radius},${radius} 0 1,1 -${radius * 2},0
            `}
            fill="none"
          />
          <text
            className={cn(
              "fill-current font-normal uppercase tracking-widest",
              textClassName,
            )}
          >
            <textPath
              href={`#${pathId}`}
              startOffset="0%"
              textLength={pathLength}
              lengthAdjust="spacing"
            >
              {text}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  )
}

const SpinningTextDemo = () => {
  return (
    <div
      className="relative h-full w-full text-[#8b7355]"
      role="img"
      aria-label="Babil Translation loading indicator"
    >
      <SpinningText
        text="BABIL TRANSLATION • LOADING •"
        radius={43}
        textClassName="text-[10px] font-bold tracking-[0.08em]"
        speed={12}
        direction="normal"
        className="absolute inset-0 h-full w-full"
      />
      <span className="sr-only">Loading</span>
    </div>
  )
}

export default SpinningTextDemo
