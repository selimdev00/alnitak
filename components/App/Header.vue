<template>
  <header
    class="sticky top-0 z-40 border-b bg-surface-1 transition-shadow duration-200 ease-out-expo"
    :class="scrolled ? 'border-line shadow-card' : 'border-transparent'"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
    >
      <NuxtLink
        to="/"
        class="group flex items-center gap-2.5 rounded-control text-content"
        aria-label="Alnitak, на главную"
      >
        <BrandMark
          :size="24"
          class="text-content transition-transform duration-fast ease-out-expo group-hover:-translate-y-0.5"
        />
        <span class="font-display text-xl font-semibold tracking-tight">
          Alnitak
        </span>
      </NuxtLink>

      <nav aria-label="Разделы">
        <ul
          class="flex items-center gap-1 rounded-pill border border-line bg-bg p-1 shadow-sm"
        >
          <li v-for="item in nav" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="block rounded-pill px-3 py-1.5 text-sm font-medium text-content-muted transition-colors duration-fast hover:text-content"
              active-class="!bg-accent !text-accent-ink shadow-sm"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const nav = [
  { to: '/kanban', label: 'Доска' },
  { to: '/chart', label: 'Аналитика' },
]

const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 6
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
