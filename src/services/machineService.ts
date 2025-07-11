import axios from "axios";

// Puedes guardar la URL base en una variable para facilitar su mantenimiento
//const API_BASE_URL = "https://factoryflow-backend.onrender.com/api"; // ajusta si cambió
const API_BASE_URL="http://localhost:3000/api"; // ajusta si cambió

export const getMachines = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/machines`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las máquinas", error);
    throw error;
  }
};
