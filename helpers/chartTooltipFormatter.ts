import type { SeriesItem } from '~/types/Chart'
import { formatNumber } from '~/helpers/formatRub'

// Rendered inside the ECharts tooltip DOM (lives in document, so CSS vars work).
export default function chartTooltipFormatter(options: {
  dataIndex: number
  series: SeriesItem[]
}) {
  let items = ``

  for (let i = 0; i < options.series.length; i++) {
    const data = options.series[i]
    const color = data.color || 'var(--accent)'
    const name = data.name ?? ''
    const dataValue = data.data[options.dataIndex]

    items += `<div style="display:flex;flex-direction:column;gap:4px;">
                <span style="color:var(--ink-muted);font-size:12px;">${name}</span>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="background-color:${color};width:9px;height:9px;border-radius:999px;display:inline-block;"></span>
                  <span style="font-weight:600;color:var(--ink-text);font-variant-numeric:tabular-nums;">${formatNumber(
                    dataValue,
                  )}</span>
                </div>
              </div>`
  }

  return `<div style="display:flex;gap:18px;">${items}</div>`
}
