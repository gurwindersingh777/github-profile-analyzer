'use client'

import { Cell, Pie, PieChart, Tooltip } from 'recharts'

interface Props {
  languages: Record<string, number>
}

const COLORS = [
  '#22c55e',
  '#3b82f6',
  '#eab308',
  '#ef4444',
  '#a855f7',
  '#06b6d4',
  '#f97316',
  '#ec4899',
]

interface ChartDatum {
  name: string
  value: number
}

function ChartTooltip({ active, payload }: {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
  }>
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="border-2 border-border bg-card px-3 py-2 text-sm font-bold shadow-brutal-sm">
      {payload[0].name}: {payload[0].value}%
    </div>
  )
}

export function ExportLanguageChart({ languages }: Props) {
  const data: ChartDatum[] = Object.entries(languages)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <section className="flex h-full flex-col border-2 border-border bg-card p-8 shadow-brutal">
      <h2 className="text-2xl font-black">Language Usage</h2>

      <div className="flex flex-1 flex-col items-center justify-center">

        <PieChart
          width={390}
          height={340}
        >
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={130}
            paddingAngle={3}
            stroke="var(--border)"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<ChartTooltip />} />
        </PieChart>

        <div className="mt-8 w-full max-w-xs space-y-4">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-base font-bold"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-4 w-4 rounded-full border border-border"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <span>{item.name}</span>
              </div>

              <span>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}