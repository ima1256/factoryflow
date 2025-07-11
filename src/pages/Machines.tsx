import { useEffect, useState } from "react";
import MachineCard from "../components/MachineCard";
import { getMachines } from "../services/machineService";
import type { Machine } from "../data/machines";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  TextField,
  Autocomplete,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Machines() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <div>
      {/* filtros (puedes usar Material UI si quieres) */}
      <Box sx={{ m: 4 }} className="flex justify-centerw-[100%]">
        {isMobile ? (
          <FilterListIcon sx={{ fontSize: 30, cursor: "pointer" }} />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              flexWrap: "wrap",
              // background: "purple",
              gap: 2,
              alignItems: "flex-start",
              width: "fit-content",
            }}
          >
            <FormControl>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={statusFilter}
                label="Status"
                sx={{ minWidth: 200, flex: 1 }}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="working">Working</MenuItem>
                <MenuItem value="idle">Idle</MenuItem>
                <MenuItem value="error">Error</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Filtrar por Técnico"
              variant="outlined"
              value={technicianFilter}
              onChange={(e) => setTechnicianFilter(e.target.value)}
              sx={{ minWidth: 200, flex: 1 }}
            />

            <TextField
              label="Filtrar por Máquina"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200, flex: 1 }}
            />

            <Autocomplete
              options={locationOptions}
              value={locationFilter}
              onChange={(_, newValue) => setLocationFilter(newValue || "")}
              renderInput={(params) => (
                <TextField {...params} label="Ubicación" variant="outlined" />
              )}
              sx={{ minWidth: 200, flex: 1 }}
            />
          </Box>
        )}
      </Box>
      <div className="m-3 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredMachines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
}
