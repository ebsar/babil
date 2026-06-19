<script setup lang="ts">
import { createElement } from "react"
import { createRoot, type Root } from "react-dom/client"
import { onBeforeUnmount, onMounted, ref } from "vue"
import { AnimatedBlobs } from "@/components/ui/blobs"

const host = ref<HTMLElement | null>(null)
let reactRoot: Root | undefined

onMounted(() => {
  if (!host.value) return

  reactRoot = createRoot(host.value)
  reactRoot.render(createElement(AnimatedBlobs, { label: "" }))
})

onBeforeUnmount(() => {
  reactRoot?.unmount()
})
</script>

<template>
  <div ref="host" class="hero-blobs-host" aria-hidden="true"></div>
</template>
