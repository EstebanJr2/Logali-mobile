import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'
import { SignInScreen } from '../screens/SignInScreen'
import { ManagerScreen } from '../screens/manager/ManagerScreen'
import { ClientScreen } from '../screens/client/ClientScreen'


const NativeStack = createNativeStackNavigator()

const Navigation = () => {
  const { hasRole, state } = useContext(AuthContext)

  return (
    <NativeStack.Navigator>
  {state.isSignedIn ? (
    <>
      {hasRole('Client') ? (
        <>
          <NativeStack.Screen options={{ headerShown: false }} name={'Client'} component={ClientScreen} />
        </>
      ) : (
        <>
          <NativeStack.Screen options={{ headerShown: false }} name={'Manager'} component={ManagerScreen} />
        </>
      )}
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
