import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ManagementStack from './stack/ManagementStack';
import Icon from 'react-native-vector-icons/FontAwesome'; 


const ManagerScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ManagementStack />

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Attendance')}>
          <Icon name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.navText}>Asistencias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Expenses')}>
          <Icon name="money" size={24} color="#F44336" />
          <Text style={styles.navText}>Gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Sites')}>
          <Icon name="map-marker" size={24} color="#2196F3" />
          <Text style={styles.navText}>Sitios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#333',
  },
});

export { ManagerScreen };
