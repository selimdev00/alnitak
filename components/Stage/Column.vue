<template>
  <li
    :data-kanban-stage="stage.id"
    class="ledger-card flex w-[86vw] max-w-[340px] shrink-0 snap-start flex-col self-start sm:w-[340px]"
  >
    <div class="flex items-start justify-between gap-3 p-4">
      <div class="flex min-w-0 flex-col gap-1.5">
        <span
          class="inline-flex w-fit items-center rounded-pill bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-content-muted tnum"
        >
          {{ taskCountLabel }}
        </span>

        <form v-if="editing" @submit.prevent="saveStage">
          <input
            ref="stageTitleRef"
            v-model="stageTitle"
            name="stageTitle"
            type="text"
            aria-label="Название этапа"
            class="w-full rounded-control border border-line-strong bg-bg px-2 py-1 font-display text-lg font-semibold text-content outline-none focus:border-accent"
            @blur="saveStage"
            @keydown.esc="cancelEdit"
          />
        </form>
        <h2
          v-else
          class="truncate font-display text-lg font-semibold text-content"
          :title="stage.title"
        >
          {{ stage.title }}
        </h2>
      </div>

      <div class="flex shrink-0 items-center">
        <UiIconButton
          label="Переименовать этап"
          class="!h-9 !w-9"
          @click="startEdit"
        >
          <IconPencilOutline />
        </UiIconButton>
        <UiIconButton
          label="Удалить этап"
          variant="danger"
          class="!h-9 !w-9"
          @click="removeStage"
        >
          <IconTrash />
        </UiIconButton>
      </div>
    </div>

    <div class="ledger-rule mx-4" />

    <div class="flex flex-1 flex-col gap-4 p-4">
      <transition name="fade" mode="out-in">
        <div v-if="!addingTask" class="flex flex-col gap-3">
          <div class="relative min-h-[88px]">
            <draggable
              v-model="stageTasks"
              tag="ul"
              item-key="id"
              group="tasks"
              ghost-class="opacity-50"
              class="flex min-h-[88px] flex-col gap-2.5"
              @change="onTaskMove"
            >
              <template #item="{ element }">
                <TaskItem
                  :data-task-stage="props.stage.id"
                  :data-task="element.id"
                  :task="element"
                  :stage-id="props.stage.id"
                />
              </template>
            </draggable>

            <div
              v-if="stageTasks.length === 0"
              class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-control border border-dashed border-line-strong px-4 text-center text-sm text-content-subtle"
            >
              Перетащите задачу сюда или добавьте новую
            </div>
          </div>

          <FormButton variant="secondary" @click="turnAddingTaskOn">
            <IconPlusCircle />
            <span>Добавить задачу</span>
          </FormButton>
        </div>

        <TaskAdd
          v-else
          :stage-id="stage.id"
          @close="turnAddingTaskOff"
        />
      </transition>
    </div>

    <teleport to="body">
      <ModalConfirm
        :is-revealed="isRevealed"
        title="Удалить этап?"
        text="Вместе с этапом удалятся все его задачи."
        @confirm="confirm"
        @cancel="cancel"
      />
    </teleport>
  </li>
</template>

<script setup lang="ts">
import type { Stage, Task } from '~/types/Canban'
import { useConfirmDialog } from '@vueuse/core'

import draggable from 'vuedraggable'

const { isRevealed, reveal, confirm, cancel, onConfirm } = useConfirmDialog()

const canbanStore = useCanbanStore()

const props = defineProps<{ stage: Stage }>()

const removeStage = () => reveal()

onConfirm(() => {
  canbanStore.removeStage(props.stage.id)
})

const stageTitle = ref<string>(props.stage.title)
const stageTitleRef = ref<HTMLInputElement | null>(null)
const editing = ref<boolean>(false)

const startEdit = async () => {
  stageTitle.value = props.stage.title
  editing.value = true
  await nextTick()
  stageTitleRef.value?.focus()
  stageTitleRef.value?.select()
}

const saveStage = () => {
  if (!editing.value) return
  const next = stageTitle.value.trim()
  if (next) canbanStore.updateStageTitle(props.stage.id, next)
  else stageTitle.value = props.stage.title
  editing.value = false
}

const cancelEdit = () => {
  stageTitle.value = props.stage.title
  editing.value = false
}

const taskCountLabel = computed(() => {
  const n = props.stage.tasks.length
  const mod10 = n % 10
  const mod100 = n % 100
  let word = 'задач'
  if (mod10 === 1 && mod100 !== 11) word = 'задача'
  else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    word = 'задачи'
  return `${n} ${word}`
})

const addingTask = ref<boolean>(false)
const turnAddingTaskOn = () => {
  addingTask.value = true
}
const turnAddingTaskOff = () => {
  addingTask.value = false
}

const stageTasks = computed({
  get: () => props.stage.tasks,
  set: (value) => {
    canbanStore.updateStageTasks(props.stage.id, value)
  },
})

const onTaskMove = (e: { added?: { element: Task } }) => {
  const added = e.added
  if (!added) return
  canbanStore.updateTaskOnMove({ ...added.element, stage_id: props.stage.id })
}
</script>
