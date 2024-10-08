import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttendanceScreen = () => {
  
  return (
    <View style={styles.container}>
      <Text>Asistencias</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AttendanceScreen;
