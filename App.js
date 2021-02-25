import React from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function App() {
  const [region, setRegion] = React.useState({ latitude: 0.0, longitude: 0.0, latitudeDelta: 0.0, longitudeDelta: 0.0 })
  const [userLocation, setUserLocation] = React.useState({})

  React.useEffect(() => {
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
      <StatusBar style="auto" />
    </View>
  );
}

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
