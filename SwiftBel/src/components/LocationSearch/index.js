import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, { useEffect, useRef, useState } from 'react'
import Geocoder from 'react-native-geocoding';
import { palette } from '../../theme';
import { TouchableOpacity,Image ,StyleSheet,View} from 'react-native';
import { Cross } from '../../assets';

const LocationSearch = (props) => {
    const [search,setSearch] = useState('')
    const searchRef = useRef()
    const mapRef = useRef()
    useEffect(() => {
        Geocoder.init("AIzaSyDC8F29YJAnHp6qxyBf7YWFGPzj-c04rRA");
    }, [])

    const onPress = (data) => {
        props.onPress(data);
        var location = '';
        Geocoder.from(data.description)
            .then(json => {
                location = json.results[0].geometry.location;
                console.log(location, "location");
                props.onLocation(location);
            })
            .catch(error => console.warn(error));

    }
    const clearSearchHandler = () => {
        searchRef.current.clear()
        setSearch('')
    }
    return (
       
        <GooglePlacesAutocomplete
        ref={searchRef}
            placeholder={props.placeholder?props.placeholder:'Search Your Location'}
            query={{
                key: 'AIzaSyDC8F29YJAnHp6qxyBf7YWFGPzj-c04rRA',
                language: 'en',
            }}
            disableScroll={props?.disableScroll}
            keyboardShouldPersistTaps='always'
            enablePoweredByContainer={false}
            GooglePlacesDetailsQuery={{
                fields: 'formatter_details'
            }}
            onPress={(data, details = null) => onPress(data)}
            onFail={(error) => console.error(error)}
        
            textInputProps={{
                placeholderTextColor:palette.grey
            }}
            styles={{
                textInput: {
                    borderRadius:10,
                    borderWidth:1,
                    height:60,
                    justifyContent:'center',
                    borderColor:palette.lightGrey,
                    ...props?.textInputStyle
                },
                poweredContainer:{
                    color:palette.black,
                },
               description:{
                   color:palette.black
               },
               predefinedPlacesDescription:{
                   color:palette.black
               },
           
            }}
     
        />
       
    )
}
export default LocationSearch

const Style=StyleSheet.create({

    closeButtonContainer:{
        backgroundColor:'rgba(132, 132, 132, 0.43)',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        width:40,
        height:40,
        borderRadius:20,
        marginLeft:'5%'
      },
})