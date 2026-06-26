<template>
  <div class="flex w-full flex-col gap-1.5">
    <label :for="id" class="text-sm font-medium text-content-muted">
      {{ label }}
    </label>

    <select
      :id="id"
      :name="id"
      :value="modelValue"
      class="w-full rounded-control border bg-bg px-3.5 py-2.5 text-content outline-none transition-colors duration-fast hover:border-accent focus:border-accent"
      :class="error ? 'border-danger' : 'border-line-strong'"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.key"
        :value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.key }}
      </option>
    </select>

    <span v-if="error" class="text-xs text-danger">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Option } from '~/types/FormSelect'

const props = defineProps<{
  id: string
  label: string
  modelValue: string | number
  placeholder?: string
  error?: string
  options: Option[]
}>()

const emit = defineEmits(['update:modelValue'])

const handleChange = (event: Event) => {
  const raw = (event.target as HTMLSelectElement).value
  // preserve numeric ids when the matched option carries a number value
  const matched = props.options.find((o) => String(o.value) === raw)
  emit('update:modelValue', matched ? matched.value : raw)
}
</script>
