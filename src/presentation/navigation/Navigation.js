import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'
import { ProfileScreen } from '../screens/ProfileScreen'
import { SignInScreen } from '../screens/SignInScreen'
import { ManagerScreen } from '../screens/ManagerScreen'
import { ClientScreen } from '../screens/ClientScreen'
import ExpensesScreen from '../screens/expenses/ExpensesScreen'
import FormExpenses from '../screens/expenses/ExpensesForm'
import ExpenseDetails from '../screens/expenses/ExpensesDetails'


const NativeStack = createNativeStackNavigator()

const Navigation = () => {
  const { hasRole, state } = useContext(AuthContext)

  return (
    <NativeStack.Navigator>
  {state.isSignedIn ? (
    <>
      {hasRole('Client') ? (
        <>
          <NativeStack.Screen name={'Client'} component={ClientScreen} />
          <NativeStack.Screen name={'Expenses'} component={ExpensesScreen} />
          <NativeStack.Screen name={'FormExpenses'} component={FormExpenses} /> 
          <NativeStack.Screen name={'ExpenseDetails'} component={ExpenseDetails} /> 

        </>
      ) : (
        <>
          <NativeStack.Screen options={{ headerShown: false }} name={'Manager'} component={ManagerScreen} />
          <NativeStack.Screen name={'Expenses'} component={ExpensesScreen} />
          <NativeStack.Screen name={'FormExpenses'} component={FormExpenses} /> 
          <NativeStack.Screen name={'ExpenseDetails'} component={ExpenseDetails} /> 
        </>
      )}
      <NativeStack.Screen name={'Profile'} component={ProfileScreen} />
    </>
  ) : (
    <NativeStack.Screen
      name={'SignIn'}
      component={SignInScreen}
      options={{ animationTypeForReplace: 'pop' }}
    />
  )}
</NativeStack.Navigator>

  
  )
}

export { Navigation }
