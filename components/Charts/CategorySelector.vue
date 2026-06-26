<template>
  <div class="flex flex-wrap gap-2" role="group" aria-label="Фильтр по сериям">
    <button
      type="button"
      class="rounded-pill border px-3.5 py-1.5 text-sm font-medium transition-colors duration-fast ease-out-expo"
      :class="chipClass(modelValue === 'all')"
      :aria-pressed="modelValue === 'all'"
      @click="emit('update:modelValue', 'all')"
    >
      Все
    </button>

    <button
      v-for="item in options"
      :key="item.name"
      type="button"
      class="flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-sm font-medium transition-colors duration-fast ease-out-expo"
      :class="chipClass(modelValue === item.name)"
      :aria-pressed="modelValue === item.name"
      @click="emit('update:modelValue', item.name as string)"
    >
      <span
        class="block h-2 w-2 rounded-full"
        :style="{ backgroundColor: item.color }"
      />
      {{ item.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SeriesItem } from '~/types/Chart'

defineProps<{
  modelValue: string
  options: SeriesItem[]
}>()

const emit = defineEmits(['update:modelValue'])

const chipClass = (active: boolean) =>
  active
    ? 'border-transparent bg-accent text-accent-ink'
    : 'border-ink-border bg-ink-2 text-ink-muted hover:text-ink-text hover:border-ink-muted'
</script>
