# Proyecto de Autenticación con Expo

Este proyecto utiliza Expo y `expo-auth-session` para implementar un flujo de autenticación basado en OAuth 2.0. Permite a los usuarios iniciar sesión y obtener información de perfil desde un servidor de autorización llamado Keycloak.

## Requisitos

- Node.js (versión 18 o superior)
- Expo SDK (versión 50.0.17)

## Descripción del Código

El proyecto utiliza un contexto de React para manejar el estado de autenticación. Se define un estado inicial que incluye información sobre si el usuario ha iniciado sesión, así como los tokens de acceso e información del usuario.

El contexto de autenticación se crea mediante `createContext`, proporcionando funciones para iniciar y cerrar sesión, y para verificar roles de usuario.

### Funciones Clave

- **Auto-Discovery**: Se utiliza `useAutoDiscovery` para configurar automáticamente la autenticación a partir de la URL de Keycloak.
- **Solicitud de Autenticación**: Se crea una solicitud de autenticación con el `clientId`, `redirectUri` y los scopes requeridos.
- **Manejo del Estado**: Se utiliza `useReducer` para gestionar el estado de autenticación, permitiendo acciones como iniciar sesión, obtener información del usuario y cerrar sesión.

### Efectos Secundarios

Se implementan efectos para manejar la obtención del token de acceso tras una autenticación exitosa y para obtener información del usuario usando ese token.

## Uso

Envuelve la aplicación en el componente `AuthProvider` para tener acceso al contexto de autenticación. Se Puede usar los estados y funciones proporcionadas para manejar la autenticación en tu aplicación.

## Conclusión

Este proyecto ofrece una base sólida para implementar autenticación en aplicaciones React Native utilizando Expo y Keycloak.
#   L o g a l i - m o b i l e  
 #   L o g a l i - m o b i l e  
 #   L o g a l i - m o b i l e  
 