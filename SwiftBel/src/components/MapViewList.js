import * as React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { MapStyle } from '../utils/MapJson';
import {
  marker
} from '../assets/index';
navigator.geolocation = require('@react-native-community/geolocation')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
const MapviewList = (props) => {
  const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 })
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    },
      error => { console.log(error) },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    )
  }, [])
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={[styles.map,props.mapStyle]}
        customMapStyle={MapStyle}
        region={{
          latitude: props.position ? props.position.latitude : position.latitude,
          longitude: props.position ? props.position.longitude : position.longitude,
          latitudeDelta:props.latitudeDelta ?props.latitudeDelta: 0.015,
          longitudeDelta:props.longitudeDelta?props.longitudeDelta: 0.0121,
        }}
      >
        <Marker
          draggable
          coordinate={props.position ? props.position : position}
          pinColor="#190F0F"
          onDragEnd={e => {
            props.onDragEnd(e.nativeEvent.coordinate);
          }}
        >
          <Image
          style={{height:40}}
          source={marker}
          resizeMode='contain'
          />
        
        </Marker>
      </MapView>
    </View>
  )
}
export default MapviewList