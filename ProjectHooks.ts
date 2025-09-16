import { useTheme } from "@mui/material/styles";

export const useMainColorGradient = (direction = "135deg") => {
  const theme = useTheme();
  return `linear-gradient(${direction}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;
};

export const useMainBackground = (direction = "135deg") => {
  const color = useMainColorGradient(direction);

  return {
    background: color,
  };
};


