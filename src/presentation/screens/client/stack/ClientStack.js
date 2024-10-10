import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AttendanceScreen from '../../attendance/AttendanceScreen';
import ExpensesScreen from '../../expenses/ExpensesScreen';
import SitesScreen from '../../Sites/SitesScreen';
import FormExpenses from '../../expenses/ExpensesForm';
import ExpenseDetails from '../../expenses/ExpensesDetails';
import SitesDetails from '../../Sites/SitesDetails';
import AttendanceDetails from '../../attendance/AttendanceDetails';
import AttendanceForm from '../../attendance/AttendanceForm';
import {ProfileScreen}  from '../../profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const ClientStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="AttendanceDetails" component={AttendanceDetails} />
      <Stack.Screen name="AttendanceForm" component={AttendanceForm} />

      <Stack.Screen name="Expenses" component={ExpensesScreen} />
      <Stack.Screen name="FormExpenses" component={FormExpenses} />
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />

      <Stack.Screen name="Sites" component={SitesScreen} />
      <Stack.Screen name="SitesDetails" component={SitesDetails} />

      <Stack.Screen name="profile" component={ProfileScreen} />

    </Stack.Navigator>
  );
};

export default ClientStack;
