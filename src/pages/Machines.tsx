import MachineCard from "../components/MachineCard";
import { machines } from "../data/machines";
import { useState, useEffect } from "react";

import { getMachines } from "../services/machineService";

export default function Machines() {
  const [statusFilter, setStatusFilter] = useState("");
  const [technicianFilter, setTechnicianFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMachines = machines.filter((machine) => {
    const matchesStatus = !statusFilter || machine.status === statusFilter;
    const matchesTechnician =
      !technicianFilter ||
      machine.technician.name
        .toLowerCase()
        .includes(technicianFilter.toLowerCase());
    const matchesSearch = machine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesTechnician && matchesSearch;
  });

  return (
    <div>
      {/* Filtros */}
      <div className="m-4 flex flex-col md:flex-row gap-3">
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="working">Working</option>
          <option value="idle">Idle</option>
          <option value="error">Error</option>
        </select>

        <input
          type="text"
          placeholder="Filtrar por técnico"
          className="border p-2 rounded"
          value={technicianFilter}
          onChange={(e) => setTechnicianFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Buscar por nombre"
          className="border p-2 rounded flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="m-3 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
}
