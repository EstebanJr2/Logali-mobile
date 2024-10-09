import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function LocationC({ onLocationSelect }) {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    _getLocation();
  }, []);

  const _getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission not granted');
      setErrorMessage('Permission not granted');
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync();
    setLocation(userLocation.coords);
    
    if (onLocationSelect) {
      onLocationSelect(userLocation.coords);
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <View style={styles.mapContainer}>
          {location && (
            <>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title="Tu ubicación"
                  description="Aquí estás"
                />
              </MapView>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
