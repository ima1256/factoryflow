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

// import MainButton from "./MainButton";

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
        label="Technician"
        variant="outlined"
        value={technicianFilter}
        onChange={(e) => setTechnicianFilter(e.target.value)}
      />

      <TextField
        label="Name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Autocomplete
        options={locationOptions}
        value={locationFilter}
        onChange={(_, newValue) => setLocationFilter(newValue || "")}
        renderInput={(params) => (
          <TextField {...params} label="Location" variant="outlined" />
        )}
      />

      <FormControl>
        <InputLabel id="sort-by-label">Order by</InputLabel>
        <Select
          labelId="sort-by-label"
          value={sortBy}
          label="Order by"
          sx={{ minWidth: 200 }}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="temperature">Temperature</MenuItem>
          <MenuItem value="uptimeHours">Uptime hours</MenuItem>
          <MenuItem value="lastMaintenance">Last maintenance</MenuItem>
          <MenuItem value="energyConsumption">Energy consumption</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="sort-dir-label">Direction</InputLabel>
        <Select
          labelId="sort-dir-label"
          value={sortDirection}
          label="Direction"
          sx={{ minWidth: 200 }}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <MenuItem value="asc">Ascent</MenuItem>
          <MenuItem value="desc">Descent</MenuItem>
        </Select>
      </FormControl>

      {/* <MainButton /> */}

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
