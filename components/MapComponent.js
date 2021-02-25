import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { StyleSheet, View, Dimensions } from 'react-native';

const MapComponent = () => {
  const [region, setRegion] = useState({ latitude: 0.0, longitude: 0.0, latitudeDelta: 0.0, longitudeDelta: 0.0 })
  const [userLocation, setUserLocation] = useState({})

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        Alert.alert('No permission to acces location');
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        });
      }
    };
    getLocation();
    setRegion({});
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={userLocation}
      >
        <MapView.Marker
          coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});


export default MapComponent;