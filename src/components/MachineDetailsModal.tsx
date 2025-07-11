import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

import type { Machine } from "../data/machines";

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
      <Box sx={style}>
        {/* <IconButton
          onClick={onClose}
          aria-label="Cerrar detalles"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton> */}

        <Typography
          id="machine-details-title"
          variant="h5"
          component="h2"
          mb={2}
        >
          {machine.name} - Detalles
        </Typography>

        <Typography>
          <strong>Estado:</strong> {machine.status.toUpperCase()}
        </Typography>
        <Typography>
          <strong>Temperatura:</strong> {machine.temperature}°C
        </Typography>
        <Typography>
          <strong>Último mantenimiento:</strong> {machine.lastMaintenance}
        </Typography>
        <Typography>
          <strong>Horas de uso:</strong> {machine.uptimeHours}h
        </Typography>
        <Typography>
          <strong>Ubicación:</strong> {machine.location}
        </Typography>
        <Typography>
          <strong>Técnico responsable:</strong> {machine.technician.name} (
          {machine.technician.email}, {machine.technician.phone})
        </Typography>

        {machine.energyConsumption !== undefined && (
          <Typography>
            <strong>Consumo energético:</strong> {machine.energyConsumption} kWh
          </Typography>
        )}

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
                  <Typography color="error.main">{log}</Typography>
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
      </Box>
    </Modal>
  );
}
