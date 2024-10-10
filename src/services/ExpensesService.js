
const API_URL = 'http://192.168.1.7:3000'; 


export const fetchExpenses = async () => {
  try {
    const response = await fetch(`${API_URL}/expenses`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error; 
  }
};


export const saveGastos = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, formData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error saving gastos:', error);
    throw error;
  }
};




// Simulated data
// const simulatedExpenses = [
//   {
//     id: 1,
//     tipoGastos: 'Comida',
//     fecha: '2024-10-01',
//     hora: '12:00 PM',
//     costos: 20,
//     sitio: 'Restaurante A',
//     descripcion: 'Almuerzo con amigos',
//     localizacion: 'Ciudad',
//     comprobantes: [],
//   },
//   {
//     id: 2,
//     tipoGastos: 'Transporte',
//     fecha: '2024-10-02',
//     hora: '08:00 AM',
//     costos: 15,
//     sitio: 'Taxi',
//     descripcion: 'Viaje al trabajo',
//     localizacion: 'Ciudad',
//     comprobantes: [],
//   },
// ];

// export const fetchExpenses = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(simulatedExpenses);
//     }, 1000); 
//   });
// };