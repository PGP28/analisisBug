// Datos consolidados por equipo
// Fuente: bugs_consolidado_v1.csv — Azure DevOps · BiceCI

export const teamsData = {

  gapstronautas: {
    id: 'gapstronautas',
    name: 'Gapstronautas',
    periodo: 'Sep 25 – Abr 26',
    // ── Página 1 ──────────────────────────────
    p1: {
      totalBugs: 240,
      tasaCierre: '97.5%',
      kpis: [
        { value: '30',  label: 'Bugs promedio / mes',    sub: '↑ Pico: 49 (sep 2025)' },
        { value: '7',   label: 'Desarrolladores activos', sub: 'Top: Felipe Valdes (99)' },
        { value: '8',   label: 'Meses analizados',        sub: 'sep 2025 → abr 2026'   },
        { value: '41%', label: 'Concentración top dev',   sub: 'F. Valdes: 99/240 bugs' },
      ],
      tendenciaMensual: [
        { mes: 'sep 25', value: 46 },
        { mes: 'oct',    value: 43 },
        { mes: 'nov',    value: 37 },
        { mes: 'dic',    value: 46 },
        { mes: 'ene 26', value: 46 },
        { mes: 'feb',    value: 28 },
        { mes: 'mar',    value: 26 },
        { mes: 'abr',    value: 8  },
      ],
      distribucionTipo: [
        { label: 'Otro / Sin clasificar', value: 123, colorKey: 'barOtro' },
        { label: 'Error HTTP 400',        value: 39,  colorKey: 'barHttp' },
        { label: 'Frontend / UI',         value: 35,  colorKey: 'barUi'   },
        { label: 'Funcional',             value: 17,  colorKey: 'barFunc' },
        { label: 'API / Integración',     value: 11,  colorKey: 'barApi'  },
        { label: 'Cód. respuesta',        value: 11,  colorKey: 'barCod'  },
        { label: 'Campo NULL',            value: 2,   colorKey: 'barHead' },
      ],
      rankingDevs: [
        { label: 'Felipe Valdes',  value: 99, colorKey: 'dev1' },
        { label: 'Pablo Ortega',   value: 56, colorKey: 'dev2' },
        { label: 'David Luna',     value: 38, colorKey: 'dev3' },
        { label: 'Andres Duarte',  value: 18, colorKey: 'dev4' },
        { label: 'Alvaro Fuentes', value: 15, colorKey: 'dev5' },
        { label: 'Pedro Perez',    value: 10, colorKey: 'dev6' },
      ],
      modulos: [
        { label: 'Persona Jurídica',     value: 125, colorKey: 'mod1' },
        { label: 'Reg. Partícipes',      value: 49,  colorKey: 'mod2' },
        { label: 'Aporte/Rescate FFMM', value: 29,  colorKey: 'mod3' },
        { label: 'Persona Natural',      value: 14,  colorKey: 'mod4' },
        { label: 'Navegación FFMM',      value: 12,  colorKey: 'mod5' },
        { label: 'Saldo USD Caja',       value: 6,   colorKey: 'mod6' },
      ],
      tablaResumen: [
        { dev: 'Felipe Valdes',  bugs: 99, alerta: 'Alto'   },
        { dev: 'Pablo Ortega',   bugs: 56, alerta: 'Medio'  },
        { dev: 'David Luna',     bugs: 38, alerta: 'Medio'  },
        { dev: 'Andres Duarte',  bugs: 18, alerta: 'Normal' },
        { dev: 'Alvaro Fuentes', bugs: 15, alerta: 'Normal' },
        { dev: 'Pedro Perez',    bugs: 10, alerta: 'Normal' },
        { dev: 'Yasna González', bugs: 2,  alerta: 'Normal' },
      ],
    },
    // ── Página 2 ──────────────────────────────
    p2: {
      kpis: [
        { value: '80%',   label: 'bugs en solo 3 desarrolladores', sub: '⚠ Riesgo de concentración' },
        { value: '+104%', label: 'aumento bugs Q3→Q4 2025',        sub: '⚠ Pico en oct–dic 2025'    },
        { value: '12',    label: 'patrones identificados por IA',   sub: null                        },
      ],
      filtros: { desarrollador: 'Todos', patron: 'Todos', trimestre: 'Todos' },
      patronesFallo: [
        { label: 'Otro / Sin clasificar',    value: 77, colorKey: 'barOtro' },
        { label: 'Error visual / UI',        value: 37, colorKey: 'barUi'   },
        { label: 'Discrepancia Figma',       value: 32, colorKey: 'barFunc' },
        { label: 'Código HTTP incorrecto',   value: 20, colorKey: 'barHttp' },
        { label: 'Datos no cargan',          value: 19, colorKey: 'barApi'  },
        { label: 'Cód. interno incorrecto',  value: 15, colorKey: 'barCod'  },
        { label: 'Analytics/Eventos',        value: 12, colorKey: 'barHead' },
        { label: 'Header sin validar',       value: 8,  colorKey: 'dev3'    },
      ],
      tendenciaTrimetral: [
        { trimestre: 'Q3 2025', value: 43 },
        { trimestre: 'Q4 2025', value: 89, isPeak: true,  label: '↑+104%' },
        { trimestre: 'Q1 2026', value: 79 },
        { trimestre: 'Q2 2026', value: 29, isLow: true,   label: '↓-11%'  },
      ],
      matrizReincidencia: {
        headers: ['Desarrollador', 'Analytics', 'Campo NULL', 'Cálculo', 'HTTP', 'No cargan', 'Figma', 'Visual/UI', 'Header', 'Otro'],
        rows: [
          { dev: 'Felipe Valdes',  values: [23, 0, 5,  4,  0, 19, 23, 1,  24], criticos: [0,6], recurrentes: [] },
          { dev: 'Pablo Ortega',   values: [0,  24, 0, 29, 0, 0,  1,  1,  1],  criticos: [1,3], recurrentes: [] },
          { dev: 'David Luna',     values: [9,  0,  1, 8,  1, 11, 6,  1,  1],  criticos: [],    recurrentes: [5] },
          { dev: 'Andres Duarte',  values: [2,  0,  3, 7,  2, 1,  2,  0,  1],  criticos: [],    recurrentes: [3] },
          { dev: 'Alvaro Fuentes', values: [1,  0,  0, 0,  1, 0,  2,  0,  11], criticos: [],    recurrentes: [] },
          { dev: 'Pedro Perez',    values: [8,  0,  0, 0,  0, 1,  0,  0,  1],  criticos: [],    recurrentes: [] },
        ],
      },
      heatmap: [
        { dia: 'Miércoles', bugs: 71, tag: '↑ Pico',   colorKey: 'hm1', pct: 100 },
        { dia: 'Lunes',     bugs: 47, tag: null,        colorKey: 'hm2', pct: 66  },
        { dia: 'Jueves',    bugs: 45, tag: null,        colorKey: 'hm3', pct: 63  },
        { dia: 'Martes',    bugs: 42, tag: null,        colorKey: 'hm4', pct: 59  },
        { dia: 'Viernes',   bugs: 35, tag: '↓ Menor',  colorKey: 'hm5', pct: 49  },
      ],
      heatmapNote: 'Los miércoles concentran un 30% más que el promedio. Posible patrón de entregas a mitad de semana sin revisión suficiente.',
      concentracion: [
        { dev: 'Felipe Valdes',  pct: 41, colorKey: 'hm1' },
        { dev: 'Pablo Ortega',   pct: 23, colorKey: 'hm2' },
        { dev: 'David Luna',     pct: 16, colorKey: 'hm3' },
        { dev: 'Andres Duarte',  pct: 8,  colorKey: 'hm4' },
        { dev: 'Alvaro Fuentes', pct: 6,  colorKey: 'hm5' },
      ],
      concentracionNote: '⚠ 3 devs concentran el 80% de todos los bugs',
      recurrentes: [
        { patron: 'GET mutual-funds — código incorrecto',  n: 6, alerta: 'Alto'  },
        { patron: 'BFF Registro Partícipes movements',     n: 5, alerta: 'Alto'  },
        { patron: 'Custom events faltantes (GTM)',         n: 4, alerta: 'Medio' },
      ],
      recomendaciones: [
        'Implementar revisión de Figma obligatoria antes de PR — reduce 28% de bugs',
        'Pablo Ortega: capacitación en contratos de API y códigos HTTP 4xx',
        'Revisar proceso de entregas los miércoles — posible presión de sprints',
      ],
    },
  },

  covenant: {
    id: 'covenant',
    name: 'Covenant',
    periodo: 'Feb 26',
    p1: {
      totalBugs: 1,
      tasaCierre: '0%',
      kpis: [
        { value: '1',    label: 'Bugs registrados',        sub: '↑ Feb 2026'           },
        { value: '1',    label: 'Desarrolladores activos', sub: 'Top: S. Contreras (1)' },
        { value: '1',    label: 'Mes analizado',           sub: 'Feb 2026'              },
        { value: '100%', label: 'Concentración top dev',   sub: 'S. Contreras: 1/1 bug' },
      ],
      tendenciaMensual: [
        { mes: 'Feb 26', value: 1 },
      ],
      distribucionTipo: [
        { label: 'Código respuesta', value: 1, colorKey: 'barCod' },
      ],
      rankingDevs: [
        { label: 'Sebastian Contreras', value: 1, colorKey: 'dev1' },
      ],
      modulos: [
        { label: 'Payment Methods', value: 1, colorKey: 'mod1' },
      ],
      tablaResumen: [
        { dev: 'Sebastian Contreras', bugs: 1, alerta: 'Medio' },
      ],
    },
    p2: {
      kpis: [
        { value: '100%', label: 'bugs en 1 desarrollador', sub: '⚠ Sin comparativa'      },
        { value: '—',    label: 'variación trimestral',    sub: '1 solo trimestre'        },
        { value: '1',    label: 'patrón identificado',     sub: null                      },
      ],
      filtros: { desarrollador: 'Todos', patron: 'Todos', trimestre: 'Todos' },
      patronesFallo: [
        { label: 'Header sin validar', value: 1, colorKey: 'barOtro' },
      ],
      tendenciaTrimetral: [
        { trimestre: '2026Q1', value: 1, isPeak: true },
      ],
      matrizReincidencia: {
        headers: ['Desarrollador', 'Header'],
        rows: [
          { dev: 'Sebastian Contreras', values: [1], criticos: [], recurrentes: [0] },
        ],
      },
      heatmap: [
        { dia: 'Martes', bugs: 1, tag: '↑ Único', colorKey: 'hm1', pct: 100 },
      ],
      heatmapNote: 'Solo 1 registro — sin patrón estadísticamente significativo.',
      concentracion: [
        { dev: 'Sebastian Contreras', pct: 100, colorKey: 'hm1' },
      ],
      concentracionNote: '⚠ Equipo de 1 desarrollador',
      recurrentes: [
        { patron: 'x-rut-usuario sin validar en investment-payment-methods/operations', n: 1, alerta: 'Medio' },
      ],
      recomendaciones: [
        'Implementar validación de x-rut-usuario en middleware antes del próximo sprint',
        'Bug In Progress — verificar fecha de cierre comprometida',
      ],
    },
  },

  phantom: {
    id: 'phantom',
    name: 'Phantom',
    periodo: 'Oct 25',
    p1: {
      totalBugs: 3,
      tasaCierre: '100%',
      kpis: [
        { value: '3',   label: 'Bugs promedio / mes',    sub: '↑ Oct 2025'              },
        { value: '2',   label: 'Desarrolladores activos', sub: 'Top: Bryan Vasquez (2)'  },
        { value: '1',   label: 'Mes analizado',           sub: 'Oct 2025 → Oct 2025'     },
        { value: '67%', label: 'Concentración top dev',   sub: 'B. Vasquez: 2/3 bugs'    },
      ],
      tendenciaMensual: [
        { mes: 'Oct 25', value: 3 },
      ],
      distribucionTipo: [
        { label: 'Código respuesta', value: 2, colorKey: 'barCod' },
        { label: 'Frontend / UI',    value: 1, colorKey: 'barUi'  },
      ],
      rankingDevs: [
        { label: 'Bryan Vasquez', value: 2, colorKey: 'dev1' },
        { label: 'Marcelo Lara',  value: 1, colorKey: 'dev2' },
      ],
      modulos: [
        { label: 'Persona Natural', value: 3, colorKey: 'mod1' },
      ],
      tablaResumen: [
        { dev: 'Bryan Vasquez', bugs: 2, alerta: 'Medio' },
        { dev: 'Marcelo Lara',  bugs: 1, alerta: 'Medio' },
      ],
    },
    p2: {
      kpis: [
        { value: '67%', label: 'bugs en 1 desarrollador', sub: '⚠ Riesgo de concentración' },
        { value: '—',   label: 'variación trimestral',    sub: '1 solo trimestre'            },
        { value: '2',   label: 'patrones identificados',  sub: null                          },
      ],
      filtros: { desarrollador: 'Todos', patron: 'Todos', trimestre: 'Todos' },
      patronesFallo: [
        { label: 'Otro / Sin clasificar',   value: 2, colorKey: 'barOtro' },
        { label: 'Error visual / UI',       value: 1, colorKey: 'barUi'   },
      ],
      tendenciaTrimetral: [
        { trimestre: '2025Q4', value: 3, isPeak: true },
      ],
      matrizReincidencia: {
        headers: ['Desarrollador', 'Header', 'Cód. interno'],
        rows: [
          { dev: 'Bryan Vasquez', values: [2, 0], criticos: [0], recurrentes: [] },
          { dev: 'Marcelo Lara',  values: [0, 1], criticos: [],  recurrentes: [1] },
        ],
      },
      heatmap: [
        { dia: 'Martes', bugs: 2, tag: '↑ Pico',  colorKey: 'hm1', pct: 66  },
        { dia: 'Jueves', bugs: 1, tag: '↓ Menor', colorKey: 'hm5', pct: 33  },
      ],
      heatmapNote: 'Los martes concentran el doble que el promedio.',
      concentracion: [
        { dev: 'Bryan Vasquez', pct: 67, colorKey: 'hm1' },
        { dev: 'Marcelo Lara',  pct: 33, colorKey: 'hm3' },
      ],
      concentracionNote: '⚠ 2 devs concentran el 100%',
      recurrentes: [
        { patron: 'api-cash-account — Header x-trace-id no soporta guión', n: 2, alerta: 'Alto'  },
        { patron: 'acl-payment-initiation — Error 500 sin código de servicio', n: 1, alerta: 'Medio' },
      ],
      recomendaciones: [
        'Agregar soporte de guión en x-trace-id — elimina 67% de bugs del equipo',
        'Revisar validación de headers antes del error ACL en /banks',
        'Monitorear que correcciones no regresen en próximos sprints',
      ],
    },
  },

  rocket: {
    id: 'rocket',
    name: 'Rocket',
    periodo: 'Oct 25',
    p1: {
      totalBugs: 1,
      tasaCierre: '100%',
      kpis: [
        { value: '1',    label: 'Bugs registrados',        sub: '↑ Oct 2025'               },
        { value: '1',    label: 'Desarrolladores activos', sub: 'Top: D. Recabarren (1)'    },
        { value: '1',    label: 'Mes analizado',           sub: 'Oct 2025 → Oct 2025'       },
        { value: '100%', label: 'Concentración top dev',   sub: 'D. Recabarren: 1/1 bug'    },
      ],
      tendenciaMensual: [
        { mes: 'Oct 25', value: 1 },
      ],
      distribucionTipo: [
        { label: 'Frontend / UI', value: 1, colorKey: 'barUi' },
      ],
      rankingDevs: [
        { label: 'Daniela Recabarren', value: 1, colorKey: 'dev1' },
      ],
      modulos: [
        { label: 'Cash Account', value: 1, colorKey: 'mod1' },
      ],
      tablaResumen: [
        { dev: 'Daniela Recabarren', bugs: 1, alerta: 'Normal' },
      ],
    },
    p2: {
      kpis: [
        { value: '100%', label: 'bugs en 1 desarrollador', sub: 'Sin comparativa posible' },
        { value: '—',    label: 'variación trimestral',    sub: '1 solo trimestre'         },
        { value: '1',    label: 'patrón identificado',     sub: null                       },
      ],
      filtros: { desarrollador: 'Todos', patron: 'Todos', trimestre: 'Todos' },
      patronesFallo: [
        { label: 'Discrepancia con Figma', value: 1, colorKey: 'barOtro' },
      ],
      tendenciaTrimetral: [
        { trimestre: '2025Q4', value: 1, isPeak: true },
      ],
      matrizReincidencia: {
        headers: ['Desarrollador', 'Figma'],
        rows: [
          { dev: 'Daniela Recabarren', values: [1], criticos: [], recurrentes: [0] },
        ],
      },
      heatmap: [
        { dia: 'Lunes', bugs: 1, tag: '↑ Único', colorKey: 'hm1', pct: 100 },
      ],
      heatmapNote: 'Solo 1 registro — sin patrón estadísticamente significativo.',
      concentracion: [
        { dev: 'Daniela Recabarren', pct: 100, colorKey: 'hm1' },
      ],
      concentracionNote: 'Equipo de 1 desarrollador',
      recurrentes: [
        { patron: 'Texto "Sin Resultados" no coincide con Figma — módulo Movimientos', n: 1, alerta: 'Normal' },
      ],
      recomendaciones: [
        'Revisión de Figma obligatoria antes de PR — previene discrepancias visuales',
        'Equipo en buen estado de calidad — sin recurrencia en el período',
      ],
    },
  },
}
