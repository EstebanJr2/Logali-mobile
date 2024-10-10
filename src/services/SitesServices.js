import axios from "axios";


const baseUrl = 'http://192.168.1.7:3000'

export const getAllSites = async () => {
    try {
        const response = await axios.get(`${baseUrl}/sites`)
        return response;
        
    } catch (error) {
        console.error('Error fetching sitios:', error)
        throw error;
    }
}

export const fetchSitios = async () => {
    try {
      const response = await fetch(`${API_URL}/sitios`, {
        method: 'POST',
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
      console.error('Error fetching sitios:', error);
      throw error; 
    }
  };
  

// Mock data
const mockGetSites = [
    {
        "ID": "RF-BL-1",
        "Sitio": "AMZ.Atacuari",
        "Region": "Centro Oriente",
        "Departamento": "Amazonas",
        "Municipio": "Puerto Nariño",
        "Equipo RF": 8,
        "Market": "Amazonas Satelital",
        "DANE Municipio": 91540,
        "Centro Poblado": "Puerto Nariño",
        "DANE CP": 0,
        "Zona": "Rural",
        "Objetivo Cobertura": "Rural",
        "Localidad (CRC)": "No Aplica",
        "Ubicacion": "Lote Contiguo al lote de telecom, San Juan de Atacuari, Puerto Nariño",
        "Latitud": -3.806389,
        "Longitud": -70.668806,
        "Estructura": "Torre",
        "Detalle Estructura": "Torre",
        "Altura Estructura": 100,
        "Propietario Estructura": "Claro",
        "Nombre Cosite": "",
        "Tipo Solucion Radiante": "Arrendamiento",
        "Foco Servicio": "C1-3-R4-AMZ-ST-1",
        "Origen SD": "Anillo_Amazonas Satelital"
    },
    {
        "ID": "RF-BL-35",
        "Sitio": "AMZ.El Encanto",
        "Region": "Centro Oriente",
        "Departamento": "Amazonas",
        "Municipio": "El Encanto",
        "Equipo RF": 8,
        "Market": "Amazonas Satelital",
        "DANE Municipio": 91263,
        "Centro Poblado": "El Encanto",
        "DANE CP": 0,
        "Zona": "Rural",
        "Objetivo Cobertura": "Rural",
        "Localidad (CRC)": "No Aplica",
        "Ubicacion": "COMANDO BASE NAVAL ARC, EL ENCANTO / PUESTO FLUVIAL AVANZADO 63 ARMADA NACIONAL EL ENCANTO",
        "Latitud": -1.749777,
        "Longitud": -73.208834,
        "Estructura": "Torre",
        "Detalle Estructura": "Torre",
        "Altura Estructura": 50,
        "Propietario Estructura": "Claro",
        "Nombre Cosite": "",
        "Tipo Solucion Radiante": "Arrendamiento",
        "Foco Servicio": "C1-3-R4-AMZ-ST-10623",
        "Origen SD": "Anillo_Amazonas Satelital"
    }
]


// export const fetchSites = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(mockGetSites);
//       }, 1000); 
//     });
//   };