import { useState, useMemo } from 'react'
import { getAvailableFilters, computeP1, computeP2 } from '../data/bugEngine'

/**
 * useTeamData — gestiona estado de navegación, filtros pendientes vs aplicados
 * El botón "Aplicar" confirma los filtros y recalcula los datos
 */
export const useTeamData = () => {
  const [currentTeam, setCurrentTeam] = useState('Gapstronautas')
  const [currentPage, setCurrentPage] = useState('1')

  // Filtros disponibles para el equipo actual
  const availableFilters = useMemo(() => getAvailableFilters(currentTeam), [currentTeam])

  // Filtros pendientes (lo que el usuario seleccionó pero no aplicó)
  const [pendingFilters, setPendingFilters] = useState({
    periodo: availableFilters.periodos[0],
    modulo: 'Todos',
    tipo: 'Todos',
  })

  // Filtros aplicados (los que realmente afectan el dashboard)
  const [appliedFilters, setAppliedFilters] = useState({
    periodo: availableFilters.periodos[0],
    modulo: 'Todos',
    tipo: 'Todos',
  })

  // Cuando cambia el equipo, reseteamos todo
  const handleTeamChange = (teamName) => {
    setCurrentTeam(teamName)
    const newFilters = getAvailableFilters(teamName)
    const reset = { periodo: newFilters.periodos[0], modulo: 'Todos', tipo: 'Todos' }
    setPendingFilters(reset)
    setAppliedFilters(reset)
  }

  const handleFilterChange = (key, value) => {
    setPendingFilters(prev => ({ ...prev, [key]: value }))
  }

  // Aplicar filtros — recalcula el dashboard
  const handleApplyFilters = () => {
    setAppliedFilters({ ...pendingFilters })
  }

  // Detectar si hay cambios pendientes
  const hasPendingChanges =
    pendingFilters.periodo !== appliedFilters.periodo ||
    pendingFilters.modulo  !== appliedFilters.modulo  ||
    pendingFilters.tipo    !== appliedFilters.tipo

  // Calcular datos según filtros aplicados
  const p1Data = useMemo(() => computeP1(currentTeam, appliedFilters), [currentTeam, appliedFilters])
  const p2Data = useMemo(() => computeP2(currentTeam, appliedFilters), [currentTeam, appliedFilters])

  return {
    currentTeam,
    currentPage,
    availableFilters,
    pendingFilters,
    appliedFilters,
    hasPendingChanges,
    p1Data,
    p2Data,
    setCurrentPage,
    handleTeamChange,
    handleFilterChange,
    handleApplyFilters,
  }
}
