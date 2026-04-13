import React from 'react'
import { TEAMS, PAGES } from '../../data/constants'

/**
 * NavBar — barra de navegación exterior con selección de equipo y página
 * Props: currentTeam, currentPage, onTeamChange, onPageChange
 */
const NavBar = ({ currentTeam, currentPage, onTeamChange, onPageChange }) => (
  <nav className="nav-outer">
    <div className="nav-row">
      {TEAMS.map((t) => (
        <button
          key={t.id}
          className={`btn-nav ${currentTeam === t.id ? 'active-team' : ''}`}
          onClick={() => onTeamChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
    <div className="nav-row">
      {PAGES.map((p) => (
        <button
          key={p.id}
          className={`btn-nav ${currentPage === p.id ? 'active-page' : ''}`}
          onClick={() => onPageChange(p.id)}
        >
          {p.label}
        </button>
      ))}
    </div>
  </nav>
)

export default NavBar
