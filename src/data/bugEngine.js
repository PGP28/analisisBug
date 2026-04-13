import { RAW_BUGS } from './rawBugs'

const DIAS_ORDER = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
const MESES_ORDER = ['Sep 2025','Oct 2025','Nov 2025','Dic 2025','Ene 2026','Feb 2026','Mar 2026','Abr 2026']
const TRIMESTRES_ORDER = ['2025Q3','2025Q4','2026Q1','2026Q2']

const COLOR_KEYS = {
  tipoBug: {
    'Frontend/UI':    'barUi',
    'Error HTTP 400': 'barHttp',
    'Código respuesta':'barCod',
    'Funcional':      'barFunc',
    'API/Integración':'barApi',
    'Otro':           'barOtro',
    'default':        'barOtro',
  },
  modulo: ['mod1','mod2','mod3','mod4','mod5','mod6'],
  dev:    ['dev1','dev2','dev3','dev4','dev5','dev6'],
  patron: ['barOtro','barUi','barFunc','barHttp','barApi','barCod','barHead','dev3','dev4'],
  heatmap:['hm1','hm2','hm3','hm4','hm5'],
}

// ── Helpers ────────────────────────────────────────────────────
const countBy = (rows, key) => {
  const map = {}
  rows.forEach(r => {
    const v = r[key] || 'Sin asignar'
    map[v] = (map[v] || 0) + 1
  })
  return map
}

const sortedEntries = (map, orderArr = null) => {
  const entries = Object.entries(map).sort((a, b) => b[1] - a[1])
  if (orderArr) {
    return orderArr
      .filter(k => map[k] !== undefined)
      .map(k => [k, map[k]])
  }
  return entries
}

// ── Filtros disponibles ────────────────────────────────────────
export const getAvailableFilters = (equipo) => {
  const rows = RAW_BUGS.filter(r => r.equipo === equipo)
  const periodos = [...new Set(rows.map(r => r.mesNombre))]
    .sort((a, b) => MESES_ORDER.indexOf(a) - MESES_ORDER.indexOf(b))
  const modulos = ['Todos', ...new Set(rows.map(r => r.modulo)).values()]
  const tipos   = ['Todos', ...new Set(rows.map(r => r.tipoBug)).values()]
  return {
    periodos: periodos.length > 1 ? ['Todos los períodos', ...periodos] : periodos,
    modulos,
    tipos,
  }
}

// ── Aplicar filtros ────────────────────────────────────────────
const applyFilters = (equipo, filters) => {
  return RAW_BUGS.filter(r => {
    if (r.equipo !== equipo) return false
    if (filters.periodo && filters.periodo !== 'Todos los períodos' && r.mesNombre !== filters.periodo) return false
    if (filters.modulo  && filters.modulo  !== 'Todos' && r.modulo  !== filters.modulo)  return false
    if (filters.tipo    && filters.tipo    !== 'Todos' && r.tipoBug  !== filters.tipo)    return false
    return true
  })
}

// ── Calcular Página 1 ──────────────────────────────────────────
export const computeP1 = (equipo, filters) => {
  const rows = applyFilters(equipo, filters)
  if (rows.length === 0) return null

  const total = rows.length
  const cerrados = rows.filter(r => r.estado === 'Closed').length
  const tasaCierre = total > 0 ? `${Math.round((cerrados / total) * 100)}%` : '0%'

  // Meses únicos para el período
  const mesesSet = [...new Set(rows.map(r => r.mesNombre))]
    .sort((a, b) => MESES_ORDER.indexOf(a) - MESES_ORDER.indexOf(b))
  const numMeses = mesesSet.length
  const avgMes = numMeses > 0 ? Math.round(total / numMeses) : total
  const mesMax = mesesSet.reduce((mx, m) => {
    const cnt = rows.filter(r => r.mesNombre === m).length
    return cnt > (mx.cnt || 0) ? { m, cnt } : mx
  }, {})

  // Top dev
  const devCount = countBy(rows.filter(r => r.dev), 'dev')
  const topDevEntry = Object.entries(devCount).sort((a, b) => b[1] - a[1])[0]
  const topDev = topDevEntry ? topDevEntry[0] : '—'
  const topDevBugs = topDevEntry ? topDevEntry[1] : 0
  const topDevPct = total > 0 ? `${Math.round((topDevBugs / total) * 100)}%` : '—'
  const devUnicos = Object.keys(devCount).length

  // KPIs
  const kpis = [
    { value: String(avgMes), label: 'Bugs promedio / mes', sub: `↑ Pico: ${mesMax.cnt} (${mesMax.m})` },
    { value: String(devUnicos), label: 'Desarrolladores activos', sub: `Top: ${topDev} (${topDevBugs})` },
    { value: String(numMeses), label: 'Meses analizados', sub: mesesSet.length > 1 ? `${mesesSet[0]} → ${mesesSet[mesesSet.length-1]}` : mesesSet[0] },
    { value: topDevPct, label: 'Concentración top dev', sub: `${topDev}: ${topDevBugs}/${total} bugs` },
  ]

  // Tendencia mensual
  const tendenciaMensual = mesesSet.map(m => ({
    mes: m,
    value: rows.filter(r => r.mesNombre === m).length,
  }))

  // Distribución tipo bug
  const tipoMap = countBy(rows, 'tipoBug')
  const distribucionTipo = sortedEntries(tipoMap)
    .map(([label, value]) => ({
      label, value,
      colorKey: COLOR_KEYS.tipoBug[label] || COLOR_KEYS.tipoBug['default'],
    }))

  // Ranking devs
  const rankingDevs = sortedEntries(devCount)
    .slice(0, 7)
    .map(([label, value], i) => ({ label, value, colorKey: COLOR_KEYS.dev[i] || 'dev6' }))

  // Módulos
  const moduloMap = countBy(rows, 'modulo')
  const modulos = sortedEntries(moduloMap)
    .slice(0, 6)
    .map(([label, value], i) => ({ label, value, colorKey: COLOR_KEYS.modulo[i] || 'mod6' }))

  // Tabla resumen
  const alertaMap = {}
  rows.forEach(r => {
    if (!r.dev) return
    if (!alertaMap[r.dev]) alertaMap[r.dev] = { bugs: 0, alertas: {} }
    alertaMap[r.dev].bugs++
    alertaMap[r.dev].alertas[r.nivelAlerta] = (alertaMap[r.dev].alertas[r.nivelAlerta] || 0) + 1
  })
  const getAlerta = (alertas) => {
    if (alertas['Alto'])  return 'Alto'
    if (alertas['Medio']) return 'Medio'
    return 'Normal'
  }
  const tablaResumen = Object.entries(alertaMap)
    .sort((a, b) => b[1].bugs - a[1].bugs)
    .map(([dev, data]) => ({ dev, bugs: data.bugs, alerta: getAlerta(data.alertas) }))

  return { totalBugs: total, tasaCierre, kpis, tendenciaMensual, distribucionTipo, rankingDevs, modulos, tablaResumen }
}

// ── Calcular Página 2 ──────────────────────────────────────────
export const computeP2 = (equipo, filters) => {
  const rows = applyFilters(equipo, filters)
  if (rows.length === 0) return null

  const total = rows.length
  const devCount = countBy(rows.filter(r => r.dev), 'dev')
  const topDevEntry = Object.entries(devCount).sort((a, b) => b[1] - a[1])[0]
  const topDevBugs = topDevEntry ? topDevEntry[1] : 0
  const topDevPct = total > 0 ? `${Math.round((topDevBugs / total) * 100)}%` : '—'
  const devUnicos = Object.keys(devCount).length

  // KPIs p2
  const top3Bugs = Object.values(devCount).sort((a,b)=>b-a).slice(0,3).reduce((s,v)=>s+v,0)
  const top3Pct = total > 0 ? Math.round((top3Bugs / total) * 100) : 0

  // Trimestres
  const trimMap = countBy(rows, 'trimestre')
  const trimestres = TRIMESTRES_ORDER.filter(t => trimMap[t])
  const trimMax = trimestres.reduce((mx, t) => trimMap[t] > (trimMap[mx]||0) ? t : mx, trimestres[0])
  let variacion = '—'
  if (trimestres.length >= 2) {
    const last  = trimMap[trimestres[trimestres.length - 1]] || 0
    const prev  = trimMap[trimestres[trimestres.length - 2]] || 0
    if (prev > 0) variacion = `${last > prev ? '+' : ''}${Math.round(((last - prev) / prev) * 100)}%`
  }

  const patronMap = countBy(rows, 'patron')
  const numPatrones = Object.keys(patronMap).length

  const kpis = [
    { value: `${top3Pct}%`, label: `bugs en top ${Math.min(3, devUnicos)} desarrolladores`, sub: top3Pct > 70 ? '⚠ Riesgo de concentración' : null },
    { value: variacion,     label: 'variación trimestral', sub: trimMax ? `Pico: ${trimMax}` : null },
    { value: String(numPatrones), label: 'patrones identificados', sub: null },
  ]

  // Patrones de fallo
  const patronesFallo = sortedEntries(patronMap)
    .slice(0, 9)
    .map(([label, value], i) => ({ label, value, colorKey: COLOR_KEYS.patron[i] || 'barOtro' }))

  // Tendencia trimestral
  const tendenciaTrimetral = trimestres.map(t => ({
    trimestre: t,
    value: trimMap[t],
    isPeak: t === trimMax,
  }))

  // Heatmap
  const diaMap = countBy(rows, 'diaSemana')
  const diasSorted = DIAS_ORDER.filter(d => diaMap[d]).sort((a,b) => diaMap[b] - diaMap[a])
  const maxDia = diaMap[diasSorted[0]] || 1
  const heatmap = diasSorted.map((dia, i) => ({
    dia,
    bugs: diaMap[dia],
    pct: Math.round((diaMap[dia] / maxDia) * 100),
    colorKey: COLOR_KEYS.heatmap[i] || 'hm5',
    tag: i === 0 ? '↑ Pico' : i === diasSorted.length - 1 ? '↓ Menor' : null,
  }))
  const heatmapNote = diasSorted.length > 0
    ? `Los ${diasSorted[0]} concentran el mayor número de bugs del período filtrado.`
    : ''

  // Matriz de reincidencia
  const devsSorted = Object.entries(devCount).sort((a,b)=>b[1]-a[1]).map(([d])=>d).slice(0,6)
  const patronesSorted = Object.entries(patronMap).sort((a,b)=>b[1]-a[1]).map(([p])=>p).slice(0,5)
  const matrizRows = devsSorted.map(dev => {
    const devRows = rows.filter(r => r.dev === dev)
    const values = patronesSorted.map(p => devRows.filter(r => r.patron === p).length)
    const maxVal = Math.max(...values)
    const criticos    = values.map((v, i) => v === maxVal && v >= 3 ? i : -1).filter(i => i >= 0)
    const recurrentes = values.map((v, i) => v >= 2 && !criticos.includes(i) ? i : -1).filter(i => i >= 0)
    return { dev, values, criticos, recurrentes }
  })
  const matrizReincidencia = {
    headers: ['Desarrollador', ...patronesSorted.map(p => p.length > 10 ? p.slice(0,10)+'.' : p)],
    rows: matrizRows,
  }

  // Concentración de riesgo
  const concentracion = Object.entries(devCount)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5)
    .map(([dev, bugs], i) => ({
      dev,
      pct: Math.round((bugs / total) * 100),
      colorKey: COLOR_KEYS.heatmap[i] || 'hm5',
    }))
  const top3devNames = concentracion.slice(0,3).map(c=>c.dev).join(', ')
  const concentracionNote = concentracion.length > 0
    ? `⚠ ${top3devNames} concentran el ${top3Pct}% de los bugs`
    : ''

  // Recurrentes
  const recurrentes = rows
    .filter(r => r.esRecurrente === 'Sí')
  const recMap = countBy(recurrentes, 'patron')
  const recurrentesList = sortedEntries(recMap)
    .slice(0,4)
    .map(([patron, n]) => {
      const alertas = {}
      recurrentes.filter(r=>r.patron===patron).forEach(r => {
        alertas[r.nivelAlerta] = (alertas[r.nivelAlerta]||0)+1
      })
      const alerta = alertas['Alto'] ? 'Alto' : alertas['Medio'] ? 'Medio' : 'Normal'
      return { patron, n, alerta }
    })

  return {
    kpis,
    patronesFallo,
    tendenciaTrimetral,
    matrizReincidencia,
    heatmap,
    heatmapNote,
    concentracion,
    concentracionNote,
    recurrentes: recurrentesList,
    recomendaciones: [],
  }
}
