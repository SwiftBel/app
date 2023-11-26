import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { MapStyle, MapStyle2 } from '../utils/MapJson';
import {
  Mark,
  Mark1,
  marker
} from '../assets/index';
import { Polyline } from 'react-native-svg';
import MapViewDirections from 'react-native-maps-directions';
import { palette } from '../theme';
navigator.geolocation = require('@react-native-community/geolocation')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10
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
        style={[styles.map, props.mapStyle]}
        customMapStyle={MapStyle2}
maxZoomLevel={12}
minZoomLevel={11}
        region={{
          latitude: props.position ? props.position.latitude : position.latitude,
          longitude: props.position ? props.position.longitude : position.longitude,
          latitudeDelta: props.latitudeDelta ? props.latitudeDelta : 0.515,
          longitudeDelta: props.longitudeDelta ? props.longitudeDelta : 0.5121,
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
            // style={{height:40,tintColor:palette.pink}}
            source={Mark}
            resizeMode='contain'
          />

        </Marker>

        {position? <MapView.Circle
          center={position?position:{   latitude: 28.3949,
            longitude: 84.1240,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,}}
          radius={5000}
           strokeWidth={1}
              strokeColor={palette.babyPink}
              fillColor={'rgba(217,20,110,0.14)'}

        />:null}
      </MapView>
    </View>
  )
}
export default MapviewList