import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { Machine } from "../data/machines";
import { Stack, Tooltip } from "@mui/material";
import MachineModal from "./MachineModal";

type Props = {
  open: boolean;
  machine: Machine;
  onClose: () => void;
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

export default function MachineDetailsModal({ open, machine, onClose }: Props) {
  return (
    <MachineModal open={open} onClose={onClose}>
      <Tooltip title={machine.name}>
        <Typography
          id="machine-details-title"
          variant="h5"
          component="h2"
          mb={3}
          color="primary.main"
          fontWeight={"bold"}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "85%",
          }}
        >
          {machine.name}
        </Typography>
      </Tooltip>

      {/* <div className="max-w-[70%]">
        <h2
          className="text-xl font-bold text-gray-900 line-clamp-2 break-words"
          title={machine.name}
        >
          {machine.name}
        </h2>
      </div> */}

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
    </MachineModal>
  );
}
