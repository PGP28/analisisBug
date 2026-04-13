import React from 'react'
import { COLORS } from '../../data/constants'
import { getMax, calcPct } from '../../utils/dataHelpers'

/**
 * HorizontalBarChart — barras horizontales con label + fill + count
 * Props:
 *   items: Array<{ label, value, colorKey }>
 *   maxOverride?: number  — fuerza el máximo (opcional)
 */
const HorizontalBarChart = ({ items, maxOverride }) => {
  const max = maxOverride ?? getMax(items)

  return (
    <div>
      {items.map((item, i) => (
        <div className="bar-row" key={i}>
          <div className="bar-label" title={item.label}>{item.label}</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${calcPct(item.value, max)}%`,
                background: COLORS[item.colorKey] ?? '#2e86c1',
              }}
            />
          </div>
          <div className="bar-count">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export default HorizontalBarChart
