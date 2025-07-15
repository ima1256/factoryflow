import { Modal, Box, IconButton, Fade, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { ReactNode } from "react";

const style = {
  // position: "absolute" as const,
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // position: 'relative',

  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

type Props = {
  open: boolean;
  onClose: (reason?: string) => void;
  children?: ReactNode;
  shake?: boolean;
};

export default function MachineModal({
  open,
  onClose,
  children,
  shake = false,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      aria-labelledby="machine-details-title"
      aria-describedby="machine-details-description"
      disableEscapeKeyDown
      slotProps={{
        backdrop: {
          timeout: 300,
          style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
        },
      }}
    >
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 600,
            width: "90%",
          }}
        >
          <Box className={shake ? "shake" : ""} sx={style}>
            <IconButton
              onClick={() => onClose("X")}
              aria-label="Cerrar detalles"
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            {children}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

{
  /* <Box
          sx={{
            position: "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            pointerEvents: "none",
            background: "linear-gradient(to top, white, transparent)",
            zIndex: 1,
          }}
        /> */
}
