import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceDot, ResponsiveContainer,
} from 'recharts'

/**
 * TrendChart — gráfico de área con puntos y valores en cada punto
 * Props:
 *   data: Array<{ mes|trimestre, value, isPeak?, isLow?, label? }>
 *   xKey: string — clave del eje X ('mes' | 'trimestre')
 *   peakColor?: string
 *   lowColor?: string
 */
const TrendChart = ({ data, xKey = 'mes', peakColor = '#F5A623', lowColor = '#27ae60' }) => {
  const peak = data.reduce((a, b) => (b.value > a.value ? b : a), data[0])
  const low  = data.length > 1 ? data.reduce((a, b) => (b.value < a.value ? b : a), data[0]) : null

  const CustomDot = (props) => {
    const { cx, cy, payload } = props
    const isPeak = payload[xKey] === peak[xKey]
    const isLow  = low && payload[xKey] === low[xKey] && low[xKey] !== peak[xKey]
    const fill   = isPeak ? peakColor : isLow ? lowColor : '#2e86c1'
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill={fill} stroke="#fff" strokeWidth={1.5} />
        <text x={cx} y={cy - 7} textAnchor="middle" fontSize={7} fill={fill} fontWeight="700">
          {payload.value}
        </text>
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={85}>
      <AreaChart data={data} margin={{ top: 14, right: 8, left: -30, bottom: 0 }}>
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2e86c1" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#2e86c1" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 6, fill: '#9ab0c0' }}
          axisLine={{ stroke: '#e0e6ee' }}
          tickLine={false}
        />
        <YAxis hide />
        <Tooltip
          contentStyle={{ fontSize: 10, borderRadius: 4, border: '1px solid #dde4ee' }}
          formatter={(v) => [v, 'Bugs']}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#2e86c1"
          strokeWidth={1.5}
          fill="url(#trendGrad)"
          dot={<CustomDot />}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default TrendChart
