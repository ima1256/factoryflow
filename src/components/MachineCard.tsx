import type { Machine } from "../data/machines";
import { useState } from "react";
import MachineDetailsModal from "./MachineDetailsModal";

export default function MachineCard({ machine }: { machine: Machine }) {
  const [open, setOpen] = useState(false);

  const statusColor = {
    working: "bg-green-100 text-green-800",
    idle: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  }[machine.status];

  // Para simular una barra de temperatura visual
  const tempPercent = Math.min(
    Math.max((machine.temperature / 100) * 100, 0),
    100
  );

  return (
    <>
      <div className="bg-white shadow-lg rounded-xl p-5 space-y-3 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold text-gray-900">{machine.name}</h2>

        <div
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}
        >
          {machine.status.toUpperCase()}
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Temp:</span> {machine.temperature}°C
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
            <div
              className={`h-2 rounded-full ${
                machine.status === "error"
                  ? "bg-red-500"
                  : machine.status === "working"
                  ? "bg-green-500"
                  : "bg-yellow-400"
              }`}
              style={{ width: `${tempPercent}%` }}
            />
          </div>
        </div>

        <div className="text-xs text-gray-500 italic">
          Last maintenance:{" "}
          {new Date(machine.lastMaintenance).toLocaleDateString()}
        </div>

        {/* Añadimos botón de acción */}
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver detalles
        </button>
      </div>

      {/* Modal */}
      {open && (
        <MachineDetailsModal machine={machine} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
