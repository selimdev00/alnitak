<template>
  <div class="flex flex-1 flex-col gap-5 text-ink-text">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="t-eyebrow !text-ink-subtle">По дням месяца</p>
        <h2 class="mt-1 font-display text-xl font-semibold">План и факт</h2>
      </div>
      <ChartsCategorySelector v-model="filter" :options="series" />
    </div>

    <div :id="id" class="h-[300px] w-full sm:h-[360px] lg:h-[400px]" />
  </div>
</template>

<script setup lang="ts">
import type { SeriesItem } from '~/types/Chart'
import generateMockDataForChart from '~/helpers/generateMockDataForChart'
import { cssVar, withAlpha } from '~/helpers/echartsTheme'
import type { EChartsOption } from 'echarts/types/dist/shared'

const filter = ref<string>('all')

const props = defineProps<{ id: string }>()

const series: SeriesItem[] = [
  {
    data: generateMockDataForChart({ length: 31, range: 600 }),
    name: 'План',
    type: 'line',
    color: cssVar('--series-4'),
    areaStyle: {
      color: withAlpha('--series-4', 0.14),
    },
    symbol: 'circle',
    symbolSize: 7,
  },
  {
    data: generateMockDataForChart({ length: 31, range: 600 }),
    name: 'Факт',
    type: 'line',
    color: cssVar('--series-1'),
    areaStyle: {
      color: withAlpha('--series-1', 0.16),
    },
    symbol: 'circle',
    symbolSize: 7,
  },
]

const { loadChart, reloadChart } = useChart(props.id, {
  xAxis: {
    data: Array.from({ length: 31 }, (_, index) => {
      const dayNumber = index + 1
      return dayNumber.toString().padStart(2, '0')
    }),
    axisLabel: {
      interval: 'auto',
      rotate: 45,
    },
  },
  yAxis: {},
  grid: {
    left: '1%',
    right: '1%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: cssVar('--accent'),
      },
    },
  },
} as EChartsOption)

const filteredSeries = computed<SeriesItem[]>(() => {
  if (filter.value === 'all') {
    return series
  }

  return series.filter((e) => e.name === filter.value)
})

onMounted(() => {
  loadChart(filteredSeries.value)
})

watch(filter, () => {
  reloadChart(filteredSeries.value)
})
</script>
