<template>
  <li>
    <article
      class="group relative flex flex-col gap-1 rounded-control border border-line bg-surface-1 p-3.5 pr-12 shadow-sm transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card"
    >
      <h3 class="font-semibold leading-snug text-content">
        <NuxtLink
          :to="`/kanban/tasks/${task.id}`"
          class="rounded-control outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
        >
          {{ task.title }}
        </NuxtLink>
      </h3>

      <p
        v-if="task.description"
        class="line-clamp-2 text-sm text-content-muted"
      >
        {{ task.description }}
      </p>

      <UiIconButton
        label="Удалить задачу"
        variant="danger"
        class="absolute right-1.5 top-1.5 z-10 !h-10 !w-10"
        @click="reveal"
      >
        <IconTrash />
      </UiIconButton>
    </article>

    <teleport to="body">
      <ModalConfirm
        :is-revealed="isRevealed"
        title="Удалить задачу?"
        text="Это действие нельзя отменить."
        @confirm="confirm"
        @cancel="cancel"
      />
    </teleport>
  </li>
</template>

<script setup lang="ts">
import type { Task, StageId } from '~/types/Canban'
import { useConfirmDialog } from '@vueuse/core'

const { isRevealed, reveal, confirm, cancel, onConfirm } = useConfirmDialog()

const canbanStore = useCanbanStore()

const props = defineProps<{
  task: Task
  stageId: StageId
}>()

onConfirm(() => {
  canbanStore.removeTask(props.stageId, props.task.id)
})
</script>
