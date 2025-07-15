//import React from "react";
import { Skeleton, Box } from "@mui/material";
import { keyframes } from "@emotion/react"; // Required for custom keyframes with MUI's `sx`
//import { useMainBackground } from "../../ProjectHooks";

// Define a custom keyframe that includes scale and opacity
const scalePulse = keyframes`
  0%, 70% {
    transform: scale(1);
    opacity: 0.6;
  }
  35% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
`;

const Loading = ({ size = 18, styles = {}, color = "#1902ab" }) => {
  //const background = useMainBackground();

  return (
    <Box
      sx={styles}
      display="flex"
      gap={2}
      alignItems="center"
      justifyContent="center"
    >
      {[0, 1, 2].map((dot) => (
        <Skeleton
          key={dot}
          variant="circular"
          width={size}
          height={size}
          sx={{
            animation: `${scalePulse} 1.3s ease-in-out ${dot * 0.2}s infinite`,
            bgcolor: color, //"#3ab4ff", // background,
            opacity: 1,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      ))}
    </Box>
  );
};

export default Loading;
