import MachineCard from "../components/MachineCard";
import { machines } from "../data/machines";

export default function Machines() {
  return (
    <div className="m-3 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {machines.map((machine) => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  );
}
