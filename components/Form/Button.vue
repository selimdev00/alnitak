<template>
  <button
    ref="button"
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control text-sm font-semibold transition-all duration-fast ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
    :class="classes[variant || 'primary']"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: string
}>()

const classes: Record<string, string> = {
  primary:
    'px-4 py-2.5 bg-accent text-accent-ink shadow-sm hover:bg-accent-press',
  danger: 'px-4 py-2.5 bg-danger text-accent-ink shadow-sm hover:bg-danger-press',
  secondary:
    'px-4 py-2.5 border border-line-strong bg-surface-1 text-content hover:border-accent hover:text-accent',
  ghost: 'px-4 py-2.5 text-content-muted hover:bg-surface-2 hover:text-content',
}

const button = ref<HTMLButtonElement | null>(null)
defineExpose({ button })
</script>
