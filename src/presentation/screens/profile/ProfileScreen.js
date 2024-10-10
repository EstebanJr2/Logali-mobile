import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'

const ProfileScreen = () => {
  const { state, signOut } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      {state.userInfo && (
        <>
        <Text>{`Name: ${state.userInfo.givenName.toUpperCase()}`}</Text>
        <Text>{`LastName: ${state.userInfo.familyName.toUpperCase()}`}</Text>
        <Text>{`Username: ${state.userInfo.username.toUpperCase()}`}</Text>
        <Text>{`E-Mail: ${state.userInfo.email}`}</Text>
        </>
      )}
      <Button onPress={signOut} title={'Sign out'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-evenly',
  },
})

export { ProfileScreen }
