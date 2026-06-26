// Builds an ECharts theme object from the live CSS design tokens so the
// charts stay in lockstep with the rest of the system (no hex literals).

function token(name: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

// ECharts' renderer (zrender) does not reliably parse oklch() for strokes /
// area gradients, so resolve every token to a plain rgb() via the browser.
function resolveColor(value: string): string {
  if (typeof document === 'undefined' || !value) return value
  const probe = document.createElement('span')
  probe.style.color = value
  probe.style.display = 'none'
  document.body.appendChild(probe)
  const rgb = getComputedStyle(probe).color
  probe.remove()
  return rgb || value
}

export function cssVar(name: string): string {
  return resolveColor(token(name))
}

// rgb() resolved token with an alpha channel, for chart area fills.
export function withAlpha(name: string, alpha: number): string {
  const rgb = cssVar(name)
  if (rgb.startsWith('rgb(')) {
    return rgb.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`)
  }
  return rgb
}

export function seriesPalette(): string[] {
  return [
    cssVar('--series-1'),
    cssVar('--series-2'),
    cssVar('--series-3'),
    cssVar('--series-4'),
    cssVar('--series-5'),
  ]
}

export function buildEchartsTheme() {
  const axis = cssVar('--chart-axis')
  const grid = cssVar('--chart-grid')
  const text = cssVar('--ink-text')
  const muted = cssVar('--ink-muted')
  const ink2 = cssVar('--ink-2')
  const border = cssVar('--ink-border')

  const axisCommon = {
    axisLine: { lineStyle: { color: border } },
    axisTick: { show: false },
    axisLabel: { color: axis, fontSize: 12 },
    splitLine: { lineStyle: { color: grid } },
  }

  return {
    color: seriesPalette(),
    backgroundColor: 'transparent',
    textStyle: {
      color: muted,
      fontFamily: 'Inter Tight Variable, system-ui, sans-serif',
    },
    title: { textStyle: { color: text } },
    categoryAxis: { ...axisCommon, splitLine: { show: false } },
    valueAxis: axisCommon,
    legend: { textStyle: { color: muted } },
    tooltip: {
      backgroundColor: ink2,
      borderColor: border,
      borderWidth: 1,
      padding: [10, 14],
      extraCssText:
        'border-radius:12px;box-shadow:0 16px 40px -12px oklch(0.2 0.02 54 / 0.5);',
      textStyle: { color: text },
    },
  }
}
