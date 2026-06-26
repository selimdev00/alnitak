<template>
  <transition name="fade">
    <div
      v-if="isRevealed"
      class="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4"
      @click="cancel"
    >
      <div
        ref="panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="textId"
        class="ledger-card w-full max-w-[420px] p-6"
        @click.stop
        @keydown="onKeydown"
      >
        <h2 :id="titleId" class="font-display text-xl font-semibold text-content">
          {{ title }}
        </h2>
        <p :id="textId" class="mt-2 text-content-muted">{{ text }}</p>

        <div class="mt-6 flex justify-end gap-3">
          <FormButton
            ref="cancelButtonRef"
            variant="secondary"
            @click="cancel"
          >
            {{ no }}
          </FormButton>
          <FormButton variant="danger" @click="confirm">
            {{ yes }}
          </FormButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { FormButton } from '#components'

const props = withDefaults(
  defineProps<{
    isRevealed: boolean
    title: string
    text: string
    yes?: string
    no?: string
  }>(),
  {
    yes: 'Удалить',
    no: 'Отмена',
  },
)

const emit = defineEmits(['confirm', 'cancel'])

const uid = Math.random().toString(36).slice(2, 8)
const titleId = `dlg-title-${uid}`
const textId = `dlg-text-${uid}`

const panel = ref<HTMLElement | null>(null)
const cancelButtonRef = ref<InstanceType<typeof FormButton> | null>(null)
let lastFocused: HTMLElement | null = null

const cancel = () => emit('cancel')
const confirm = () => emit('confirm')

const focusable = (): HTMLElement[] => {
  if (!panel.value) return []
  return Array.from(
    panel.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  )
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    cancel()
    return
  }
  if (e.key !== 'Tab') return

  const items = focusable()
  if (items.length === 0) return
  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement

  if (e.shiftKey && active === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(
  () => props.isRevealed,
  async (open) => {
    if (open) {
      lastFocused = document.activeElement as HTMLElement
      await nextTick()
      // default focus on the safe action
      cancelButtonRef.value?.button?.focus()
    } else if (lastFocused) {
      lastFocused.focus()
      lastFocused = null
    }
  },
)
</script>
