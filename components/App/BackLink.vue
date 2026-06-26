<template>
  <NuxtLink
    :to="to"
    :aria-label="label"
    class="group inline-flex h-11 w-11 items-center justify-center rounded-control border border-line bg-surface-1 text-content-muted shadow-sm transition-all duration-fast ease-out-expo hover:-translate-x-0.5 hover:border-line-strong hover:text-content"
  >
    <IconArrowBack aria-hidden="true" />
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    label?: string
  }>(),
  {
    to: '/',
    label: 'Назад',
  },
)
</script>
