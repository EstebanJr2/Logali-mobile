import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { fetchExpenses } from '../../../services/ExpensesService';
import { useNavigation } from '@react-navigation/native';
import { formatDate, formatDate1 } from '../../componets/FormaDate';

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
      <View style={styles.row}>
        <View style={styles.infoContainer1}>
          <Text style={styles.expenseText}>{item.tipoGasto}</Text>
          <Text style={styles.expenseText}>{formatDate1(item.fecha)}</Text>
          <Text style={styles.expenseText}>{formatDate(item.fecha)}</Text>
        </View>
        <Text style={[styles.infoContainer2, styles.expenseTextCosto]}>${item.costo}</Text>
      </View>
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
    backgroundColor: '#e7e2e2be',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer1: {
    padding: 28,
    paddingLeft: 65,
    paddingRight: 60,
    paddingBottom: 47,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 35,
    zIndex: 100,
    marginRight: -33,
  },
  infoContainer2: {
    paddingLeft: 45,
    paddingRight: 10,
    paddingBottom: 57,
    paddingTop: 65,
    backgroundColor: '#0059fff6',
    borderTopRightRadius: 45,
    borderBottomRightRadius: 0,
    marginRight: 40,
  },
  expenseItem: {
    padding: 4,
    borderRadius: 10,
  },
  expenseText: {
    fontSize: 16,
    color: 'black',
  },
  expenseTextCosto: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '900'
  },
});

export default ExpensesScreen;
