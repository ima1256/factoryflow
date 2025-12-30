import axios from "axios";
import type { Machine } from "../data/machines";

// Puedes guardar la URL base en una variable para facilitar su mantenimiento
//const API_BASE_URL = "https://factoryflow-backend.onrender.com/api"; // ajusta si cambió
const API_BASE_URL = "http://localhost:3000/api"; // ajusta si cambió

export const getMachines = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/machines`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las máquinas", error);
    throw error;
  }
};

export const getMachine = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/machines/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la máquina con id ${id}`, error);
    throw error;
  }
};

export const updateMachine = async (machine: Machine) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/machines/${machine.id}`,
      machine
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la maquina");
  }
};
