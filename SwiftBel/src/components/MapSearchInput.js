import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, { useEffect } from 'react'
import Geocoder from 'react-native-geocoding';
import { palette } from '../theme';

const MapSearchInput = (props) => {

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
    return (
        <GooglePlacesAutocomplete
            placeholder={props.placeholder?props.placeholder:'Search Your Location'}
            query={{
                key: 'AIzaSyDC8F29YJAnHp6qxyBf7YWFGPzj-c04rRA',
                language: 'en',
            }}
            disableScroll={props?.disableScroll}
            enablePoweredByContainer={false}
            keyboardShouldPersistTaps='always'
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
               listView:{
                   zIndex:10000000,
                  ...props?.listView,
                  
               }
            }}
            
        />
    )
}
export default MapSearchInput