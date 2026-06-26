<template>
  <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
    <div class="flex items-center gap-3" v-reveal>
      <AppBackLink to="/kanban" label="К доске" />
      <div>
        <p class="t-eyebrow">Задача</p>
        <h1
          class="font-display text-2xl font-semibold tracking-tight text-content sm:text-3xl"
        >
          {{ task.title }}
        </h1>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[2fr_3fr]">
      <section class="ledger-card p-5">
        <p class="t-eyebrow">Сведения</p>
        <dl class="mt-4 flex flex-col gap-3 text-sm">
          <div class="flex flex-col gap-0.5">
            <dt class="text-content-subtle">Название</dt>
            <dd class="font-medium text-content">{{ task.title }}</dd>
          </div>
          <div v-if="task.description" class="flex flex-col gap-0.5">
            <dt class="text-content-subtle">Описание</dt>
            <dd class="text-content">{{ task.description }}</dd>
          </div>
          <div v-if="stage" class="flex flex-col gap-0.5">
            <dt class="text-content-subtle">Этап</dt>
            <dd>
              <span
                class="inline-flex items-center rounded-pill bg-accent-weak px-2.5 py-0.5 font-medium text-accent"
              >
                {{ stage.title }}
              </span>
            </dd>
          </div>
          <div class="ledger-rule my-1" />
          <div class="flex justify-between gap-4">
            <dt class="text-content-subtle">Создана</dt>
            <dd class="text-content tnum">{{ formatDate(task.created_at) }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-content-subtle">Обновлена</dt>
            <dd class="text-content tnum">{{ formatDate(task.updated_at) }}</dd>
          </div>
        </dl>
      </section>

      <section class="ledger-card p-5">
        <p class="t-eyebrow">Редактирование</p>
        <form class="mt-4 flex flex-col gap-4" @submit.prevent="updateTask">
          <FormInput
            id="title"
            v-model="task.title"
            type="text"
            label="Название"
          />
          <FormInput
            id="description"
            v-model="task.description"
            type="textarea"
            label="Описание"
          />
          <FormSelect
            id="stage_id"
            v-model="task.stage_id"
            label="Этап"
            :options="stageOptions"
            placeholder="Выберите этап"
          />

          <div class="flex flex-wrap justify-end gap-3">
            <FormButton variant="danger" type="button" @click="removeTask">
              <IconTrash />
              Удалить
            </FormButton>
            <FormButton type="submit" variant="primary">
              Сохранить
            </FormButton>
          </div>
        </form>
      </section>
    </div>

    <teleport to="body">
      <ModalConfirm
        :is-revealed="isRevealed"
        title="Удалить задачу?"
        text="Это действие нельзя отменить."
        @confirm="confirm"
        @cancel="cancel"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { Option } from '~/types/FormSelect'
import type { Stage, UpdateTaskDTO } from '~/types/Canban'
import { useConfirmDialog } from '@vueuse/core'

const { isRevealed, reveal, confirm, cancel, onConfirm } = useConfirmDialog()

const canbanStore = useCanbanStore()
const route = useRoute()

const task = ref<UpdateTaskDTO>(
  Object.assign({}, canbanStore.findTask(route.params.id as string)),
)
if (!task.value.id) {
  throw createError({ statusCode: 404, statusMessage: 'Задача не найдена' })
}

const stage = computed<Stage | null>(() =>
  canbanStore.findStage(task.value.stage_id),
)

const formatDate = (iso: string) =>
  DateTime.fromISO(iso).setLocale('ru').toFormat('dd LLL yyyy')

const updateTask = () => {
  canbanStore.updateTask(task.value)
  return navigateTo('/kanban')
}

const handleGoBack = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    return navigateTo('/kanban')
  }
}

const stageOptions = computed<Option[]>(() =>
  canbanStore.stages.map((e: Stage) => ({ key: e.title, value: e.id })),
)

const removeTask = () => {
  reveal()
}

onConfirm(() => {
  canbanStore.removeTask(task.value.stage_id, task.value.id)
  return navigateTo('/kanban')
})

onMounted(() => {
  window.addEventListener('keydown', handleGoBack)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGoBack)
})

useHead({
  title: `${task.value.title} — Alnitak`,
})
</script>
