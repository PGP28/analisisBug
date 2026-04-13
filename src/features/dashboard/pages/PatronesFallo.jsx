import React from 'react'
import HorizontalBarChart from '../../../components/charts/BarChart'
import TrendChart from '../../../components/charts/TrendChart'
import HeatMap from '../../../components/charts/HeatMap'
import AlertBadge from '../../../components/common/Badge'
import { COLORS } from '../../../data/constants'

/**
 * MatrizReincidencia — tabla con celdas coloreadas rojo/amarillo
 */
const MatrizReincidencia = ({ matriz }) => (
  <div>
    <table className="matrix-table">
      <thead>
        <tr>
          {matriz.headers.map((h, i) => <th key={i}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {matriz.rows.map((row, ri) => (
          <tr key={ri}>
            <td>{row.dev}</td>
            {row.values.map((val, vi) => (
              <td
                key={vi}
                className={
                  row.criticos.includes(vi) ? 'matrix-cell-red' :
                  row.recurrentes.includes(vi) ? 'matrix-cell-yellow' : ''
                }
              >
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="matrix-legend">Rojo = patrón crítico · Amarillo = patrón recurrente</div>
  </div>
)

/**
 * PatronesFallo — Página 2 del dashboard
 * Props: data (p2 del equipo seleccionado)
 */
const PatronesFallo = ({ data }) => (
  <>
    {/* ── Patrones frecuentes + Tendencia trimestral ── */}
    <div className="grid-2">
      <div className="panel">
        <div className="panel-title">Patrones de fallo más frecuentes</div>
        <HorizontalBarChart items={data.patronesFallo} />
      </div>
      <div className="panel">
        <div className="panel-title">Tendencia trimestral de bugs</div>
        <TrendChart data={data.tendenciaTrimetral} xKey="trimestre" />
      </div>
    </div>

    {/* ── Matriz reincidencia + Heatmap ── */}
    <div className="grid-2">
      <div className="panel">
        <div className="panel-title">Matriz de reincidencia — Dev vs Patrón de fallo</div>
        <MatrizReincidencia matriz={data.matrizReincidencia} />
      </div>
      <div className="panel">
        <div className="panel-title">Mapa de calor — bugs por día de la semana</div>
        <HeatMap rows={data.heatmap} note={data.heatmapNote} />
      </div>
    </div>

    {/* ── Concentración + Recurrentes + Recomendaciones ── */}
    <div className="grid-3">
      <div className="panel">
        <div className="panel-title">Concentración de riesgo</div>
        {data.concentracion.map((item, i) => (
          <div key={i}>
            <div className="risk-label">{item.dev} — {item.pct}%</div>
            <div
              className="risk-bar"
              style={{
                background: COLORS[item.colorKey] ?? '#154360',
                width: `${item.pct}%`,
              }}
            >
              <span className="risk-val">{item.pct}%</span>
            </div>
          </div>
        ))}
        <div className="risk-note">{data.concentracionNote}</div>
      </div>

      <div className="panel">
        <div className="panel-title">Bugs recurrentes / sin solución de raíz</div>
        {data.recurrentes.map((item, i) => (
          <div className="recurrent-row" key={i}>
            <div className="recurrent-pat">{item.patron}</div>
            <div className="recurrent-meta">
              <span className="recurrent-n">{item.n}</span>
              <AlertBadge level={item.alerta} />
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-title">Recomendaciones para gerencia</div>
        {data.recomendaciones.map((reco, i) => (
          <div className="reco-row" key={i}>
            <div className="reco-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="reco-txt">{reco}</div>
          </div>
        ))}
      </div>
    </div>
  </>
)

export default PatronesFallo
