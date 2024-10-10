import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const SitesDetails = ({ route }) => {
  const { sities } = route.params;


  return (
    <ScrollView style={styles.card}>
      <Text style={styles.title}>{sities.Sitio}</Text>
      <Text style={styles.label}>ID: <Text style={styles.value}>{sities.ID}</Text></Text>
      <Text style={styles.label}>Región: <Text style={styles.value}>{sities.Region}</Text></Text>
      <Text style={styles.label}>Departamento: <Text style={styles.value}>{sities.Departamento}</Text></Text>
      <Text style={styles.label}>Municipio: <Text style={styles.value}>{sities.Municipio}</Text></Text>
      <Text style={styles.label}>Equipo RF: <Text style={styles.value}>{sities["Equipo RF"]}</Text></Text>
      <Text style={styles.label}>Ubicación: <Text style={styles.value}>{sities.Ubicacion}</Text></Text>
      <Text style={styles.label}>Latitud: <Text style={styles.value}>{sities.Latitud}</Text></Text>
      <Text style={styles.label}>Longitud: <Text style={styles.value}>{sities.Longitud}</Text></Text>
      <Text style={styles.label}>Altura Estructura: <Text style={styles.value}>{sities["Altura Estructura"]} m</Text></Text>
      <Text style={styles.label}>Propietario: <Text style={styles.value}>{sities["Propietario Estructura"]}</Text></Text>
      <Text style={styles.label}>Tipo Solución: <Text style={styles.value}>{sities["Tipo Solucion Radiante"]}</Text></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SitesDetails;
