import * as React from 'react';
import {
  View, Text, StyleSheet, Image, Dimensions, ActivityIndicator,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  Circle,
  PROVIDER_GOOGLE
} from "react-native-maps";
 // remove PROVIDER_GOOGLE import if not using Google Maps
import { MapStyle } from '../../utils/MapJson';
import {
  dot,
  locationTracker,
  MapIcon,
  Mark,
  Mark1,
  marker, userShade
} from '../../assets/index';
navigator.geolocation = require('@react-native-community/geolocation')
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from "react-native-geolocation-service"
import { palette } from '../../theme';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

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
  const [time, setTime] = React.useState('')
  const [loading, setLoading] = React.useState(true);
  const [destination,setDestination]=React.useState(props?.destination||{   latitude: 28.3949,
    longitude: 84.1240,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,})

  const [region, setRegion] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const mapRef = React.useRef(null);
  const watchId = React.useRef(null)

  React.useEffect(()=>{
setDestination(props?.destination)
  },[props?.destination])
  React.useEffect(() => {
    requestPermission();
    return () => {
      if (watchId.current)
        Geolocation.clearWatch(watchId.current)
    }
  }, [])

  React.useEffect(() => {
    if (loading) return;
    mapRef.current?.animateToRegion(region);
    console.log(region)
  }, [region]);
  const requestPermission = async () => {
    if (Platform.OS == "ios") {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      getCurrentLocation();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) getCurrentLocation();
      else {
        alert('notGranted')
      }
    }
  };

  const getCurrentLocation = () => {
    watchId.current = Geolocation.watchPosition(
      (position) => {
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,

        });
      },
      (error) => {
        alert('Unable to locate your location')
      },
      { enableHighAccuracy: true, distanceFilter: 0.01 },
    );
    setLoading(false);
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })
    },
      error => { console.log(error) },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    )
  }, [])

  const onChangeTIme = (time) => {
    props?.onChangeTIme(time)
    console.log(time)
  }
  return (
    <View style={styles.container}>

    { props?.destination&&region?.latitude>0? <MapView
        provider={PROVIDER_GOOGLE}
        style={[styles.map, props?.mapStyle]}
        customMapStyle={MapStyle}
        initialRegion={region}
      >
        <Circle
        
        center={destination?destination:{   latitude: 28.3949,
          longitude: 84.1240,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,}}
        radius={200}
        strokeWidth={1}
        strokeColor={"#D81159"}
        fillColor={'rgba(216, 17, 89, 0.05)'}

        />
       {destination? <MapViewDirections
          origin={region}
          destination={destination}
          apikey={"AIzaSyAXYTnkMnSJpNZwfqDGuW0SETTnW7cCaOE"}
          strokeWidth={3}
          strokeColor={palette.pink}
          mode={'DRIVING'}
          resetOnChange={false}
          //optimizeWaypoints={true}
          onReady={(result) => {
            onChangeTIme(result.duration)
            console.log(result)
          }}
        />:null}
        {[{
          latLong: { latitude: region.latitude, longitude: region.longitude },
          title: 'You Current Location',
          description: 'This is your location'
        }].map((marker, index) => (
          <Marker.Animated
            key={index}
            coordinate={marker.latLong}
            title={marker.title}
            description={marker.description}

          >
            <Image
              style={{ height: 40 }}
              source={Mark1}
              resizeMode='contain'
            />
            <Image
              style={{ height: 10, position: 'absolute', right: 63, top: 15 }}
              source={dot}
              resizeMode='contain'
            />

          </Marker.Animated>
        ))}
      {  <Marker
          coordinate={destination}
          pinColor="#190F0F"
          onDragEnd={e => {
            props?.onDragEnd(e.nativeEvent.coordinate);
          }}
        >

          <Image
            style={{ height: 40 }}
            source={Mark}
            resizeMode='contain'
          />

        </Marker>}
      </MapView>:null}
      <TouchableOpacity onPress={() => Platform.OS === 'ios' ? Linking.openURL(`maps://app?saddr=${region.latitude}+${region.longitude}&daddr=${destination.latitude}+${destination.longitude}`) : Linking.openURL(`geo://app?saddr=${region.latitude}+${region.longitude}&daddr=${destination.latitude}+${destination.longitude}`)} style={{ marginBottom: 10, zIndex: 1, alignSelf: 'flex-end', marginRight: 30 }}>
        <Image
          source={MapIcon}
          style={{ height: 70, width: 70 }}
        />
      </TouchableOpacity>
    </View>
  )
}
export default MapviewList