import { Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import type { Machine, Technician } from "../data/machines";

import MachineModal from "./MachineModal";

import eventBus from "../../eventBus";
import { updateMachine } from "../services/machineService";
import Loading from "./Loading";
import isEqual from "lodash/isEqual";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import MainButton from "./MainButton";

type Props = {
  open: boolean;
  machine: Machine;
  onClose: () => void;
  locationOptions: string[];
  technicianOptions: Technician[];
};

export default function EditMachine({
  open,
  machine,
  onClose,
  locationOptions,
  technicianOptions,
}: Props) {
  const [originalMachine, setOriginalMachine] = useState<Machine>({
    ...machine,
  });

  useEffect(() => {
    setOriginalMachine({ ...machine });
  }, [machine]);

  const [localMachine, setLocalMachine] = useState<Machine>({ ...machine });

  const [loading, setLoading] = useState<boolean>(false);

  const [modalShake, setModalShake] = useState(false);
  const triggerShake = () => {
    setModalShake(true);
    setTimeout(() => {
      setModalShake(false);
    }, 500);
  };

  const [saveShake, setSaveShake] = useState(false);
  const triggerSaveShake = () => {
    setSaveShake(true);
    setTimeout(() => {
      setSaveShake(false);
    }, 500);
  };

  const hasMissingFields =
    !localMachine.name || !localMachine.technician || !localMachine.location;

  const handleModalClose = (interaction = "") => {
    if (interaction == "X") {
      onClose();
      setLocalMachine({ ...machine });
      return;
    }

    if (hasMissingFields) {
      triggerShake();
    } else {
      // does not have missing fields
      const isModified = !isEqual(originalMachine, localMachine);

      if (isModified) {
        //trigger shake of save button
        triggerSaveShake();
      } else onClose();
    }
  };

  const save = async () => {
    const isModified = !isEqual(originalMachine, localMachine);

    if (isModified) {
      setLoading(true);
      await updateMachine(localMachine);

      setTimeout(() => {
        setLoading(false);

        setTimeout(() => {
          eventBus.emit("updateMachine", localMachine);
          onClose();
        }, 300);
      }, 500);
    }
    onClose();
  };

  return (
    <MachineModal open={open} onClose={handleModalClose} shake={modalShake}>
      <Stack sx={{ gap: 2, p: 2, pt: 6, pb: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={localMachine.name}
          onChange={(e) =>
            setLocalMachine({ ...localMachine, name: e.target.value })
          }
        />

        <FormControl>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={localMachine.status}
            label="Status"
            onChange={(e) =>
              setLocalMachine({ ...localMachine, status: e.target.value })
            }
          >
            <MenuItem value="working">Working</MenuItem>
            <MenuItem value="idle">Idle</MenuItem>
            <MenuItem value="error">Error</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          options={locationOptions}
          value={localMachine.location}
          onChange={(_, newValue) =>
            setLocalMachine({ ...localMachine, location: newValue })
          }
          renderInput={(params) => (
            <TextField {...params} label="Location" variant="outlined" />
          )}
        />

        <Autocomplete
          options={technicianOptions}
          value={localMachine.technician}
          getOptionLabel={(option) =>
            `${option.name} - ${option.email} - ${option.phone}`
          }
          onChange={(_, selected) => {
            setLocalMachine({ ...localMachine, technician: selected });
          }}
          renderInput={(params) => <TextField {...params} label="Technician" />}
        />

        {loading ? (
          <div className="p-2">
            <Loading size={15} color="#2563eb" />
          </div>
        ) : (
          <MainButton
            shake={saveShake}
            onClick={() => save()}
            disabled={hasMissingFields}
          >
            Save
          </MainButton>

          // <button
          //   onClick={() => save()}
          //   className="cursor-pointer p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          // >
          //   Guardar
          // </button>
        )}
      </Stack>
    </MachineModal>
  );
}
