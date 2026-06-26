<template>
  <div class="flex h-full w-full flex-col gap-5 text-ink-text">
    <div>
      <p class="t-eyebrow !text-ink-subtle">Динамика по месяцам</p>
      <h2 class="mt-1 font-display text-xl font-semibold">Общая выручка</h2>
    </div>

    <div class="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
      <div class="flex flex-col gap-1">
        <span class="text-sm text-ink-muted">Всего оплачено</span>
        <span class="text-xl font-semibold tnum sm:text-2xl">{{
          formatRub(totalValue)
        }}</span>
      </div>

      <div
        v-for="item in sections"
        :key="item.name"
        class="flex flex-col gap-1"
      >
        <span class="flex items-center gap-2 text-sm text-ink-muted">
          <span
            v-if="item.color"
            class="block h-2 w-2 rounded-full"
            :style="{ backgroundColor: item.color }"
          />
          {{ item.name }}
        </span>
        <span class="text-xl font-semibold tnum">{{
          formatRub(returnDataTotalValue(item.data) * SCALE)
        }}</span>
      </div>
    </div>

    <div :id="id" class="h-[300px] w-full sm:h-[420px] lg:h-[500px]" />
  </div>
</template>

<script setup lang="ts">
import type { SeriesItem } from '~/types/Chart'
import type { EChartsOption } from 'echarts/types/dist/shared'

import generateMockDataForChart from '~/helpers/generateMockDataForChart'
import returnDataTotalValue from '~/helpers/returnDataTotalValue'
import { formatRub } from '~/helpers/formatRub'
import { cssVar } from '~/helpers/echartsTheme'

const SCALE = 10000

const props = defineProps<{ id: string }>()

const series: SeriesItem[] = [
  {
    name: 'Прочее',
    type: 'bar',
    data: generateMockDataForChart({ length: 12, range: 500 }),
    stack: 'x',
    color: cssVar('--series-1'),
  },
  {
    name: 'Зарплаты',
    type: 'bar',
    data: generateMockDataForChart({ length: 12, range: 500 }),
    stack: 'x',
    color: cssVar('--series-4'),
  },
  {
    name: 'Сырьё',
    type: 'bar',
    data: generateMockDataForChart({ length: 12, range: 500 }),
    stack: 'x',
    color: cssVar('--series-3'),
  },
  {
    data: generateMockDataForChart({ length: 12, range: 500 }),
    type: 'line',
    smooth: true,
    color: cssVar('--series-2'),
  },
]

const sections: SeriesItem[] = series.filter((e) => e.name)

const totalValue = computed<number>(() =>
  sections.reduce((a, b) => a + returnDataTotalValue(b.data), 0) * SCALE,
)

const { loadChart } = useChart(props.id, {
  xAxis: {
    data: [
      'Янв',
      'Фев',
      'Март',
      'Апр',
      'Май',
      'Июнь',
      'Июль',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
  },
  yAxis: {},
} as EChartsOption)

onMounted(() => {
  loadChart(series)
})
</script>
