import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Menu } from '../componets/Menu'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'; 




const ClientScreen = () => {
  return (
    <View style={styles.container}>
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
      <Text>Holaaaa</Text>
      <Menu />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
})


export { ClientScreen }
