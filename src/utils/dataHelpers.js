// Funciones puras auxiliares para transformar datos del dashboard

/**
 * Calcula el porcentaje de una barra respecto al máximo del array
 * @param {number} value
 * @param {number} max
 * @returns {number} porcentaje 0-100
 */
export const calcPct = (value, max) => (max === 0 ? 0 : Math.round((value / max) * 100))

/**
 * Obtiene el máximo valor de un array de items con propiedad value
 * @param {Array<{value: number}>} items
 * @returns {number}
 */
export const getMax = (items) => Math.max(...items.map((i) => i.value))

/**
 * Formatea número con separador de miles
 * @param {number} n
 * @returns {string}
 */
export const formatNum = (n) => n?.toLocaleString('es-CL') ?? '—'

/**
 * Devuelve clase CSS de alerta según nivel
 * @param {'Alto'|'Medio'|'Normal'} nivel
 * @returns {string}
 */
export const alertClass = (nivel) => {
  const map = { Alto: 'danger', Medio: 'warning', Normal: 'success' }
  return map[nivel] ?? 'secondary'
}
