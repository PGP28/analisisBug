import React from 'react'
import { SidebarKpiCard } from './KpiCard'
import { TEAMS, PAGES } from '../../data/constants'

const Sidebar = ({
  currentTeam, currentPage,
  availableFilters, pendingFilters, hasPendingChanges,
  p1Data, p2Data,
  onTeamChange, onPageChange, onFilterChange, onApplyFilters,
}) => {
  const kpis = currentPage === '1'
    ? p1Data
      ? [
          { value: p1Data.totalBugs, label: 'Total bugs registrados' },
          { value: p1Data.tasaCierre, label: 'Tasa de cierre' },
        ]
      : []
    : p2Data ? p2Data.kpis : []

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div>
        <div className="sidebar-logo-lines">
          <span style={{ height: '5px' }} /><span style={{ height: '8px' }} />
          <span style={{ height: '11px' }} /><span style={{ height: '7px' }} />
          <span style={{ height: '10px' }} />
        </div>
        <div className="sidebar-brand-title">BICE — Análisis de Bugs</div>
        <div className="sidebar-brand-sub">Gerencia de Desarrollo · 2025–2026</div>
      </div>

      {/* KPIs */}
      {kpis.map((kpi, i) => (
        <SidebarKpiCard key={i} value={kpi.value} label={kpi.label} sub={kpi.sub} />
      ))}

      {/* Equipo */}
      <div>
        <div className="sidebar-filter-label">Equipo</div>
        <select className="sidebar-select" value={currentTeam} onChange={e => onTeamChange(e.target.value)}>
          {TEAMS.map(t => <option key={t.id} value={t.label}>{t.label}</option>)}
        </select>
      </div>

      {/* Período */}
      <div>
        <div className="sidebar-filter-label">Período</div>
        <select className="sidebar-select" value={pendingFilters.periodo} onChange={e => onFilterChange('periodo', e.target.value)}>
          {availableFilters.periodos.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Módulo */}
      <div>
        <div className="sidebar-filter-label">Módulo</div>
        <select className="sidebar-select" value={pendingFilters.modulo} onChange={e => onFilterChange('modulo', e.target.value)}>
          {availableFilters.modulos.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Tipo de Bug */}
      <div>
        <div className="sidebar-filter-label">Tipo de Bug</div>
        <select className="sidebar-select" value={pendingFilters.tipo} onChange={e => onFilterChange('tipo', e.target.value)}>
          {availableFilters.tipos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Botón Aplicar */}
      <button
        className={`sidebar-apply-btn ${hasPendingChanges ? 'has-changes' : ''}`}
        onClick={onApplyFilters}
      >
        {hasPendingChanges ? '● Aplicar filtros' : '✓ Filtros aplicados'}
      </button>

      {/* Vista — Página 1 / 2 */}
      <div className="sidebar-pages">
        <div className="sidebar-filter-label">Vista</div>
        {PAGES.map(p => (
          <button
            key={p.id}
            className={`sidebar-page-btn ${currentPage === p.id ? 'active' : ''}`}
            onClick={() => onPageChange(p.id)}
          >
            <span className="sidebar-page-icon">{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        Datos: Azure DevOps · BiceCI<br />
        Actualizado: Abr 2026
      </div>
    </aside>
  )
}

export default Sidebar
