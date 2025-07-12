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
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

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
}: FilterSectionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const renderFilters = (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
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
    <Box sx={{ mb: 4 }}>
      {isMobile ? (
        <>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <FilterListIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box> */}
            <div className="p-4">{renderFilters}</div>
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
