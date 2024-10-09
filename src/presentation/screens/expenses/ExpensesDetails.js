import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ExpenseDetails = ({ route }) => {
  const { expense } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles del Gasto</Text>

      <Text style={styles.label}>Fecha:</Text>
      <Text style={styles.detail}>{expense.fecha}</Text>

      <Text style={styles.label}>Hora:</Text>
      <Text style={styles.detail}>{expense.hora}</Text>

      <Text style={styles.label}>Tipo de Gastos:</Text>
      <Text style={styles.detail}>{expense.tipoGastos}</Text>

      <Text style={styles.label}>Costos:</Text>
      <Text style={styles.detail}>${expense.costos}</Text>

      <Text style={styles.label}>Sitio:</Text>
      <Text style={styles.detail}>{expense.sitio}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.detail}>{expense.descripcion}</Text>

      <Text style={styles.label}>Localización:</Text>
      <Text style={styles.detail}>{expense.localizacion}</Text>

      <Text style={styles.label}>Comprobantes:</Text>
      <View style={styles.imageContainer}>
        {expense.comprobantes.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.imagePreview} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
});

export default ExpenseDetails;
