import React from 'react'
import { COLORS } from '../../data/constants'

/**
 * KpiCard — tarjeta KPI del sidebar izquierdo
 * Props: value, label, sub
 */
export const SidebarKpiCard = ({ value, label, sub }) => (
  <div className="sidebar-kpi">
    <div className="sidebar-kpi-val">{value}</div>
    <div className="sidebar-kpi-lbl">{label}</div>
    {sub && <div className="sidebar-kpi-sub">{sub}</div>}
  </div>
)

/**
 * KpiCard — tarjeta KPI superior (fondo azul oscuro)
 * Props: value, label, sub
 */
export const TopKpiCard = ({ value, label, sub }) => (
  <div className="kpi-card-top">
    <div className="kpi-value">{value}</div>
    <div className="kpi-label">{label}</div>
    {sub && <div className="kpi-sub">{sub}</div>}
  </div>
)
