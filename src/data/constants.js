// Paleta de colores BICE
export const COLORS = {
  canvasBg: '#002D62',
  sidebarBg: '#001A3D',
  cardBg: '#001A3D',
  accent: '#F5A623',
  white: '#FFFFFF',
  textMuted: '#3a5a70',
  textLight: '#a0c0d8',
  border: '#dde4ee',
  barOtro: '#1a3a6a',
  barHttp: '#c0392b',
  barUi: '#2e86c1',
  barFunc: '#27ae60',
  barApi: '#95a5a6',
  barCod: '#bdc3c7',
  barHead: '#8e44ad',
  dev1: '#1e5fa8',
  dev2: '#2874a6',
  dev3: '#5dade2',
  dev4: '#85c1e9',
  dev5: '#aed6f1',
  dev6: '#d6eaf8',
  mod1: '#c0392b',
  mod2: '#e67e22',
  mod3: '#27ae60',
  mod4: '#1abc9c',
  mod5: '#3498db',
  mod6: '#9b59b6',
  hm1: '#154360',
  hm2: '#1a5276',
  hm3: '#1f618d',
  hm4: '#2471a3',
  hm5: '#1b4f72',
}

// Equipos disponibles
export const TEAMS = [
  { id: 'gapstronautas', label: 'Gapstronautas' },
  { id: 'covenant',      label: 'Covenant'      },
  { id: 'phantom',       label: 'Phantom'        },
  { id: 'rocket',        label: 'Rocket'         },
]

// Páginas del dashboard
export const PAGES = [
  { id: '1', label: 'Resumen general',   icon: '📊' },
  { id: '2', label: 'Patrones de fallo', icon: '🔍' },
]

// Niveles de alerta
export const ALERT_LEVELS = {
  Alto:   { bg: '#fdeaea', color: '#c0392b', border: '#f5b7b1' },
  Medio:  { bg: '#fef5e7', color: '#e67e22', border: '#fad7a0' },
  Normal: { bg: '#eafaf1', color: '#27ae60', border: '#a9dfbf' },
}

// Filtros por equipo
export const FILTERS = {
  gapstronautas: {
    periodos: ['Sep 25 – Abr 26', 'Sep 25 – Dic 25', 'Ene 26 – Abr 26'],
    modulos: ['Todos', 'Persona Jurídica', 'Reg. Partícipes', 'Aporte/Rescate FFMM', 'Persona Natural', 'Navegación FFMM', 'Saldo USD Caja'],
    tipos: ['Todos', 'Otro / Sin clasificar', 'Error HTTP 400', 'Frontend / UI', 'Funcional', 'API / Integración', 'Cód. respuesta', 'Campo NULL'],
  },
  covenant: {
    periodos: ['Feb 26'],
    modulos: ['Todos', 'Payment Methods'],
    tipos: ['Todos', 'Código respuesta'],
  },
  phantom: {
    periodos: ['Oct 25'],
    modulos: ['Todos', 'Persona Natural'],
    tipos: ['Todos', 'Código respuesta', 'Frontend / UI'],
  },
  rocket: {
    periodos: ['Oct 25'],
    modulos: ['Todos', 'Cash Account'],
    tipos: ['Todos', 'Frontend / UI'],
  },
}
