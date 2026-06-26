<template>
  <div
    class="flex min-h-screen items-center justify-center bg-bg px-4 py-16 text-content"
  >
    <div class="ledger-card flex max-w-md flex-col items-center gap-5 p-10 text-center">
      <BrandMark :size="40" class="text-content" />
      <p class="t-eyebrow">Ошибка {{ error?.statusCode || '' }}</p>
      <h1 class="font-display text-3xl font-semibold tracking-tight">
        {{ heading }}
      </h1>
      <p class="text-content-muted">{{ message }}</p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <FormButton variant="primary" @click="handleClear">
          На главную
        </FormButton>
        <FormButton variant="secondary" @click="navigateTo('/kanban')">
          К доске
        </FormButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const heading = computed(() =>
  props.error?.statusCode === 404 ? 'Страница не найдена' : 'Что-то пошло не так',
)

const message = computed(
  () =>
    props.error?.statusMessage ||
    'Похоже, такой страницы нет или она была удалена. Вернитесь на главную.',
)

const handleClear = () => clearError({ redirect: '/' })

useHead({
  title: 'Ошибка — Alnitak',
})
</script>
