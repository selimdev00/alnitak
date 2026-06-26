<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
    <header class="mb-8 max-w-2xl" v-reveal>
      <p class="t-eyebrow">Аналитика</p>
      <h1
        class="mt-2 font-display text-3xl font-semibold tracking-tight text-content sm:text-4xl"
      >
        Финансовая аналитика
      </h1>
      <p class="mt-3 leading-relaxed text-content-muted">
        Выручка, прибыль по продуктам и сравнение плана с фактом.
        <span class="text-content-subtle">Показаны демо-данные.</span>
      </p>
    </header>

    <Transition name="fade" mode="out-in">
      <div v-if="!isReady" key="skeleton" class="flex flex-col gap-6">
        <div class="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div class="ledger-card ledger-card--ink h-[560px] animate-pulse" />
          <div class="ledger-card ledger-card--ink h-[560px] animate-pulse" />
        </div>
        <div class="ledger-card ledger-card--ink h-[480px] animate-pulse" />
      </div>

      <div v-else key="charts" class="flex flex-col gap-6">
        <div class="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <section class="ledger-card ledger-card--ink p-5 sm:p-7">
            <ChartsTotalIncome id="chart-1" />
          </section>

          <section class="ledger-card ledger-card--ink p-5 sm:p-7">
            <ChartsIncome id="chart-2" />
          </section>
        </div>

        <section class="ledger-card ledger-card--ink p-5 sm:p-7">
          <ChartsPlanFact id="chart-3" />
        </section>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isReady = ref<boolean>(false)

useHead({
  title: 'Финансовая аналитика — Alnitak',
})

onMounted(() => {
  // let the layout paint, then mount the charts so the skeleton reads
  requestAnimationFrame(() => {
    isReady.value = true
  })
})
</script>
