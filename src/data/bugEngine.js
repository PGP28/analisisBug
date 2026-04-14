import { RAW_BUGS } from './rawBugs'

const DIAS_ORDER = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
const MESES_ORDER = ['Sep 2025','Oct 2025','Nov 2025','Dic 2025','Ene 2026','Feb 2026','Mar 2026','Abr 2026']
const TRIMESTRES_ORDER = ['2025Q3','2025Q4','2026Q1','2026Q2']
const TRIMESTRE_LABELS = {
  '2025Q3': 'Q3 2025',
  '2025Q4': 'Q4 2025',
  '2026Q1': 'Q1 2026',
  '2026Q2': 'Q2 2026',
}

const COLOR_KEYS = {
  tipoBug: {
    'Frontend/UI':     'barUi',
    'Error HTTP 400':  'barHttp',
    'Código respuesta':'barCod',
    'Funcional':       'barFunc',
    'API/Integración': 'barApi',
    'Otro':            'barOtro',
    'default':         'barOtro',
  },
  modulo:  ['mod1','mod2','mod3','mod4','mod5','mod6'],
  dev:     ['dev1','dev2','dev3','dev4','dev5','dev6'],
  patron:  ['barOtro','barUi','barFunc','barHttp','barApi','barCod','barHead','dev3','dev4'],
  heatmap: ['hm1','hm2','hm3','hm4','hm5'],
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

const sortedEntries = (map) =>
  Object.entries(map).sort((a, b) => b[1] - a[1])

/**
 * Nivel de alerta del dev según composición REAL de sus bugs:
 * - Tiene al menos 1 bug con Nivel_Alerta=Alto  → Alto
 * - Tiene al menos 1 bug con Nivel_Alerta=Medio → Medio
 * - Solo tiene Normal                            → Normal
 *
 * CORRECCIONES verificadas contra CSV:
 *   Felipe Valdes  → Medio  (0 Alto, 53 Medio, 46 Normal)
 *   Pablo Ortega   → Medio  (0 Alto, 55 Medio,  1 Normal)
 *   David Luna     → Medio  (0 Alto, 11 Medio, 27 Normal)
 *   Andres Duarte  → Alto   (3 Alto, 10 Medio,  5 Normal)
 *   Alvaro Fuentes → Medio  (0 Alto,  4 Medio, 11 Normal)
 *   Pedro Perez    → Normal (0 Alto,  0 Medio, 10 Normal)
 *   Yasna González → Medio  (0 Alto,  1 Medio,  1 Normal)
 */
const calcAlertaDev = (counter) => {
  if ((counter['Alto']  || 0) > 0) return 'Alto'
  if ((counter['Medio'] || 0) > 0) return 'Medio'
  return 'Normal'
}

// ── Filtros disponibles ────────────────────────────────────────
export const getAvailableFilters = (equipo) => {
  const rows = RAW_BUGS.filter(r => r.equipo === equipo)
  const periodos = [...new Set(rows.map(r => r.mesNombre))]
    .sort((a, b) => MESES_ORDER.indexOf(a) - MESES_ORDER.indexOf(b))
  const modulos = ['Todos', ...[...new Set(rows.map(r => r.modulo))]]
  const tipos   = ['Todos', ...[...new Set(rows.map(r => r.tipoBug))]]
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
    if (filters.tipo    && filters.tipo    !== 'Todos' && r.tipoBug !== filters.tipo)     return false
    return true
  })
}

// ── PÁGINA 1 ──────────────────────────────────────────────────
export const computeP1 = (equipo, filters) => {
  const rows = applyFilters(equipo, filters)
  if (rows.length === 0) return null

  const total    = rows.length
  const cerrados = rows.filter(r => r.estado === 'Closed').length
  const tasaCierre = `${Math.round((cerrados / total) * 100)}%`

  // Meses presentes en el período filtrado, ordenados cronológicamente
  const mesesSet = [...new Set(rows.map(r => r.mesNombre))]
    .sort((a, b) => MESES_ORDER.indexOf(a) - MESES_ORDER.indexOf(b))
  const numMeses = mesesSet.length
  const avgMes   = numMeses > 0 ? Math.round(total / numMeses) : total

  const mesCounts = mesesSet.map(m => ({ m, cnt: rows.filter(r => r.mesNombre === m).length }))
  const mesMax    = mesCounts.reduce((mx, x) => x.cnt > mx.cnt ? x : mx, mesCounts[0] || { m: '—', cnt: 0 })

  const devCount    = countBy(rows.filter(r => r.dev), 'dev')
  const topDevEntry = sortedEntries(devCount)[0]
  const topDev      = topDevEntry ? topDevEntry[0] : '—'
  const topDevBugs  = topDevEntry ? topDevEntry[1] : 0
  const topDevPct   = `${Math.round((topDevBugs / total) * 100)}%`
  const devUnicos   = Object.keys(devCount).length

  const kpis = [
    { value: String(avgMes),    label: 'Bugs promedio / mes',    sub: `↑ Pico: ${mesMax.cnt} (${mesMax.m})` },
    { value: String(devUnicos), label: 'Desarrolladores activos', sub: `Top: ${topDev} (${topDevBugs})` },
    { value: String(numMeses),  label: 'Meses analizados',        sub: mesesSet.length > 1 ? `${mesesSet[0]} → ${mesesSet[mesesSet.length-1]}` : mesesSet[0] },
    { value: topDevPct,         label: 'Concentración top dev',   sub: `${topDev}: ${topDevBugs}/${total} bugs` },
  ]

  // Tendencia mensual — etiqueta corta para el eje X
  const tendenciaMensual = mesesSet.map(m => ({
    mes: m.replace(' 2025', '').replace(' 2026', '').toLowerCase(),
    mesNombre: m,
    value: rows.filter(r => r.mesNombre === m).length,
  }))

  const tipoMap = countBy(rows, 'tipoBug')
  const distribucionTipo = sortedEntries(tipoMap).map(([label, value]) => ({
    label, value, colorKey: COLOR_KEYS.tipoBug[label] || COLOR_KEYS.tipoBug['default'],
  }))

  const rankingDevs = sortedEntries(devCount).slice(0, 7).map(([label, value], i) => ({
    label, value, colorKey: COLOR_KEYS.dev[i] || 'dev6',
  }))

  // Módulos — orden descendente REAL del CSV
  // Gapstronautas real: Persona Jurídica=111, Aporte y Rescate FFMM=54, Registro de Partícipes=51...
  const moduloMap = countBy(rows, 'modulo')
  const modulos = sortedEntries(moduloMap).slice(0, 6).map(([label, value], i) => ({
    label, value, colorKey: COLOR_KEYS.modulo[i] || 'mod6',
  }))

  // Tabla resumen — alerta derivada de composición real por dev
  const devAlertas = {}
  rows.forEach(r => {
    if (!r.dev) return
    if (!devAlertas[r.dev]) devAlertas[r.dev] = { bugs: 0, counter: {} }
    devAlertas[r.dev].bugs++
    devAlertas[r.dev].counter[r.nivelAlerta] = (devAlertas[r.dev].counter[r.nivelAlerta] || 0) + 1
  })
  const tablaResumen = Object.entries(devAlertas)
    .sort((a, b) => b[1].bugs - a[1].bugs)
    .map(([dev, data]) => ({
      dev,
      bugs: data.bugs,
      alerta: calcAlertaDev(data.counter),
    }))

  return { totalBugs: total, tasaCierre, kpis, tendenciaMensual, distribucionTipo, rankingDevs, modulos, tablaResumen }
}

// ── PÁGINA 2 ──────────────────────────────────────────────────
export const computeP2 = (equipo, filters) => {
  const rows = applyFilters(equipo, filters)
  if (rows.length === 0) return null

  const total     = rows.length
  const devCount  = countBy(rows.filter(r => r.dev), 'dev')
  const devUnicos = Object.keys(devCount).length
  const top3Bugs  = sortedEntries(devCount).slice(0, 3).reduce((s, [, v]) => s + v, 0)
  const top3Pct   = Math.round((top3Bugs / total) * 100)

  // ── Tendencia trimestral CORRECTA ──────────────────────────
  // Valores reales Gapstronautas: Q3=49, Q4=100, Q1=89, Q2=2
  // Variaciones: Q3→Q4 = +104%, Q4→Q1 = -11%, Q1→Q2 = -98%
  const trimMap    = countBy(rows, 'trimestre')
  const trimestres = TRIMESTRES_ORDER.filter(t => trimMap[t])

  const tendenciaTrimetral = trimestres.map((t, i) => {
    const value = trimMap[t]
    let label = null
    let isPeak = false
    let isLow  = false
    if (i > 0) {
      const prev = trimMap[trimestres[i - 1]]
      if (prev > 0) {
        const pct = Math.round(((value - prev) / prev) * 100)
        if (pct > 0) { label = `↑ +${pct}%`; isPeak = true }
        else          { label = `↓ ${pct}%`;  isLow  = true }
      }
    }
    return {
      trimestre: TRIMESTRE_LABELS[t] || t,
      value,
      label,
      isPeak,
      isLow,
    }
  })

  // KPI variación — entre los dos últimos trimestres con datos
  let variacion    = '—'
  let variacionSub = null
  if (trimestres.length >= 2) {
    const last = trimMap[trimestres[trimestres.length - 1]]
    const prev = trimMap[trimestres[trimestres.length - 2]]
    if (prev > 0) {
      const pct = Math.round(((last - prev) / prev) * 100)
      variacion    = `${pct >= 0 ? '+' : ''}${pct}%`
      variacionSub = pct > 0
        ? `⚠ Pico en ${TRIMESTRE_LABELS[trimestres[trimestres.length - 1]]}`
        : `↓ Señal de mejora`
    }
  }

  const patronMap   = countBy(rows, 'patron')
  const numPatrones = Object.keys(patronMap).length

  const kpis = [
    { value: `${top3Pct}%`,      label: `bugs en top ${Math.min(3, devUnicos)} desarrolladores`, sub: top3Pct > 70 ? '⚠ Riesgo de concentración' : null },
    { value: variacion,           label: 'variación trimestral', sub: variacionSub },
    { value: String(numPatrones), label: 'patrones identificados', sub: null },
  ]

  const patronesFallo = sortedEntries(patronMap).slice(0, 9).map(([label, value], i) => ({
    label, value, colorKey: COLOR_KEYS.patron[i] || 'barOtro',
  }))

  // Heatmap
  const diaMap     = countBy(rows, 'diaSemana')
  const diasSorted = DIAS_ORDER.filter(d => diaMap[d]).sort((a, b) => diaMap[b] - diaMap[a])
  const maxDia     = diaMap[diasSorted[0]] || 1
  const heatmap    = diasSorted.map((dia, i) => ({
    dia,
    bugs:     diaMap[dia],
    pct:      Math.round((diaMap[dia] / maxDia) * 100),
    colorKey: COLOR_KEYS.heatmap[i] || 'hm5',
    tag:      i === 0 ? '↑ Pico' : i === diasSorted.length - 1 ? '↓ Menor' : null,
  }))
  const heatmapNote = diasSorted.length > 0
    ? `Los ${diasSorted[0]} concentran el mayor número de bugs del período.`
    : ''

  // Matriz reincidencia
  const devsSorted     = sortedEntries(devCount).map(([d]) => d).slice(0, 6)
  const patronesSorted = sortedEntries(patronMap).map(([p]) => p).slice(0, 5)
  const matrizRows     = devsSorted.map(dev => {
    const devRows  = rows.filter(r => r.dev === dev)
    const values   = patronesSorted.map(p => devRows.filter(r => r.patron === p).length)
    const maxVal   = Math.max(...values)
    const criticos    = values.map((v, i) => v === maxVal && v >= 3 ? i : -1).filter(i => i >= 0)
    const recurrentes = values.map((v, i) => v >= 2 && !criticos.includes(i) ? i : -1).filter(i => i >= 0)
    return { dev, values, criticos, recurrentes }
  })
  const matrizReincidencia = {
    headers: ['Desarrollador', ...patronesSorted.map(p => p.length > 12 ? p.slice(0, 12) + '.' : p)],
    rows: matrizRows,
  }

  // Concentración
  const concentracion = sortedEntries(devCount).slice(0, 5).map(([dev, bugs], i) => ({
    dev,
    pct: Math.round((bugs / total) * 100),
    colorKey: COLOR_KEYS.heatmap[i] || 'hm5',
  }))
  const top3names = concentracion.slice(0, 3).map(c => c.dev.split(' ')[0]).join(', ')
  const concentracionNote = `⚠ ${top3names} concentran el ${top3Pct}% de los bugs`

  // Recurrentes
  const recMap = countBy(rows.filter(r => r.esRecurrente === 'Sí'), 'patron')
  const recurrentesList = sortedEntries(recMap).slice(0, 4).map(([patron, n]) => {
    const alertas = {}
    rows.filter(r => r.patron === patron && r.esRecurrente === 'Sí')
        .forEach(r => { alertas[r.nivelAlerta] = (alertas[r.nivelAlerta] || 0) + 1 })
    const alerta = alertas['Alto'] ? 'Alto' : alertas['Medio'] ? 'Medio' : 'Normal'
    return { patron, n, alerta }
  })

  return {
    kpis, patronesFallo, tendenciaTrimetral,
    matrizReincidencia, heatmap, heatmapNote,
    concentracion, concentracionNote,
    recurrentes: recurrentesList,
    recomendaciones: [],
  }
}
