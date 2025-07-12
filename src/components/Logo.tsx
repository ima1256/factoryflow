import { Typography } from "@mui/material";

export default function Logo() {
  return (
    <Typography
      variant="h4"
      component="h1"
      sx={{
        fontWeight: "bold",
        color: "primary.main",
        fontSize: {
          xs: "1.8rem", // móviles
          sm: "2.4rem",
          md: "3rem", // tablets y pantallas medianas
        },
        py: 4,
        textAlign: "center",
      }}
    >
      FactoryFlow
    </Typography>
  );
}
