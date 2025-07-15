import { useEffect, useState } from "react";
import MachineCard from "../components/MachineCard";
import { getMachines } from "../services/machineService";
import type { Machine, Technician } from "../data/machines";

import FilterSection from "../components/FilterSection";

import { Stack } from "@mui/material";
import eventBus from "../../eventBus";
import Loading from "../components/Loading";

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

  const [technicianOptions, setTechnicianOptions] = useState<Technician[]>([]);

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
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    fetchMachines();
  }, []);

  useEffect(() => {
    const locations = Array.from(
      new Set(machines.map((machine) => machine.location))
    ).filter((loc) => loc !== null);

    const technicianMap = new Map<String, Technician>();

    machines.forEach((machine) => {
      const tech = machine.technician;
      if (tech?.email && tech.email.trim() !== "") {
        technicianMap.set(tech.email, tech);
      }
    });

    const technicians = Array.from(technicianMap.values());

    setLocationOptions(locations);

    setTechnicianOptions(technicians);
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
      machine.technician?.name
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

  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        {/* <p className="m-4">Cargando máquinas...</p> */}
        <Loading
          styles={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  if (error)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        <p className="text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="mx-4 gap-4">
      <Stack sx={{ mb: 2 }}>
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

      <div className="gap-4 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedMachines.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            locationOptions={locationOptions}
            technicianOptions={technicianOptions}
          />
        ))}
      </div>
    </div>
  );
}
