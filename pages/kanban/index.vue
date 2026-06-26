<template>
  <div class="flex flex-col">
    <div class="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
      <div class="flex flex-wrap items-end justify-between gap-4" v-reveal>
        <div>
          <p class="t-eyebrow">Доска</p>
          <h1
            class="mt-2 font-display text-3xl font-semibold tracking-tight text-content sm:text-4xl"
          >
            Доска задач
          </h1>
          <p class="mt-2 text-content-muted">
            {{ stageSummary }}
          </p>
        </div>

        <FormButton
          v-if="canbanStore.stages.length"
          variant="secondary"
          @click="reveal"
        >
          <IconTrash />
          Сбросить доску
        </FormButton>
      </div>
    </div>

    <!-- Onboarding / empty state -->
    <div
      v-if="canbanStore.stages.length === 0"
      class="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6"
    >
      <div
        class="ledger-card flex flex-col items-center gap-5 p-10 text-center"
        v-reveal
      >
        <BrandMark :size="40" class="text-content" />
        <div>
          <h2 class="font-display text-2xl font-semibold text-content">
            Доска пока пустая
          </h2>
          <p class="mx-auto mt-2 max-w-md text-content-muted">
            Начните с готового набора этапов или создайте свой первый этап
            вручную.
          </p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <FormButton variant="primary" @click="seedBoard">
            <IconPlusCircle />
            Создать пример доски
          </FormButton>
          <FormButton variant="secondary" @click="addEmptyStage">
            Пустой этап
          </FormButton>
        </div>
      </div>
    </div>

    <!-- Board -->
    <div v-else class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div class="snap-x overflow-x-auto pb-3" aria-label="Колонки этапов">
        <TransitionGroup name="rise" tag="ul" class="flex gap-4">
          <StageColumn
            v-for="stage in canbanStore.stages"
            :key="stage.id"
            :stage="stage"
          />
          <StageAdd key="add" />
        </TransitionGroup>
      </div>
    </div>

    <teleport to="body">
      <ModalConfirm
        :is-revealed="isRevealed"
        title="Сбросить доску?"
        text="Все этапы и задачи будут удалены без возможности восстановления."
        @confirm="confirm"
        @cancel="cancel"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { useConfirmDialog } from '@vueuse/core'

const canbanStore = useCanbanStore()

const { isRevealed, reveal, confirm, cancel, onConfirm } = useConfirmDialog()

onConfirm(() => {
  canbanStore.clearStages()
  useNuxtApp().$toast.info('Доска очищена')
})

useHead({
  title: 'Доска задач — Alnitak',
})

const stageSummary = computed(() => {
  const n = canbanStore.stages.length
  if (n === 0) return 'Создайте первый этап, чтобы начать планировать работу.'
  const total = canbanStore.tasks.length
  return `${n} ${plural(n, ['этап', 'этапа', 'этапов'])}, ${total} ${plural(
    total,
    ['задача', 'задачи', 'задач'],
  )}.`
})

function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}

const addEmptyStage = () => {
  canbanStore.addStage('Новый этап')
  useNuxtApp().$toast.info('Этап добавлен')
}

const seedBoard = () => {
  ;['Сделать', 'В работе', 'Готово'].forEach((title) =>
    canbanStore.addStage(title),
  )
  useNuxtApp().$toast.info('Доска создана')
}
</script>
