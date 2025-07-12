import { Typography, Box } from "@mui/material";

export default function Logo() {
  return (
    <Typography
      variant="h4"
      component="h1"
      sx={{
        fontWeight: "bold",

        fontSize: {
          //   xs: "1.8rem", // móviles #8d51ff
          sm: "2.4rem",
          md: "3rem", // tablets y pantallas medianas
        },
        fontFamily: "Rubik",
        py: 4,
        textAlign: "center",
      }}
    >
      <Box component="span" sx={{ color: "#8d51ff", fontWeight: "bold" }}>
        Fact
      </Box>
      <Box component="span" sx={{ color: "#36b6ff", fontWeight: "bold" }}>
        ory
      </Box>
      <Box component="span" sx={{ color: "#1a01ab", fontWeight: "bold" }}>
        Flow
      </Box>
    </Typography>
  );
}
