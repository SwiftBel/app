import * as React from 'react';
import {
    Input, RippleButton, ProfileHeader
} from '../../components/index'
import { StatusBar, View, Text, Animated, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Style from './Style'
import { palette } from '../../theme';
import { useDispatch } from 'react-redux'
import { addBussinessName, getService, searchFilter } from '../../store/actions/Profile.action'
import KeyBoardAvoidingWrapper from '../../components/KeyBoardAvoidingWrapper';
import DateTimePicker from '../../components/DatePicker/DateTimePicker';
import MapSearchInput from '../../components/MapSearchInput';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import TimePicker from '../../components/TimePicker/TimePicker';
import moment from 'moment';
import MainHeader from '../../components/Header/MainHeader/MainHeader';
import { Back, carpetCleaning, chevrondown, Chevronleft, Cleaning, Cross, electricity, Etc, Handyman, HAVC, moving, painting, Plumbing, Presssurewashing, Roofcleaning, Search } from '../../assets';
import { HeaderBackButton } from '@react-navigation/stack';
import { Transition, Transitioning } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import HorizontalTextKeyValue from '../../components/TextKeyValue/HorizontalTextKeyValue';
import CalendarPicker from 'react-native-calendar-picker';
import { TimeList } from './utils/ListComponent';
import LocationSearch from '../../components/LocationSearch';
import Constants from '../../utils/Constant';
const screenwidth = Dimensions.get('screen').width
const screenheight = Dimensions.get('screen').height
const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={1000} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={1000} />
    </Transition.Together>
);
const CARD_HEIGHT = 215;
const deviceHeight = Dimensions.get('window').height
const SearchFilter = ({ navigation, index, setIndex, route }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState([]);
    const [masterDataSource, setMasterDataSource] = React.useState([]);
    const [dateTime, setdateTime] = React.useState(new Date())
    const [serviceData, setServiceData] = React.useState([])
    const [address, setAddress] = React.useState([])
    const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 })
    const [destination, setDestination] = React.useState({ latitude: 0, longitude: 0 })
    const [destinationAddress, setDestinationAddress] = React.useState([])
    const [service, setService] = React.useState('Moving')
    const [time, setTime] = React.useState('9:00')
    const [ampm, setAmPm] = React.useState('AM')
    const [isLoading, setIsLoading] = React.useState(false)
    const opacity = React.useRef(new Animated.Value(0)).current;
    const cardOffset = React.useRef(new Animated.Value(400 * index)).current;
    // const transitionEnded = React.useRef(new Animated.Value(50)).current;
    // const timeEnable = React.useRef(new Animated.Value(50)).current;
    const [transitionEnded, setTransitionEnded] = React.useState(new Animated.Value(50));
    const [timeEnable, setTimeEnabled] = React.useState(new Animated.Value(50));
    const [searchEnable, setSearchEnable] = React.useState(new Animated.Value(50));
    const [destinationsearchEnable, setDestinationSearchEnable] = React.useState(new Animated.Value(50));
    const [footerEnable, setFooterEnable] = React.useState(new Animated.Value(- deviceHeight));

    const [currentIndex, setCurrentIndex] = React.useState(null);
    const serviceArr = [
        {
          name: 'Moving',
          url: 'https://s3-media0.fl.yelpcdn.com/bphoto/n1ZVLWZzV2kcrtZph2p79g/o.jpg',
          price: '$95',
          icon:moving
        },
        {
          name: 'Electricians',
          url: 'https://s3-media0.fl.yelpcdn.com/bphoto/i6yZ2PsF5yfuw2cJogkqYQ/o.jpg',
          price: '$150',
          icon:electricity
        },
        {
          name: 'Pressure Washing',
          url: 'https://s3-media0.fl.yelpcdn.com/bphoto/VuPhnxWdPMs47FtenbxCNw/o.jpg',
          price: '$150',
          icon:Presssurewashing
        },
        {
          name: 'Plumbers',
          url: 'https://s3-media0.fl.yelpcdn.com/bphoto/mwe3RTyuRyY6ZtleLbiYVQ/o.jpg',
          price: '$150',
          icon:Plumbing
        },
        {
          name: 'Painting',
          url: '',
          price: '$150',
          icon:painting
        },
        {
          name: 'Carpet Cleaning',
          url: 'https://s3-media0.fl.yelpcdn.com/bphoto/E076xcD3C1DiRy9ViXWJ4w/o.jpg',
          price: '$60',
          icon:carpetCleaning
        },
        {
          name: 'Cleaning',
          url: '',
          price: '$60',
          icon:Cleaning
        },
        {
          name: 'Handyman',
          url: '',
          price: '$60',
          icon:Handyman
        },
        {
          name: 'HAVC Technicians',
          url: '',
          price: '$60',
          icon:HAVC
        },
        {
          name: 'Roof cleaning',
          url: '',
          price: '$60',
          icon:Roofcleaning
        }
      ]
    const ref = React.useRef();
    React.useEffect(() => {
        init()
        animatebutton()
        FooterButton()
    }, [])

    const FooterButton = async () => {
        await Animated.timing(                  // Animate over time
            footerEnable,            // The animated value to drive
            {
                toValue: 110,
                duration: 300,
                // Make it take a while
            }
        ).start();
    }
    const animatebutton = async () => {
        Animated.timing(                  // Animate over time
            destinationsearchEnable,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }

        ).start();
        await Animated.timing(                  // Animate over time
            timeEnable,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }
        ).start();
        Animated.timing(                  // Animate over time
            searchEnable,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }
        ).start();
        await Animated.timing(                  // Animate over time
            transitionEnded,            // The animated value to drive
            {
                toValue: 300,
                duration: 300,
                // Make it take a while
            }
        ).start();
        // /setTimeEnabled(new Animated.Value(0))
        setCurrentIndex("lol");
    }
    const timeanimatebutton = () => {
        Animated.timing(                  // Animate over time
            destinationsearchEnable,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }

        ).start();
        Animated.timing(                  // Animate over time
            transitionEnded,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }
        ).start();
        Animated.timing(                  // Animate over time
            searchEnable,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }
        ).start();
        Animated.timing(                  // Animate over time
            timeEnable,            // The animated value to drive
            {
                toValue: 470,
                duration: 300,
                // Make it take a while
            }
        ).start();
        //setTransitionEnded(new Animated.Value(50))
        setCurrentIndex("lol0");

    }

    const searchanimatebutton = () => {
        Animated.timing(                  // Animate over time
            destinationsearchEnable,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }

        ).start();
        Animated.timing(                  // Animate over time
            transitionEnded,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }
        ).start();
        Animated.timing(                  // Animate over time
            timeEnable,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }

        ).start();
        Animated.timing(                  // Animate over time
            searchEnable,            // The animated value to drive
            {
                toValue: 300,
                duration: 300,
                // Make it take a while
            }

        ).start();
        //setTransitionEnded(new Animated.Value(50))
        setCurrentIndex("search");

    }
    const destinationSearchButton = () => {
        Animated.timing(                  // Animate over time
            transitionEnded,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }
        ).start();
        Animated.timing(                  // Animate over time
            timeEnable,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }

        ).start();
        Animated.timing(                  // Animate over time
            searchEnable,            // The animated value to drive
            {
                toValue: 50,
                duration: 300,
                // Make it take a while
            }

        ).start();
        Animated.timing(                  // Animate over time
            destinationsearchEnable,            // The animated value to drive
            {
                toValue: 300,
                duration: 300,
                // Make it take a while
            }

        ).start();
        //setTransitionEnded(new Animated.Value(50))
        setCurrentIndex("destinationsearch");

    }
    const goBack = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        Animated.timing(cardOffset, {
            toValue: 80 * index,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            navigation.goBack();
        });
    };
    const init = async () => {
        const res = await dispatch(getService())
        if (res.status === true) {
            console.log(res.data[0].data)
            setServiceData(res.data[0].symbol)
            setMasterDataSource(res.data[0].symbol)
            // setCurrentIndex('lol')
        }
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton
                    onPress={goBack}
                    tintColor="black"
                    labelVisible={false}
                />
            ),
        });
    }, [navigation]);
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

    const onSubmit = async () => {
        setIsLoading(true)
        const data = {
            "date": moment(dateTime).format('DD/MM/YYYY'),
            "time": moment(time).format("HH:mm"),
            "placeOfService": address.terms[0].value,
            "servicesOffered": service
        }
        dispatch({ type: Constants.TYPE.startingAddress, payload: { description: address, location: position } })
        dispatch({ type: Constants.TYPE.destinationAddress, payload: { description: destinationAddress, location: destination } })
        navigation.navigate('CompanyFilter',{types:service})
        // const res = await dispatch(searchFilter(data));
        // if (res.status === true) {
        //     navigation.navigate('CompanyFilter', {
        //         data: data
        //     })
        // }
        setIsLoading(false)
    }
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setServiceData(newData);
            setSearch(text);
        } else {
            setServiceData(masterDataSource);
            setSearch(text);
        }
    };
    return (
        <View style={[Style.container]}>
            <StatusBar barStyle='dark-content' />
            <KeyBoardAvoidingWrapper style={Style.container}>
                <Animated.View style={{ transform: [{ translateY: cardOffset }] }}>
                    <View style={{ marginTop: 50 }}>
                        <TouchableOpacity style={Style.searchCross} onPress={() => navigation.goBack()}>
                            <Image
                                source={Cross}
                                style={{ width: 20, height: 20 }} />

                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 18, marginBottom: 20 }}>Choose Service</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.View style={[Style.PickerButton, { height: transitionEnded }]}  >
                                <View style={Style.PickerButtonContainer}>
                                    {currentIndex === 'lol' ?
                                        <Text style={Style.ServiceHeaderText}>{""}</Text> :
                                        <TouchableOpacity style={{ height: 50, justifyContent: 'center' }} onPress={() => animatebutton()}>
                                            <HorizontalTextKeyValue
                                                title={'Service'}
                                                value={service ? service : ''}
                                                keyStyle={{ paddingTop: 0 }}
                                                valueStyle={{ paddingTop: 0 }}

                                            />
                                        </TouchableOpacity>
                                    }
                                    <ScrollView scrollEnabled={false}>

                                        <View style={{ flex: 1, height: 250 }}>
                                            <View style={{
                                                flexDirection: 'row', alignItems: 'center', height: 50,
                                                borderWidth: 1,
                                                paddingLeft: 10,
                                                margin: 5,
                                                borderColor: palette.grey,
                                                borderRadius: 10,
                                                backgroundColor: '#FFFFFF',
                                                marginBottom: 20,
                                                marginTop: 15,
                                                width: '92%',
                                                alignSelf: 'center'


                                            }}>
                                                <Image source={Search} style={{ width: 20, height: 20, marginRight: 10 }} />
                                                <TextInput
                                                    style={{
                                                        height: 50,
                                                        width: '90%'
                                                    }}
                                                    onChangeText={(text) => searchFilterFunction(text)}
                                                    value={search}
                                                    underlineColorAndroid="transparent"
                                                    placeholder="Search Here"
                                                />
                                            </View>
                                            <ScrollView
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}

                                            >

                                                {serviceData.map((item, index) =>
                                                    <TouchableOpacity style={{ flex: 1, height: 80, width: 140, marginLeft: 15, }} onPress={() => {
                                                        setService(item.name)
                                                        searchanimatebutton()
                                                    }}>
                                                        <View key={index} style={{ borderWidth: service === item.name ? 2 : 1, borderColor: service === item.name ? palette.black : '#787373', borderRadius: 10, marginRight: 20, marginBottom: 10, height: 120, width: 140, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Image

                                                                source={{ uri: service === item.name ? item.url : item.greyurl }} style={{ width: 80, height: 60, marginBottom: 10 }} resizeMode='contain' />
                                                            <Text style={{ color: service === item.name ? palette.black : '#787373', fontSize: 14, fontWeight: '500', }}>{item.name}</Text>
                                                        </View>
                                                        {/* <Text style={{fontSize:14,fontWeight:'500',marginLeft:8 }}>{item.name}</Text> */}

                                                    </TouchableOpacity>
                                                )}

                                            </ScrollView>

                                        </View>
                                    </ScrollView>
                                </View>
                            </Animated.View>
                            <Animated.View style={[Style.PickerButton, { height: searchEnable }]}  >
                                <View style={Style.PickerButtonContainer}>

                                    {currentIndex === 'search' ?
                                        <Text style={[Style.ServiceHeaderText, { borderBottomWidth: 1, borderColor: palette.grey, }]}>{"Address"}</Text> :
                                        <TouchableOpacity style={{ height: 50, justifyContent: 'center' }} onPress={() => searchanimatebutton()}>
                                            <HorizontalTextKeyValue
                                                title={'Address'}
                                                value={address ? address.description : 'Search'}
                                                keyStyle={{ paddingTop: 0 }}
                                                valueStyle={{ paddingTop: 0,width:'40%' }}
                                            />
                                        </TouchableOpacity>
                                    }
                                    <ScrollView keyboardShouldPersistTaps='always' scrollEnabled={false}>

                                        <View style={Style.dragView}>
                                            <LocationSearch
                                                onPress={(data) => {
                                                    setAddress(data)
                                                    if(service==="Moving"){
                                                    destinationSearchButton()
                                                }
                                                else{
                                                    timeanimatebutton()
                                                }
                                                }}

                                                onLocation={(location) => onLocation(location)}
                                                placeholder={'Where would you like the service?'}
                                                listView={{ width: '97%', borderWidth: 1, marginLeft: 5, marginBottom: 10, borderRadius: 15, borderColor: palette.lightGrey, position: 'absolute', zindex: 10000, marginTop: 55 }}
                                            />
                                        </View>


                                    </ScrollView>
                                </View>
                            </Animated.View>
                            {service==="Moving"? <Animated.View style={[Style.PickerButton, { height: destinationsearchEnable }]}  >
                                <View style={Style.PickerButtonContainer}>

                                    {currentIndex === 'destinationsearch' ?
                                        <Text style={[Style.ServiceHeaderText, { borderBottomWidth: 1, borderColor: palette.grey, }]}>{"Destination address"}</Text> :
                                        <TouchableOpacity style={{ height: 50, justifyContent: 'center' }} onPress={() => destinationSearchButton()}>
                                            <HorizontalTextKeyValue
                                                title={'Destination address'}
                                                value={destination ? destination.description : 'Search'}
                                                keyStyle={{ paddingTop: 0 }}
                                                valueStyle={{ paddingTop: 0,width:'40%' }}
                                            />
                                        </TouchableOpacity>
                                    }
                                    <ScrollView keyboardShouldPersistTaps='always' scrollEnabled={false}>

                                        <Animated.View style={Style.dragView}>
                                            <LocationSearch
                                                onPress={(data) =>{ setDestinationAddress(data)
                                                    timeanimatebutton()
                                                }}
                                                onLocation={(location) => onDestinationLocation(location)}
                                                placeholder={'Where would you like the service?'}

                                            />
                                        </Animated.View>


                                    </ScrollView>
                                </View>
                            </Animated.View>:null}
                            <Animated.View style={[Style.PickerButton, { height: timeEnable }]}  >
                                <View style={Style.PickerButtonContainer}>

                                    {currentIndex === 'lol0' ?
                                        <Text style={[Style.ServiceHeaderText, { borderBottomWidth: 1, borderColor: palette.grey, }]}>{"Date and time"}</Text> :
                                        <TouchableOpacity style={{ height: 50, justifyContent: 'center' }} onPress={() => timeanimatebutton()}>
                                            <HorizontalTextKeyValue
                                                title={'Date and time'}
                                                value={`${moment(dateTime).format('DD/MM/YYYY')}, ${time} ${ampm}`}
                                                keyStyle={{ paddingTop: 0 }}
                                                valueStyle={{ paddingTop: 0 }}
                                            />
                                        </TouchableOpacity>
                                    }
                                    <ScrollView scrollEnabled={false}>

                                        <CalendarPicker
                                            //onDateChange={onChange}
                                            //scrollable={true}
                                            // horizontal={true}
                                            // initialDate={new Date()}
                                            onDateChange={(text) => setdateTime(text)}
                                            maxDate={"01/01/2050"}
                                            minDate={new Date()}
                                            textStyle={{fontSize:16,fontWeight:'500'}}
                                            //  selectedDisabledDatesTextStyle={{backgroundColor:'#fff'}}
                                            selectedDayTextStyle={{ color: palette.white, }}
                                            // selectedDayColor={palette.white}
                                            selectedDayStyle={{ color: palette.white, backgroundColor: palette.black }}
                                            todayBackgroundColor={"#fff"}
                                            todayTextStyle={{ color: palette.black }}
                                            value={dateTime}
                                            // scrollable={true}
                                            width={350}
                                            height={350}

                                        />
                                        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: palette.lightGrey, marginTop: 10 }}>
                                            <ScrollView
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                style={{ marginTop: 15, marginBottom: 15 }}

                                            >

                                                {TimeList.map((item, index) =>
                                                    <TouchableOpacity style={{ flex: 1, height: 30, width: 80, marginLeft: 15, }} onPress={() => {
                                                        setTime(item)
                                                        timeanimatebutton()
                                                    }}>
                                                        <View key={index} style={{ borderWidth: time === item ? 2 : 1, borderColor: service === item.name ? palette.black : '#787373', borderRadius: 10, marginRight: 20, marginBottom: 10, height: 30, width: 80, justifyContent: 'center', alignItems: 'center' }}>

                                                            <Text style={{ color: time === item ? palette.black : '#787373', fontSize: 14, fontWeight: '500', }}>{item}</Text>
                                                        </View>
                                                        {/* <Text style={{fontSize:14,fontWeight:'500',marginLeft:8 }}>{item.name}</Text> */}

                                                    </TouchableOpacity>
                                                )}

                                            </ScrollView>

                                            <View style={{ flexDirection: 'row', width: 100, height: 45, alignItems: 'center', borderWidth: 1, borderRadius: 10, justifyContent: 'space-between', backgroundColor: palette.white, marginTop: 6 }}>
                                                <TouchableOpacity onPress={() => setAmPm('AM')} style={{ height: 43, width: 49, borderRadius: 10, backgroundColor: ampm === "AM" ? palette.black : palette.white, justifyContent: 'center' }}>
                                                    <Text style={{ textAlign: 'center', color: ampm !== "AM" ? palette.black : palette.white }}>AM</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => setAmPm('PM')} style={{ height: 43, width: 49, borderRadius: 10, backgroundColor: ampm !== "AM" ? palette.black : palette.white, justifyContent: 'center' }}>
                                                    <Text style={{ textAlign: 'center', color: ampm === "AM" ? palette.black : palette.white }}>PM</Text>
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                        {/* <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end', width: 120, height: 50, margin: 10, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => searchanimatebutton()}>
                                            <Text style={{ color: '#fff', fontSize: 14 }}>Next</Text>
                                        </TouchableOpacity> */}


                                    </ScrollView>
                                </View>
                            </Animated.View>
                           
                        </View>



                    </View>

                </Animated.View>

            </KeyBoardAvoidingWrapper>
            <Animated.View style={[Style.PickerButton, { height: footerEnable, width: '100%', marginBottom: 0, borderRadius: 0 }]}  >
                <ScrollView scrollEnabled={false}>
                    <View style={[Style.bottomContainer, { justifyContent: 'center', marginTop: 20 }]}>
                        <RippleButton
                            buttonView={{ alignItems: 'flex-end',marginTop:10 }}
                            ButtonText={"Clear all"}
                            buttonTextStyle={{ color: palette.black, textDecorationLine: "underline", fontSize: 16 }}
                            button={Style.backButton}
                            onPress={() => navigation.goBack()}
                        />
                        <RippleButton
                            buttonView={{ alignItems: 'center',marginLeft:20  }}
                            ButtonText={"Search"}
                            buttonTextStyle={[Style.buttonText,
                            { color: palette.white }]}
                            button={[Style.button,
                            { backgroundColor: palette.pink }]}
                            onPress={() => onSubmit()}
                            isDisable={address && service && dateTime && time ? false : true}
                            indicator={isLoading}
                        />

                    </View>
                </ScrollView>
            </Animated.View>

        </View>
    );
}
export default SearchFilter;