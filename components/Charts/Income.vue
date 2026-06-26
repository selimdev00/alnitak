<template>
  <div class="flex flex-1 flex-col gap-5 text-ink-text">
    <div>
      <p class="t-eyebrow !text-ink-subtle">Цель {{ formatNumber(TARGET) }}</p>
      <h2 class="mt-1 font-display text-xl font-semibold">Прибыль по продуктам</h2>
    </div>

    <ChartsCategorySelector v-model="filter" :options="series" />

    <transition-group
      tag="div"
      name="rise"
      class="grid gap-x-6 gap-y-4 sm:grid-cols-2"
    >
      <div
        v-for="item in filteredSeries"
        :key="item.name"
        class="flex flex-col gap-2"
      >
        <span class="flex items-center gap-2 text-sm text-ink-muted">
          <span
            class="block h-2 w-2 rounded-full"
            :style="{ backgroundColor: item.color }"
          />
          {{ item.name }}
        </span>

        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-semibold tnum">{{
            formatNumber(item.totalDataValue || 0)
          }}</span>
          <span class="text-sm text-ink-subtle tnum"
            >из {{ formatNumber(TARGET) }}</span
          >
        </div>

        <div class="flex items-center gap-3">
          <div class="h-1.5 flex-1 overflow-hidden rounded-pill bg-ink-2">
            <div
              class="h-full rounded-pill"
              :style="{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }"
            />
          </div>
          <span class="w-10 text-right text-sm font-medium tnum"
            >{{ item.percentage }}%</span
          >
        </div>
      </div>
    </transition-group>

    <div :id="id" class="h-[260px] w-full sm:h-[340px] lg:h-[380px]" />
  </div>
</template>

<script setup lang="ts">
import type { SeriesItem } from '~/types/Chart'
import { useChart } from '~/composables/useChart'

import generateMockDataForChart from '~/helpers/generateMockDataForChart'
import returnDataTotalValue from '~/helpers/returnDataTotalValue'
import { formatNumber } from '~/helpers/formatRub'
import { cssVar } from '~/helpers/echartsTheme'
import type { EChartsOption } from 'echarts/types/dist/shared'

const TARGET = 2000

const props = defineProps<{ id: string }>()

const series: SeriesItem[] = [
  {
    data: generateMockDataForChart({ length: 2, range: 2000 }),
    name: 'Продукт 1',
    type: 'bar',
    stack: 'x',
    color: cssVar('--series-1'),
  },
  {
    data: generateMockDataForChart({ length: 2, range: 2000 }),
    name: 'Продукт 2',
    type: 'bar',
    stack: 'x',
    color: cssVar('--series-4'),
  },
]

for (const item of series) {
  item.totalDataValue = returnDataTotalValue(item.data)
  item.percentage = ((item.totalDataValue / TARGET) * 100).toFixed(0)
}

const filter = ref<string>('all')
const filteredSeries = computed<SeriesItem[]>(() => {
  if (filter.value === 'all') {
    return series
  }
  return series.filter((e) => e.name === filter.value)
})

const { loadChart, reloadChart } = useChart(props.id, {
  yAxis: {
    data: ['Факт', 'План'],
  },
  xAxis: {
    splitLine: {
      show: false,
    },
  },
} as EChartsOption)

onMounted(() => {
  loadChart(filteredSeries.value)
})

watch(filteredSeries, () => {
  reloadChart(filteredSeries.value)
})
</script>
