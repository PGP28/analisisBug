import React from 'react'
import Sidebar from '../../components/common/Sidebar'
import { ResumenGeneral, PatronesFallo } from '../dashboard'
import { useTeamData } from '../../hooks/useTeamData'

const TeamSelector = () => {
  const {
    currentTeam, currentPage,
    availableFilters, pendingFilters, hasPendingChanges,
    p1Data, p2Data,
    setCurrentPage,
    handleTeamChange, handleFilterChange, handleApplyFilters,
  } = useTeamData()

  const pageData = currentPage === '1' ? p1Data : p2Data

  return (
    <div className="dashboard-shell">
      <Sidebar
        currentTeam={currentTeam}
        currentPage={currentPage}
        availableFilters={availableFilters}
        pendingFilters={pendingFilters}
        hasPendingChanges={hasPendingChanges}
        p1Data={p1Data}
        p2Data={p2Data}
        onTeamChange={handleTeamChange}
        onPageChange={setCurrentPage}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />
      <main className="main-content">
        {!pageData ? (
          <div style={{ padding: '2rem', color: '#4a6080', fontSize: '13px' }}>
            Sin datos para los filtros seleccionados.
          </div>
        ) : currentPage === '1'
          ? <ResumenGeneral data={p1Data} />
          : <PatronesFallo  data={p2Data} />
        }
      </main>
    </div>
  )
}

export default TeamSelector
