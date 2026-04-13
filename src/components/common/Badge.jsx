import React from 'react'

/**
 * AlertBadge — muestra nivel de alerta: Alto / Medio / Normal
 * Props: level ('Alto' | 'Medio' | 'Normal')
 */
const AlertBadge = ({ level }) => (
  <span className={`alert-badge ${level}`}>{level}</span>
)

export default AlertBadge
