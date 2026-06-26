<template>
  <li
    class="flex w-[86vw] max-w-[340px] shrink-0 snap-start flex-col self-start rounded-card border transition-colors duration-200 sm:w-[340px]"
    :class="
      adding
        ? 'border-solid border-line bg-surface-1 shadow-card'
        : 'border-dashed border-line-strong bg-surface-1/50'
    "
  >
    <transition name="fade" mode="out-in">
      <form
        v-if="adding"
        class="flex flex-col gap-3 p-4"
        @submit.prevent="addStage"
      >
        <div class="flex items-center gap-2">
          <UiIconButton
            label="Отменить"
            class="!h-9 !w-9"
            @click="cancel"
          >
            <IconArrowBack />
          </UiIconButton>
          <h2 class="font-display text-lg font-semibold text-content">
            Новый этап
          </h2>
        </div>

        <FormInput
          id="stageName"
          ref="stageNameRef"
          v-model="payload.title"
          label="Название этапа"
          placeholder="Например, В работе"
          :error="errorMessage"
        />

        <FormButton type="submit" variant="primary" class="w-full">
          <IconPlusCircle />
          Добавить этап
        </FormButton>
      </form>

      <button
        v-else
        id="add-stage-button"
        type="button"
        class="flex items-center justify-center gap-2 px-4 py-5 font-semibold text-content-muted transition-colors duration-fast hover:text-accent"
        @click="turnAddingModeOn"
      >
        <IconPlusCircle />
        <span>Добавить этап</span>
      </button>
    </transition>
  </li>
</template>

<script setup lang="ts">
import type { CreateStageDTO } from '~/types/Canban'
import { FormInput } from '#components'

const canbanStore = useCanbanStore()

const adding = ref<boolean>(false)

const payload = ref<CreateStageDTO>({
  title: '',
})

const errorMessage = ref<string>('')

const stageNameRef = ref<typeof FormInput | null>(null)

const addStage = () => {
  errorMessage.value = ''

  if (!payload.value.title.trim()) {
    errorMessage.value = 'Введите название этапа'
    return
  }

  canbanStore.addStage(payload.value.title.trim())
  useNuxtApp().$toast.info('Этап добавлен')

  payload.value.title = ''
  adding.value = false
}

const cancel = () => {
  adding.value = false
  payload.value.title = ''
  errorMessage.value = ''
}

const turnAddingModeOn = () => {
  adding.value = true
}

watch(stageNameRef, () => {
  if (stageNameRef.value?.input) stageNameRef.value.input.focus()
})
</script>
