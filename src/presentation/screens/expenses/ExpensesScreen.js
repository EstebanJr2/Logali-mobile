import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { fetchExpenses } from '../../../services/ExpensesService'; 
import { useNavigation } from '@react-navigation/native';

const ExpensesScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const expensesData = await fetchExpenses();
        console.log('Expenses Data:', expensesData); 
        setExpenses(expensesData);
      } catch (error) {
        console.error('Error loading expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };
    

    loadExpenses();
  }, []);

  const renderExpenseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.expenseItem}
      onPress={() => navigation.navigate('ExpenseDetails', { expense: item })}
    >
      <Text style={styles.expenseText}>Tipo: {item.tipoGastos}</Text>
      <Text style={styles.expenseText}>Fecha: {item.fecha}</Text>
      <Text style={styles.expenseText}>Costo: ${item.costos}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <Text>Cargando gastos...</Text>;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Agregar Gasto"
        onPress={() => navigation.navigate('FormExpenses')} 
      />
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  expenseItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseText: {
    fontSize: 16,
    color: 'black'
  },
});

export default ExpensesScreen;
