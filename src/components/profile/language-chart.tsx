'use client'

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

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

function ChartTooltip({ active, payload, }: { active?: boolean, payload?: Array<{ name: string; value: number }> }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="border-2 border-border bg-popover px-3 py-1.5 text-sm font-bold text-popover-foreground shadow-brutal-sm">
      {name}: {value}%
    </div>
  )
}

export function LanguageChart({ languages }: { languages: Record<string, number> }) {

  const data: ChartDatum[] = Object.entries(languages)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <section className="flex h-full flex-col border-2 border-border bg-card p-5 text-card-foreground shadow-brutal sm:p-6">
      <h2 className="mb-4 text-lg font-black tracking-tight">Language Usage</h2>
      <div className="h-72 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={2}
              stroke="var(--border)"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend iconType="square" wrapperStyle={{ fontSize: '0.8rem', fontWeight: 600 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
