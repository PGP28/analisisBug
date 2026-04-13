import React from 'react'
import { COLORS } from '../../data/constants'

/**
 * HeatMap — mapa de calor de bugs por día de la semana
 * Props:
 *   rows: Array<{ dia, bugs, tag, colorKey, pct }>
 *   note: string
 */
const HeatMap = ({ rows, note }) => (
  <div>
    {rows.map((row, i) => (
      <div className="heatmap-row" key={i}>
        <div className="heatmap-day">{row.dia}</div>
        <div
          className="heatmap-bar"
          style={{
            background: COLORS[row.colorKey] ?? '#154360',
            width: `${row.pct}%`,
          }}
        >
          <span className="heatmap-val">{row.bugs} bugs</span>
          {row.tag && <span className="heatmap-tag">{row.tag}</span>}
        </div>
      </div>
    ))}
    {note && <div className="heatmap-note">{note}</div>}
  </div>
)

export default HeatMap
