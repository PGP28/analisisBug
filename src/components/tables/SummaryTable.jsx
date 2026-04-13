import React from 'react'
import AlertBadge from '../common/Badge'

/**
 * SummaryTable — tabla resumen de desarrolladores con nivel de alerta
 * Props:
 *   rows: Array<{ dev, bugs, alerta }>
 */
const SummaryTable = ({ rows }) => (
  <table className="summary-table">
    <thead>
      <tr>
        <th>Desarrollador</th>
        <th>Bugs</th>
        <th>Alerta</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          <td>{row.dev}</td>
          <td className="bold">{row.bugs}</td>
          <td><AlertBadge level={row.alerta} /></td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default SummaryTable
