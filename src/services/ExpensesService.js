import axios from 'axios';

const API_URL = 'http://localhost:8080'; 

export const fetchSitios = async () => {
  try {
    const response = await axios.get(`${API_URL}/sitios`)
    return response.data
  } catch (error) {
    console.error('Error fetching sitios:', error);
    throw error;
  }
};

export const fetchTipoGastos = async () => {
  try {
    const response = await axios.get(`${API_URL}/tiposGastos`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching tipos de gastos:', error);
    throw error;
  }
};
export const fetchGastos = async () => {
  try {
    const response = await axios.get(`${API_URL}/Gastos`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching tipos de gastos:', error);
    throw error;
  }
};



export const createGasto = async (gastoData) => {
  try {
    const response = await axios.post(`${API_URL}/gastos`, gastoData);
    return response.data; 
  } catch (error) {
    console.error('Error creating gasto:', error);
    throw error;
  }
};

// Simulated data
const simulatedExpenses = [
  {
    id: 1,
    tipoGastos: 'Comida',
    fecha: '2024-10-01',
    hora: '12:00 PM',
    costos: 20,
    sitio: 'Restaurante A',
    descripcion: 'Almuerzo con amigos',
    localizacion: 'Ciudad',
    comprobantes: [],
  },
  {
    id: 2,
    tipoGastos: 'Transporte',
    fecha: '2024-10-02',
    hora: '08:00 AM',
    costos: 15,
    sitio: 'Taxi',
    descripcion: 'Viaje al trabajo',
    localizacion: 'Ciudad',
    comprobantes: [],
  },
];

export const fetchExpenses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(simulatedExpenses);
    }, 1000); 
  });
};