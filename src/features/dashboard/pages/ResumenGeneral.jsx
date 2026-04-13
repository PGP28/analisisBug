import React from 'react'
import { TopKpiCard } from '../../../components/common/KpiCard'
import HorizontalBarChart from '../../../components/charts/BarChart'
import TrendChart from '../../../components/charts/TrendChart'
import SummaryTable from '../../../components/tables/SummaryTable'

/**
 * ResumenGeneral — Página 1 del dashboard
 * Props: data (p1 del equipo seleccionado)
 */
const ResumenGeneral = ({ data }) => (
  <>
    {/* ── KPIs superiores ── */}
    <div className="kpi-grid">
      {data.kpis.map((kpi, i) => (
        <TopKpiCard key={i} value={kpi.value} label={kpi.label} sub={kpi.sub} />
      ))}
    </div>

    {/* ── Tendencia mensual + Distribución tipo ── */}
    <div className="grid-2">
      <div className="panel">
        <div className="panel-title">Tendencia mensual de bugs</div>
        <TrendChart data={data.tendenciaMensual} xKey="mes" />
      </div>
      <div className="panel">
        <div className="panel-title">Distribución por tipo de bug</div>
        <HorizontalBarChart items={data.distribucionTipo} />
      </div>
    </div>

    {/* ── Ranking + Módulos + Tabla resumen ── */}
    <div className="grid-3">
      <div className="panel">
        <div className="panel-title">Ranking por desarrollador</div>
        <HorizontalBarChart items={data.rankingDevs} />
      </div>
      <div className="panel">
        <div className="panel-title">Bugs por módulo / sistema</div>
        <HorizontalBarChart items={data.modulos} />
      </div>
      <div className="panel">
        <div className="panel-title">Tabla resumen por desarrollador</div>
        <SummaryTable rows={data.tablaResumen} />
      </div>
    </div>
  </>
)

export default ResumenGeneral
