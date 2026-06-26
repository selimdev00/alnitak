import { init, getInstanceByDom, registerTheme } from 'echarts'
import type { EChartsType } from 'echarts'

import type { EChartsOption } from 'echarts/types/dist/shared'
import chartTooltipFormatter from '~/helpers/chartTooltipFormatter'
import { buildEchartsTheme } from '~/helpers/echartsTheme'
import type { SeriesItem, TooltipFormatterOptions } from '~/types/Chart'

const THEME = 'alnitak'
let themeRegistered = false

function ensureTheme() {
  if (themeRegistered) return
  registerTheme(THEME, buildEchartsTheme())
  themeRegistered = true
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useChart(id: string, chartOptions: EChartsOption) {
  let chart: EChartsType | null = null

  const windowResizer = () => {
    chart?.resize()
  }

  const buildOption = (series: SeriesItem[]): EChartsOption =>
    ({
      ...chartOptions,
      animation: !prefersReducedMotion(),
      animationDuration: 620,
      animationEasing: 'cubicOut',
      // disable per-series emphasis so hovering never blurs/hides lines + areas
      series: series.map((s) => ({ ...s, emphasis: { disabled: true } })),
      grid: {
        containLabel: true,
        left: '3%',
        top: '6%',
        right: '3%',
        bottom: '6%',
        ...chartOptions.grid,
      },
      tooltip: {
        trigger: 'axis',
        confine: true,
        transitionDuration: 0,
        axisPointer: { type: 'shadow' },
        formatter: (options: TooltipFormatterOptions) => {
          const dataIndex = Array.isArray(options)
            ? options[0].dataIndex
            : options.dataIndex

          return chartTooltipFormatter({
            dataIndex,
            series: series.filter((e) => e.name),
          })
        },
        ...chartOptions.tooltip,
      },
    }) as EChartsOption

  const loadChart = (series: SeriesItem[]): void => {
    ensureTheme()

    const el = document.getElementById(id)
    if (!el) return

    // reuse any instance already bound to this node, never double-init
    chart = getInstanceByDom(el) ?? init(el, THEME)
    chart.setOption(buildOption(series), true)

    window.removeEventListener('resize', windowResizer)
    window.addEventListener('resize', windowResizer)
  }

  const reloadChart = (series: SeriesItem[]): void => {
    if (!chart) {
      loadChart(series)
      return
    }
    // notMerge=true cleanly replaces the option without re-initializing
    chart.setOption(buildOption(series), true)
  }

  onUnmounted(() => {
    window.removeEventListener('resize', windowResizer)
    chart?.dispose()
    chart = null
  })

  return {
    loadChart,
    reloadChart,
  }
}
