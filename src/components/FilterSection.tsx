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

import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

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
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
}
