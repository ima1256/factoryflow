import { useEffect, useState } from "react";
import MachineCard from "../components/MachineCard";
import { getMachines } from "../services/machineService";
import type { Machine } from "../data/machines";

import FilterSection from "../components/FilterSection";

import { Stack } from "@mui/material";
import eventBus from "../../eventBus";

type SortOrder = "asc" | "desc";

function machineSort<Machine>(
  array: Machine[],
  key: keyof Machine,
  order: SortOrder = "asc"
): Machine[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal == null && bVal != null) return order === "asc" ? 1 : -1;
    if (aVal != null && bVal == null) return order === "asc" ? -1 : 1;
    if (aVal == null && bVal == null) return 0;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return order === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    const aNum =
      typeof aVal === "number" ? aVal : new Date(aVal as any).getTime();

    const bNum =
      typeof bVal === "number" ? bVal : new Date(bVal as any).getTime();
    return order === "asc" ? aNum - bNum : bNum - aNum;
  });
}

export default function Machines() {
  const [machines, setMachines] = useState<Machine[]>([]);

  //filters
  const [statusFilter, setStatusFilter] = useState("");
  const [technicianFilter, setTechnicianFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  //sorting
  const [sortBy, setSortBy] = useState<keyof Machine>("name");
  const [sortDirection, setSortDirection] = useState<SortOrder>("asc");

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

  useEffect(() => {
    const handler = (updatedMachine: Machine) => {
      console.log("Máquina actualizada", updatedMachine);

      setMachines((prevMachines) =>
        prevMachines.map((m) =>
          m.id === updatedMachine.id ? updatedMachine : m
        )
      );
    };

    eventBus.on("updateMachine", handler);

    return () => {
      eventBus.off("updateMachine", handler);
    };
  });

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

  const sortedMachines = machineSort(filteredMachines, sortBy, sortDirection);

  if (loading) return <p className="m-4">Cargando máquinas...</p>;
  if (error) return <p className="m-4 text-red-600">{error}</p>;

  return (
    <div className="ml-4 mr-4 mb-4">
      <Stack sx={{ mb: 4, gap: 4, display: "flex", direction: "column" }}>
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
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </Stack>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedMachines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
}
