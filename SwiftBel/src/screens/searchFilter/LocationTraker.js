import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Image, TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import ProfileHeader from '../../components/Header/ProfileHeader';
import Constants from '../../utils/Constant';
import MapviewList from '../../components/MapViewList';
import Style from './Style'
import MapSearchInput from '../../components/MapSearchInput';
navigator.geolocation = require('@react-native-community/geolocation')
import Geocoder from 'react-native-geocoding';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../../theme';
import LocationSearch from '../../components/LocationSearch';
import MainHeader from '../../components/Header/MainHeader/MainHeader';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Back, Cross, dropDownArrow, rightBack, UpArrow } from '../../assets';
import LocationMapView from '../../components/LocationMapView';
import moment from 'moment';
import { searchFilter } from '../../store/actions/Profile.action';
import CustomBackdrop from '../../components/CommonCustomBackDrop';
const LocationTraker = (props) => {
    const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 })
    const [destination, setDestination] = React.useState({ latitude: 0, longitude: 0 })
    const [adress, setadress] = React.useState([])
    const [destinationAdress, setDestionationAdress] = React.useState([])
    const dispatch = useDispatch()
    const sheetRef = React.useRef(null);
    const destinationsheetRef = React.useRef(null);
    const { type } = props.route.params;
    // variables
    const snapPoints = React.useMemo(() => ["1", "90%"], []);

    // callbacks
    const handleSheetChange = React.useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = React.useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleSnapClose = React.useCallback((index) => {
        sheetRef.current?.close();
    }, []);
    const destinationhandleSnapClose = React.useCallback((index) => {
        destinationsheetRef.current?.close();
    }, []);
    const destinationhandleSnapPress = React.useCallback((index) => {
        destinationsheetRef.current?.snapToIndex(index);
    }, []);

    React.useEffect(() => {
        Geocoder.init("AIzaSyDC8F29YJAnHp6qxyBf7YWFGPzj-c04rRA");
        navigator.geolocation.getCurrentPosition(position => {
            const positions =
            {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            setPosition(positions)
        },
            error => { console.log(error) },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
        )
    }, [])
    const onLocation = (location) => {
        setPosition({
            latitude: location.lat,
            longitude: location.lng
        })
        //    setDestination({latitude: 49.166592, longitude:  -123.133568})

    }
    const onDestinationLocation = (location) => {
        setDestination({
            latitude: location.lat,
            longitude: location.lng
        })


    }
    const addLocation = async () => {
        await Geocoder.from(position.latitude, position.longitude).then(json => {
            var address = json.results[0].address_components
            dispatch({ type: Constants.TYPE.address, payload: address })
            console.log(address, "adress")
        }).catch(error => console.warn(error))
        dispatch({ type: Constants.TYPE.addlocation, payload: position })
        props.navigation.navigate('MobileNumber')
    }
    return (

        <View style={Style.container}>

            <MainHeader
                leftImage={true}
                centerText='Enter Location'
                onleftClick={() => props.navigation.goBack()}
            />

            {/* <TouchableOpacity style={Style.leftCross} onPress={() => navigation.goBack()}>
                            <Image
                                source={Back}
                                resizeMode='contain'
                                style={{ width: 15, height: 15,marginRight:5 }} />

                        </TouchableOpacity>
                        <View style={[Style.headerText]}>
                            <Text style={{ alignSelf: 'center',opacity:12, fontSize: 26, marginBottom: 20 ,fontWeight:'700', position:'absolute',top:60 }}>Enter location</Text>
                        </View> */}


            <KeyboardAvoidingView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <LocationMapView
                            onDragEnd={(e) => console.log(e, "e")}
                            position={position}
                            destination={destination}
                        />
                        <View style={Style.bottomFooter}>
                            <View >
                                <TouchableOpacity onPress={() => handleSnapPress(1)} activeOpacity={0.8} style={Style.LocationDataButton}>
                                    <View style={{ flexDirection: 'row',flex:1}}>
                                        <Image source={UpArrow} style={{ width: 12, height: 15, tintColor: palette.grey, marginRight: 10 }} />
                                        <Text  numberOfLines={1} style={Style.locationDataText}>{adress?.description ?adress?.description: type==="Moving"? "Enter pickup Location":'Enter your address'}</Text>
                                    </View>
                                    <Image source={rightBack}  style={Style.arrowImg}  />
                                </TouchableOpacity>
                            </View>
                           {type==="Moving"? <View >
                                <TouchableOpacity onPress={() => destinationhandleSnapPress(1)} activeOpacity={0.8} style={Style.LocationDataButton}>
                                    <View style={{ flexDirection: 'row',flex:1}}>
                                        <Image source={dropDownArrow} style={{ width: 12, height: 15, tintColor: palette.grey, marginRight: 10 }} />
                                        <Text numberOfLines={1} style={Style.locationDataText}>{destinationAdress?.description || "Enter Dropoff Location"}</Text>
                                    </View>
                                    <Image source={rightBack} style={Style.arrowImg} />
                                </TouchableOpacity>
                            </View>:null}
                            <View >
                                <TouchableOpacity onPress={async () => {
                                    if (adress?.description) {
                                        dispatch({ type: Constants.TYPE.startingAddress, payload: { description: adress, location: position } })
                                        dispatch({ type: Constants.TYPE.destinationAddress, payload: { description: destinationAdress, location: destination } })
                                        props.navigation.navigate('CompanyFilter',{types:type})
                                    }
                                    else {
                                        handleSnapPress(1)
                                    }
                                }} activeOpacity={0.8} style={Style.LocationButton}>
                                    <Text style={Style.LocationText}>{"Continue"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <BottomSheet
                ref={sheetRef}
                enablePanDownToClose
                snapPoints={snapPoints}
                index={-1}
                backdropComponent={CustomBackdrop}
                enableHandlePanningGesture
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                style={{ zIndex: 2 }}
            >
                <View style={{ flex: 1, width: '95%', alignSelf: 'center', }}>
                    <Text style={{ fontSize: 20, marginBottom: 15,marginLeft:5 }}>{type!=="Moving"?"Your address": "Starting Address"}</Text>
                    <LocationSearch
                        placeholder={type==="Moving"? "Where are you moving from?":"Enter your address"}
                        onPress={async (data) => {
                           await handleSnapClose()
                            setadress(data)
                        }}
                        onLocation={(location) => onLocation(location)}
                        listView={{ width: '97%', borderWidth: 1, marginLeft: 5, marginBottom: 10, borderRadius: 15, borderColor: palette.lightGrey, position: 'absolute', marginTop: 55 }}
                    /></View>
            </BottomSheet>
            <BottomSheet
                ref={destinationsheetRef}
                enablePanDownToClose
                snapPoints={snapPoints}
                index={-1}
                backdropComponent={CustomBackdrop}
                // handleIndicatorStyle={{ backgroundColor: "transparent" }}
                enableHandlePanningGesture
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
            >
                <View style={{ flex: 1, width: '95%', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Destination address</Text>
                    <LocationSearch
                        placeholder={"Where are you moving to?"}
                        onPress={(data) => {
                            setDestionationAdress(data)
                            destinationhandleSnapClose()
                        }}
                        onLocation={(location) => onDestinationLocation(location)}
                        listView={{ width: '97%', borderWidth: 1, marginLeft: 5, marginBottom: 10, borderRadius: 15, borderColor: palette.lightGrey, position: 'absolute', marginTop: 55 }}
                    /></View>
            </BottomSheet>
        </View>
    )
};
export default LocationTraker