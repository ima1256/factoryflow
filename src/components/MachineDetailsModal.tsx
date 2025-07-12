import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import type { Machine } from "../data/machines";
import { Stack } from "@mui/material";

type Props = {
  machine: Machine;
  onClose: () => void;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxWidth: 600,
  width: "90%",
  maxHeight: "80vh",
  overflowY: "auto",
};

const Detail = ({ title, content }: { title: string; content: string }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography sx={{ mr: 0.5 }}>
        <strong>
          {title}
          {": "}
        </strong>
      </Typography>
      <Typography>
        <span>{content}</span>
      </Typography>
    </Box>
  );
};

export default function MachineDetailsModal({ machine, onClose }: Props) {
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="machine-details-title"
      aria-describedby="machine-details-description"
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
      }}
    >
      <Box
        sx={{
          ...style,
          position: "relative",
          maxHeight: 500,
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          // WebkitMaskImage:
          //   "linear-gradient(to top, transparent 0%, black 90%, black 100%)",
          // maskImage:
          //   "linear-gradient(to top, transparent 0%, black 90%, black 100%)",
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="Cerrar detalles"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          id="machine-details-title"
          variant="h5"
          component="h2"
          mb={3}
          color="primary.main"
          fontWeight={"bold"}
        >
          {machine.name}
        </Typography>

        <Stack spacing={1}>
          <Detail title="Estado" content={machine.status.toUpperCase()} />
          <Detail title="Temperatura" content={`${machine.temperature}°C`} />
          <Detail
            title="Último mantenimiento"
            content={machine.lastMaintenance}
          />
          <Detail title="Horas de uso" content={`${machine.uptimeHours}h`} />
          <Detail title="Ubicación" content={machine.location} />

          <Detail
            title={"Técnico responsable"}
            content={`${machine.technician.name} ( ${machine.technician.email}, ${machine.technician.email})`}
          />

          {machine.energyConsumption !== undefined && (
            <Detail
              title={"Consumo energético"}
              content={`${machine.energyConsumption} kWh`}
            />
          )}
        </Stack>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>
            Historial de mantenimientos:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 0 }}>
            {machine.maintenanceHistory.map((m, i) => (
              <li key={i}>
                <Typography component="span">
                  <strong>{m.date}:</strong> {m.description}
                </Typography>
              </li>
            ))}
          </Box>
        </Box>

        {machine.errorLogs && machine.errorLogs.length > 0 && (
          <Box mt={3}>
            <Typography
              variant="subtitle1"
              fontWeight="600"
              color="error.main"
              mb={1}
            >
              Logs de errores:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 0 }}>
              {machine.errorLogs.map((log, i) => (
                <li key={i}>
                  <Typography color="error.main">{log.message}</Typography>
                </li>
              ))}
            </Box>
          </Box>
        )}

        {machine.alerts && machine.alerts.length > 0 && (
          <Box mt={3}>
            <Typography
              variant="subtitle1"
              fontWeight="600"
              color="warning.main"
              mb={1}
            >
              Alertas:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 0 }}>
              {machine.alerts.map((alert, i) => (
                <li key={i}>
                  <Typography color="warning.dark">{alert}</Typography>
                </li>
              ))}
            </Box>
          </Box>
        )}
        {/* <Box
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
        /> */}
      </Box>
    </Modal>
  );
}
