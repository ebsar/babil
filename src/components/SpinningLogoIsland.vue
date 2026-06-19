<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import SpinningTextDemo from '@/components/ui/basic'

const host = ref<HTMLElement | null>(null)
let reactRoot: Root | null = null

onMounted(() => {
  if (!host.value) return

  reactRoot = createRoot(host.value)
  reactRoot.render(React.createElement(SpinningTextDemo))
})

onBeforeUnmount(() => {
  reactRoot?.unmount()
  reactRoot = null
})
</script>

<template>
  <div ref="host" class="spinning-logo-island"></div>
</template>
