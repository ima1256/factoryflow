import type { Machine, Technician } from "../data/machines";
import { useState } from "react";
import MachineDetailsModal from "./MachineDetailsModal";
import EditMachine from "./EditMachine";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import MainButton from "./MainButton";

export default function MachineCard({
  machine,
  locationOptions,
  technicianOptions,
}: {
  machine: Machine;
  locationOptions: string[];
  technicianOptions: Technician[];
}) {
  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

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
      <div className=" relative bg-white shadow-lg rounded-xl p-5 space-y-3 hover:shadow-xl transition-shadow duration-300">
        <div className="max-w-[80%]">
          <h2
            className="text-xl font-bold text-gray-900 truncate "
            title={machine.name}
          >
            {machine.name}
          </h2>
        </div>

        {/* <div className="max-w-md">
          <h2
            className="text-xl font-bold line-clamp-2 max-w-full"
            title={longText}
          >
            {longText}
          </h2>
        </div> */}

        {/* break-words min-h-[3.5rem]  */}

        <IconButton
          onClick={() => setEditOpen(true)}
          aria-label="Editar Máquina"
          sx={{ position: "absolute", top: 18, right: 14 }}
        >
          <SettingsIcon />
        </IconButton>
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
        <MainButton onClick={() => setOpen(true)}>Details</MainButton>
        {/* <button className="cursor-pointer w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Guardar
        </button> */}
      </div>

      {/* Modal */}

      <MachineDetailsModal
        machine={machine}
        onClose={() => setOpen(false)}
        open={open}
      />

      <EditMachine
        machine={machine}
        onClose={() => setEditOpen(false)}
        open={editOpen}
        locationOptions={locationOptions}
        technicianOptions={technicianOptions}
      />
    </>
  );
}
