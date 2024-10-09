import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session'
// eslint-disable-next-line no-unused-vars
import typedefs from '../../../typedefs'

/**
 * @type {typedefs.AuthState}
 */

//----Definición del estado inicial----
const initialState = {
  isSignedIn: false,
  accessToken: null,
  idToken: null,
  userInfo: null,
}

// ---- Crear el contexto de autenticación----
const AuthContext = createContext({
  state: initialState,
  signIn: () => {},
  signOut: () => {},
  /**
   * @param {String} role
   * @returns Boolean
   */
  // eslint-disable-next-line no-unused-vars
  hasRole: (role) => false,
})



// Configuración de autenticación

const AuthProvider = ({ children }) => {
  // @ts-ignore
  //useAutoDiscovery se usa para descubrir automáticamente la configuración de autenticación desde el servidor
  const discovery = useAutoDiscovery(process.env.EXPO_PUBLIC_KEYCLOAK_URL)
  let data = {
    ...discovery,
    authorizationEndpoint: process.env.EXPO_PUBLIC_AUTHORIZATION_EDPOINT
  }
  const redirectUri = makeRedirectUri()
  console.log(redirectUri)

  //solicitud de autenticación
  const [request, response, promptAsync] = useAuthRequest(
    {
      // @ts-ignore
      clientId: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID, 
      clientSecret: process.env.EXPO_PUBLIC_KEYCLOAK_KEY,
      redirectUri: redirectUri,
      scopes: ['openid', 'profile'],
    },
    data
  )

  //Para manejar el estado de autenticación
  const [authState, dispatch] = useReducer((previousState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...previousState,
          isSignedIn: true,
          accessToken: action.payload.access_token,
          idToken: action.payload.id_token,
        }
      case 'USER_INFO':
        return {
          ...previousState,
          userInfo: {
            username: action.payload.preferred_username,
            givenName: action.payload.given_name,
            familyName: action.payload.family_name,
            email: action.payload.email,
            roles: action.payload.roles,
          },
        }
      case 'SIGN_OUT':
        return {
          initialState,
        }
    }
  }, initialState)


  const authContext = useMemo(
    () => ({
      state: authState,
      //inicia el flujo de autenticacion
      signIn: () => {
        promptAsync() 
      },
      signOut: async () => {
        try {
          const idToken = authState.idToken
          await fetch(
            `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/logout?id_token_hint=${idToken}`
          )
          // @ts-ignore
          dispatch({ type: 'SIGN_OUT' })
        } catch (e) {
          console.warn(e)
        }
      },
      /**
       * @param {String} role
       * @returns Boolean
       */
      hasRole: (role) => authState.userInfo?.roles.indexOf(role) != -1,
    }),
    [authState, promptAsync]
  )

  
  // verificamos si la respuesta de la solicitud de autenticación es exitosa.
  // Si es así, llamamos a getToken para intercambiar el código de autorización por un token de acceso.
  useEffect(() => {
    const getToken = async ({ code, codeVerifier, redirectUri }) => {
      try {
        const formData = {
          grant_type: 'authorization_code',
          client_id: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID,
          clientSecret: process.env.EXPO_PUBLIC_KEYCLOAK_KEY,
          code: code,
          code_verifier: codeVerifier,
          redirect_uri: redirectUri,
        }
        const formBody = []
        for (const property in formData) {
          var encodedKey = encodeURIComponent(property)
          var encodedValue = encodeURIComponent(formData[property])
          formBody.push(encodedKey + '=' + encodedValue)
        }

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/token`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody.join('&'),
          }
        )

        console.log("token", response)
        if (response.ok) {
          const payload = await response.json()
          // @ts-ignore
          dispatch({ type: 'SIGN_IN', payload })
        }
      } catch (e) {
        console.warn(e)
      }
    }
    if (response?.type === 'success') {
      const { code } = response.params
      getToken({
        code,
        codeVerifier: request?.codeVerifier,
        redirectUri,
      })
    } else if (response?.type === 'error') {
      console.warn('Authentication error: ', response.error)
    }
  }, [dispatch, redirectUri, request?.codeVerifier, response])

  /**
   * Obtener información del usuario
   */
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const accessToken = authState.accessToken
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/userinfo`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + accessToken,
              Accept: 'application/json',
            },
          }
        )
        if (response.ok) {
          const payload = await response.json()
          // @ts-ignore
          dispatch({ type: 'USER_INFO', payload })
        }
      } catch (e) {
        console.warn(e)
      }
    }
    if (authState.isSignedIn) {
      getUserInfo()
    }
  }, [authState.accessToken, authState.isSignedIn, dispatch])

  return (
    <AuthContext.Provider
      // @ts-ignore
      value={authContext}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }