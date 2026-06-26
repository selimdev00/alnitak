<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <UiIconButton label="Назад" class="!h-9 !w-9" @click="emit('close')">
        <IconArrowBack />
      </UiIconButton>
      <h3 class="font-display text-base font-semibold text-content">
        Новая задача
      </h3>
    </div>

    <form class="flex flex-col gap-3" @submit.prevent="addTask">
      <FormInput
        id="title"
        ref="titleRef"
        v-model="payload.title"
        label="Название"
        placeholder="Что нужно сделать"
        type="text"
        :error="errors.title"
      />

      <FormInput
        id="description"
        v-model="payload.description"
        label="Описание"
        placeholder="Детали задачи"
        type="textarea"
        :error="errors.description"
      />

      <FormButton type="submit" variant="primary" class="w-full">
        <IconPlusCircle />
        Добавить задачу
      </FormButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { StageId, CreateTaskDTO } from '~/types/Canban'
import { FormInput } from '#components'

const props = defineProps<{
  stageId: StageId
}>()

const canbanStore = useCanbanStore()

const emit = defineEmits(['close'])

const payload = ref<CreateTaskDTO>({
  title: '',
  description: '',
})

const errors = ref({
  title: '',
  description: '',
})

const addTask = () => {
  errors.value.title = ''
  errors.value.description = ''

  if (!payload.value.title.trim()) {
    errors.value.title = 'Введите название'
  }
  if (!payload.value.description.trim()) {
    errors.value.description = 'Добавьте описание'
  }

  if (!payload.value.title.trim() || !payload.value.description.trim()) {
    return
  }

  canbanStore.addTask(props.stageId, payload.value)

  payload.value = {
    title: '',
    description: '',
  }

  emit('close')
}

const titleRef = ref<typeof FormInput | null>(null)

watch(titleRef, () => {
  if (titleRef.value?.input) titleRef.value.input.focus()
})
</script>
