<template>
  <!-- Orion's belt: three stars, Alnitak (the leftmost) lit in accent -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <line
      x1="4"
      y1="19"
      x2="20"
      y2="5"
      stroke="var(--border-strong)"
      stroke-width="1.4"
      stroke-linecap="round"
    />
    <circle cx="5.5" cy="17.5" r="2.6" fill="var(--accent)" />
    <circle cx="12" cy="12" r="2.1" fill="currentColor" />
    <circle cx="18.5" cy="6.5" r="2.1" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 22 })
</script>
