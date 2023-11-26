import * as React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { MapStyle } from '../utils/MapJson';
import {
    Mark,
    Mark1,
  marker
} from '../assets/index';
import { Polyline } from 'react-native-svg';
import MapViewDirections from 'react-native-maps-directions';
import { palette } from '../theme';
import { useDispatch } from 'react-redux';
import Constants from '../utils/Constant';
navigator.geolocation = require('@react-native-community/geolocation')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius:15
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius:12
  },
});
const LocationMapView = (props) => {
  const dispatch=useDispatch()
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
          latitudeDelta:props.latitudeDelta ?props.latitudeDelta: 0.415,
          longitudeDelta:props.longitudeDelta?props.longitudeDelta: 0.4121,
        }}
        
      >
        {props?.position && props?.destination? <MapViewDirections
          origin={props?.position}
          destination={props?.destination}
          apikey={"AIzaSyAXYTnkMnSJpNZwfqDGuW0SETTnW7cCaOE"}
          strokeWidth={3}
          strokeColor={palette.pink}
          mode={'DRIVING'}
          resetOnChange={false}
          //optimizeWaypoints={true}
          onReady={(result) => {
           // onChangeTIme(result.duration)
           dispatch({ type: Constants.TYPE.distance, payload: result.distance })
            console.log(result.distance,"result")
          }}
        />:null}
       
        
      
        <Marker
          draggable
          coordinate={props.position ? props.position : position}
          pinColor="#190F0F"
          onDragEnd={e => {
            props.onDragEnd(e.nativeEvent.coordinate);
          }}
        >
          <Image
          source={Mark}
          resizeMode='contain'
          />
        
        </Marker>
        
        <Marker
         
          coordinate={props?.destination||position}
          pinColor="#190F0F"
          onDragEnd={e => {
            props.onDragEnd(e.nativeEvent.coordinate);
          }}
        >
          <Image
          source={Mark1}
          resizeMode='contain'
          />
        </Marker>
      </MapView>
    </View>
  )
}
export default LocationMapView