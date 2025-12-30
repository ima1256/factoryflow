import { Modal, Box, IconButton, Fade, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

const style = {
  height: "80vh",
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
  // dentro de MachineModal
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.focus(); // ponemos el foco en el contenedor scrollable
    }
  }, [open]);

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
          <Box
            ref={scrollRef}
            tabIndex={-1} // necesario para que pueda recibir foco
            className={shake ? "shake" : ""}
            sx={style}
          >
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
