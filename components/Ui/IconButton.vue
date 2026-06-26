<template>
  <button
    :type="type"
    :aria-label="label"
    class="inline-flex h-11 w-11 items-center justify-center rounded-control text-content-muted transition-colors duration-fast ease-out-expo"
    :class="variants[variant]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    variant?: 'ghost' | 'danger'
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'ghost',
    type: 'button',
  },
)

const variants: Record<string, string> = {
  ghost: 'hover:bg-surface-2 hover:text-content',
  danger: 'hover:bg-danger-weak hover:text-danger',
}
</script>
