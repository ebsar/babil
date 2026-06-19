<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { GlobeInteractive } from '@/components/ui/cobe-globe-interactive'

const host = ref<HTMLElement | null>(null)
let reactRoot: Root | null = null

onMounted(() => {
  if (!host.value) return

  reactRoot = createRoot(host.value)
  reactRoot.render(React.createElement(GlobeInteractive, { className: 'h-full w-full' }))
})

onBeforeUnmount(() => {
  reactRoot?.unmount()
  reactRoot = null
})
</script>

<template>
  <div ref="host" class="about-globe-island"></div>
</template>
