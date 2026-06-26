<template>
  <div class="flex w-full flex-col gap-1.5">
    <label :for="id" class="text-sm font-medium text-content-muted">
      {{ label }}
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :name="id"
      :value="modelValue"
      rows="3"
      :class="[inputClasses, error ? 'border-danger' : 'border-line-strong']"
      :placeholder="placeholder"
      @input="handleInput"
    />

    <input
      v-else
      :id="id"
      ref="input"
      :value="modelValue"
      :type="type"
      :class="[inputClasses, error ? 'border-danger' : 'border-line-strong']"
      :placeholder="placeholder"
      :name="id"
      @input="handleInput"
    />

    <span v-if="error" class="text-xs text-danger">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    label: string
    modelValue: string
    placeholder?: string
    type?: 'text' | 'textarea'
    error?: string
  }>(),
  {
    type: 'text',
    placeholder: '',
    error: '',
  },
)

const input = ref<HTMLInputElement | null>(null)

defineExpose({ input })

const emit = defineEmits(['update:modelValue'])

const inputClasses =
  'w-full rounded-control border bg-bg px-3.5 py-2.5 text-content outline-none transition-colors duration-fast placeholder:text-content-subtle hover:border-accent focus:border-accent'

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
