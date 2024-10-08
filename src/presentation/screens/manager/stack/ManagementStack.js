import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AttendanceScreen from '../AttendanceScreen';
import ExpensesScreen from '../ExpensesScreen';
import SitesScreen from '../SitesScreen';

const Stack = createNativeStackNavigator();

const ManagementStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
      <Stack.Screen name="Sites" component={SitesScreen} />
    </Stack.Navigator>
  );
};

export default ManagementStack;
