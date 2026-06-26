<template>
  <footer class="mt-4 border-t border-line bg-surface-1">
    <div
      class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div class="flex items-center gap-2.5">
        <BrandMark :size="20" class="text-content" />
        <span class="font-display text-base font-semibold">Alnitak</span>
        <span class="text-sm text-content-subtle">
          доска задач и аналитика выручки
        </span>
      </div>

      <div class="ledger-rule sm:hidden" />

      <p class="text-sm text-content-subtle tnum">
        Демо-проект, {{ year }}. Данные сгенерированы для витрины.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
