<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
    <section class="max-w-2xl" v-reveal>
      <p class="t-eyebrow">Рабочее пространство</p>
      <h1
        class="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-content sm:text-5xl"
      >
        Доска задач и аналитика выручки в одном месте
      </h1>
      <p class="mt-5 text-lg leading-relaxed text-content-muted">
        Планируйте работу по этапам и сразу смотрите, как идут деньги. Всё
        живёт в браузере: ничего не нужно настраивать, чтобы начать.
      </p>
    </section>

    <div class="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
      <NuxtLink
        v-for="(link, i) in links"
        :key="link.to"
        v-reveal="{ delay: i * 90 }"
        :to="link.to"
        class="ledger-card group flex flex-col gap-6 p-6 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-pop sm:p-8"
      >
        <div class="flex items-start justify-between">
          <span
            class="flex h-12 w-12 items-center justify-center rounded-control bg-accent-weak text-accent"
            v-html="link.icon"
          />
          <span
            class="text-content-subtle transition-all duration-200 ease-out-expo group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden="true"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <div>
          <p class="t-eyebrow">{{ link.eyebrow }}</p>
          <h2
            class="mt-2 font-display text-2xl font-semibold tracking-tight text-content"
          >
            {{ link.title }}
          </h2>
          <p class="mt-2 leading-relaxed text-content-muted">
            {{ link.description }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Alnitak — доска задач и аналитика выручки',
})

const links = [
  {
    to: '/kanban',
    eyebrow: 'Доска',
    title: 'Этапы и задачи',
    description:
      'Колонки, карточки и перетаскивание. Всё сохраняется локально, без аккаунтов и серверов.',
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="5" height="16" rx="1.4" stroke="currentColor" stroke-width="1.7"/><rect x="10" y="4" width="5" height="10" rx="1.4" stroke="currentColor" stroke-width="1.7"/><rect x="17" y="4" width="4" height="13" rx="1.4" stroke="currentColor" stroke-width="1.7"/></svg>`,
  },
  {
    to: '/chart',
    eyebrow: 'Аналитика',
    title: 'Выручка и план/факт',
    description:
      'Общая выручка, прибыль по продуктам и сравнение плана с фактом по периодам.',
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><rect x="7.5" y="11" width="3" height="5" rx="0.8" fill="currentColor"/><rect x="12.5" y="8" width="3" height="8" rx="0.8" fill="currentColor"/><rect x="17.5" y="13" width="3" height="3" rx="0.8" fill="currentColor"/></svg>`,
  },
]
</script>
