// types.ts o donde tengas el tipo Machine
export interface Machine {
  id: number;
  name: string;
  status: "working" | "idle" | "error";
  temperature: number;
  lastMaintenance: string;
  maintenanceHistory: { date: string; description: string }[];
  errorLogs?: string[];
  uptimeHours: number;
  location: string;
  technician: { name: string; email: string; phone: string };
  energyConsumption?: number;
  alerts?: string[];
}

// data/machines.ts
export const machines: Machine[] = [
  {
    id: 1,
    name: "Corte Láser A1",
    status: "working",
    temperature: 68,
    lastMaintenance: "2025-06-10",
    maintenanceHistory: [
      { date: "2025-06-10", description: "Cambio de filtro" },
      { date: "2025-04-15", description: "Revisión general" },
    ],
    errorLogs: ["Error motor eje X - 2025-05-12"],
    uptimeHours: 3450,
    location: "Planta 1 - Línea 3",
    technician: { name: "Ana Pérez", email: "ana@empresa.com", phone: "555-123-456" },
    energyConsumption: 1200,
    alerts: ["Temperatura alta observada hace 3 días"],
  },
  {
    id: 2,
    name: "Prensa Hidráulica B2",
    status: "idle",
    temperature: 44,
    lastMaintenance: "2025-06-28",
    maintenanceHistory: [
      { date: "2025-06-28", description: "Lubricación de cilindros" },
      { date: "2025-03-10", description: "Cambio de válvulas" },
    ],
    uptimeHours: 2800,
    location: "Planta 2 - Línea 1",
    technician: { name: "Luis Gómez", email: "luis@empresa.com", phone: "555-654-321" },
  },
  {
    id: 3,
    name: "Montaje Automático C3",
    status: "error",
    temperature: 80,
    lastMaintenance: "2025-05-20",
    maintenanceHistory: [
      { date: "2025-05-20", description: "Reparación sistema neumático" },
      { date: "2025-02-25", description: "Revisión de sensores" },
    ],
    errorLogs: [
      "Sensor 4 desconectado - 2025-07-05",
      "Error en motor principal - 2025-07-04",
    ],
    uptimeHours: 1500,
    location: "Planta 3 - Línea 2",
    technician: { name: "Marta Ruiz", email: "marta@empresa.com", phone: "555-987-654" },
    energyConsumption: 900,
    alerts: ["Error motor principal crítico"],
  },
  {
    id: 4,
    name: "Robot de Soldadura D4",
    status: "working",
    temperature: 60,
    lastMaintenance: "2025-07-01",
    maintenanceHistory: [
      { date: "2025-07-01", description: "Calibración de brazo robótico" },
      { date: "2025-04-30", description: "Actualización software" },
    ],
    uptimeHours: 4000,
    location: "Planta 1 - Línea 5",
    technician: { name: "Carlos Fernández", email: "carlos@empresa.com", phone: "555-321-987" },
    energyConsumption: 1500,
  },
  {
    id: 5,
    name: "Impresora 3D Industrial E5",
    status: "idle",
    temperature: 35,
    lastMaintenance: "2025-06-15",
    maintenanceHistory: [
      { date: "2025-06-15", description: "Revisión de extrusor" },
      { date: "2025-03-20", description: "Limpieza de plataforma" },
    ],
    uptimeHours: 1200,
    location: "Planta 4 - Línea 1",
    technician: { name: "Laura Sánchez", email: "laura@empresa.com", phone: "555-456-123" },
    energyConsumption: 700,
  },
  {
    id: 6,
    name: "Torno CNC F6",
    status: "error",
    temperature: 85,
    lastMaintenance: "2025-05-30",
    maintenanceHistory: [
      { date: "2025-05-30", description: "Reparación husillo" },
      { date: "2025-02-15", description: "Revisión de software" },
    ],
    errorLogs: [
      "Fallo en eje Z - 2025-07-07",
      "Error de programación - 2025-07-06",
    ],
    uptimeHours: 2300,
    location: "Planta 2 - Línea 4",
    technician: { name: "Sergio Martínez", email: "sergio@empresa.com", phone: "555-789-654" },
    energyConsumption: 1100,
    alerts: ["Fallo en eje Z requiere atención urgente"],
  },
  {
    id: 7,
    name: "Línea de Pintura G7",
    status: "working",
    temperature: 50,
    lastMaintenance: "2025-07-02",
    maintenanceHistory: [
      { date: "2025-07-02", description: "Cambio de boquillas" },
      { date: "2025-04-10", description: "Limpieza sistema de aire" },
    ],
    uptimeHours: 3200,
    location: "Planta 3 - Línea 5",
    technician: { name: "Isabel López", email: "isabel@empresa.com", phone: "555-852-963" },
    energyConsumption: 1300,
  },
  {
    id: 8,
    name: "Cinta Transportadora H8",
    status: "idle",
    temperature: 40,
    lastMaintenance: "2025-06-05",
    maintenanceHistory: [
      { date: "2025-06-05", description: "Revisión de motor" },
      { date: "2025-03-15", description: "Ajuste de poleas" },
    ],
    uptimeHours: 2100,
    location: "Planta 4 - Línea 2",
    technician: { name: "Pedro Navarro", email: "pedro@empresa.com", phone: "555-741-258" },
  },
];
