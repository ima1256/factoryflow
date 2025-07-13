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
  IconButton,
  Drawer,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import type { Machine } from "../data/machines";

import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

interface FilterSectionProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  technicianFilter: string;
  setTechnicianFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  locationOptions: string[];
  sortBy: keyof Machine;
  setSortBy: (value: keyof Machine) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (value: "asc" | "desc") => void;
}

export default function FilterSection({
  statusFilter,
  setStatusFilter,
  technicianFilter,
  setTechnicianFilter,
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  locationOptions,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}: FilterSectionProps) {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const renderFilters = (
    <Box
      sx={{
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        flexWrap: "wrap",
        gap: 2,
        px: 1,
        "& > *": {
          minWidth: 200,
        },
      }}
    >
      <FormControl>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          value={statusFilter}
          label="Status"
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 200 }}
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
      />

      <TextField
        label="Filtrar por Máquina"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Autocomplete
        options={locationOptions}
        value={locationFilter}
        onChange={(_, newValue) => setLocationFilter(newValue || "")}
        renderInput={(params) => (
          <TextField {...params} label="Ubicación" variant="outlined" />
        )}
      />

      <FormControl>
        <InputLabel id="sort-by-label">Ordenar por</InputLabel>
        <Select
          labelId="sort-by-label"
          value={sortBy}
          label="Ordenar por"
          sx={{ minWidth: 200 }}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="temperature">Temperatura</MenuItem>
          <MenuItem value="uptimeHours">Horas de uso</MenuItem>
          <MenuItem value="lastMaintenance">Último mantenimiento</MenuItem>
          <MenuItem value="energyConsumption">Consumo energético</MenuItem>
          <MenuItem value="name">Nombre</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="sort-dir-label">Ordernar</InputLabel>
        <Select
          labelId="sort-dir-label"
          value={sortDirection}
          label="Dirección"
          sx={{ minWidth: 200 }}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <MenuItem value="asc">Ascendente</MenuItem>
          <MenuItem value="desc">Descendente</MenuItem>
        </Select>
      </FormControl>

      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => setDrawerOpen(false)}
      >
        Aplicar filtros
      </Button> */}
    </Box>
  );

  return (
    <Box>
      {isTablet ? (
        <>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <FilterListIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <div className="pb-4 pl-4 pr-4">{renderFilters}</div>
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          {renderFilters}
        </Box>
      )}
    </Box>
  );
}
