// types.ts o donde tengas el tipo Machine
export interface Machine {
  id: string;
  name: string;
  status: "working" | "idle" | "error";
  temperature: number;
  lastMaintenance: string;
  maintenanceHistory: { date: string; description: string }[];
  errorLogs: { timestamp: string; message: string }[];
  uptimeHours: number;
  location: string;
  technician: { name: string; email: string; phone: string };
  energyConsumption?: number;
  alerts?: string[];
}

