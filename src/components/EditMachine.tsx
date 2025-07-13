import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { Machine } from "../data/machines";

import MachineModal from "./MachineModal";

import eventBus from "../../eventBus";
import { updateMachine } from "../services/machineService";

type Props = {
  open: boolean;
  machine: Machine;
  onClose: () => void;
};

export default function EditMachine({ open, machine, onClose }: Props) {
  const [localMachine, setLocalMachine] = useState<Machine>(machine);

  useEffect(() => {
    console.log(localMachine.name);
  }, [localMachine]);

  const save = async () => {
    await updateMachine(localMachine);
    eventBus.emit("updateMachine", localMachine);
    onClose();
  };

  return (
    <MachineModal open={open} onClose={onClose}>
      <Stack sx={{ gap: 2 }} className="pt-5">
        <TextField
          label="Name"
          variant="outlined"
          value={localMachine.name}
          onChange={(e) => {
            setLocalMachine({ ...localMachine, name: e.target.value });
          }}
        />

        <button
          onClick={() => save()}
          className="cursor-pointer p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Guardar
        </button>
      </Stack>
    </MachineModal>
  );
}
