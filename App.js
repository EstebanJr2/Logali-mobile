import React from 'react'
import { AuthProvider } from './src/presentation/context/AuthContext'
import { Navigation } from './src/presentation/navigation/Navigation'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
      </NavigationContainer>
    </AuthProvider>
  )
}
