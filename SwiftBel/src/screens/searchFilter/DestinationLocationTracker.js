import * as React from 'react';
import { Keyboard, KeyboardAvoidingView,Image, TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
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
import BottomSheet, { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { condo, dropDownArrow, rightBack, Truckmotion, UpArrow } from '../../assets';
import moment from 'moment';
import { searchFilter } from '../../store/actions/Profile.action';
import LocationMapView from '../../components/LocationMapView';
import HorizontalTextKeyValue from '../../components/TextKeyValue/HorizontalTextKeyValue';
import { TextKeyValue } from '../../components';
const LocationDestinationTraker = (props) => {
    const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 })
    const [adress, setadress] = React.useState([])
    const dispatch = useDispatch()
    const sheetRef = React.useRef(null);
    const { startingAdress, destinationAdress, serviceProviderData, finalData } = useSelector(state => state.Profile)
    React.useEffect(() => {
        sheetRef?.current?.present();
    }, [])
    // variables
    const snapPoints = React.useMemo(() => ["40%", "90%"], []);

    // callbacks
    const handleSheetChange = React.useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = React.useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
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
    }
    const handleSnapClose = React.useCallback((index) => {
        sheetRef.current?.close();
    }, []);
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
                rightText={Constants.profile.companylocated}
                centerText={'Destination address'}
                onleftClick={() => props.navigation.goBack()}
            />
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <View style={{height:'61%'}}>
                        <LocationMapView
                            onDragEnd={(e) => console.log(e, "e")}
                            position={startingAdress?.location}
            destination={destinationAdress?.location}
                        />
                        </View>
                      
                     

                        <BottomSheetModal
                            ref={sheetRef}
                          
                            snapPoints={snapPoints}
                            index={0}
                            handleIndicatorStyle={{ backgroundColor: "transparent" }}
                            //   name={TAG}
                           
                            keyboardBehavior="interactive"
                            keyboardBlurBehavior="restore"

                        
                        >
                            <View style={{ flex: 1, width: '95%', alignSelf: 'center' }}>
                                <View style={{flexDirection:'row',paddingLeft:15,paddingBottom:10,borderWidth:1,borderColor:palette.lightGrey,alignSelf:'center',alignItems:'center', width:'95%'}}>
                               <Image 
                               source={Truckmotion}
                               resizeMode='contain'
                               style={{width:75,height:75,}}
                               />
                              <View style={{marginLeft:25,}}>
    <Text style={{fontSize:20,}}>Moving</Text>
    <Text style={{fontSize:16,color:palette.pink,marginTop:5}}>23 March 2023 , 10:00AM</Text>
</View>
                               </View>
                               <View style={{ marginTop:15,paddingBottom:20,borderBottomWidth:1,borderColor:palette.lightGrey}}>
<HorizontalTextKeyValue
title={'From address'}
value={'Vancouver ,BC ,Canada'}

/>
<HorizontalTextKeyValue
title={'To address'}
value={'Richmond,BC,Canada'}

/>
</View>
<View style={{flexDirection:'row',marginTop:15, justifyContent:'space-between',paddingTop:10,paddingBottom:10,paddingRight:15, borderWidth:1,borderColor:palette.lightGrey,alignSelf:'center',alignItems:'center', width:'95%'}}>
    <TextKeyValue
    title={'Type of house'}
    value={'Condo'}
    />
     <Image 
                               source={condo}
                               resizeMode='contain'
                               style={{width:60,height:60,tintColor:palette.pink}}
                               />
</View>
                               </View>
                        </BottomSheetModal>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </View>
    )
};
export default LocationDestinationTraker