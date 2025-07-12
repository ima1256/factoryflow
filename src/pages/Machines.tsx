import { useEffect, useState } from "react";
import MachineCard from "../components/MachineCard";
import { getMachines } from "../services/machineService";
import type { Machine } from "../data/machines";

import FilterSection from "../components/FilterSection";

export default function Machines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [technicianFilter, setTechnicianFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getMachines();

        setMachines(data);
      } catch (err: any) {
        console.error("Error al obtener las máquinas", err);
        setError("Error al cargar las máquinas");
      } finally {
        setLoading(false);
      }
    };
    fetchMachines();
  }, []);

  useEffect(() => {
    const locations = Array.from(
      new Set(machines.map((machine) => machine.location))
    );
    setLocationOptions(locations);
  }, [machines]);

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

    const matchesLocation =
      !locationFilter || machine.location === locationFilter;

    return (
      matchesStatus && matchesTechnician && matchesSearch && matchesLocation
    );
  });

  if (loading) return <p className="m-4">Cargando máquinas...</p>;
  if (error) return <p className="m-4 text-red-600">{error}</p>;

  return (
    <div className="ml-4 mr-4 mb-4">
      <FilterSection
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        technicianFilter={technicianFilter}
        setTechnicianFilter={setTechnicianFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        locationOptions={locationOptions}
      />
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredMachines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
}
