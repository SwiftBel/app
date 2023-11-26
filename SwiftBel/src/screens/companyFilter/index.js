import moment from "moment";
import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import Carousel from "react-native-snap-carousel";
import { useSelector, useDispatch } from "react-redux";
import { Back, call, chevrondown, Chevronleft, dropDownArrow, favourate, priceSearch, rightBack, share, star, UpArrow } from "../../assets";
import { Button, ButtonWithIcon, RippleButton } from "../../components";
import MainHeader from "../../components/Header/MainHeader/MainHeader";
import ModalTester from "../../components/JobModal";
import Loader from "../../components/Loader/Loader";
import LocationMapView from "../../components/LocationMapView";
import HorizontalTextKeyValue from "../../components/TextKeyValue/HorizontalTextKeyValue";
import { getProfileDetails, getService } from "../../store/actions/Profile.action";
import { palette } from "../../theme";
import ServiceInput from "../servicesInput/index";
import LocationBetweenAddresses from "./LocationBetweenAddresses";
import Style from './Style'
const windowHeight = Dimensions.get('window').height;
const sliderWidth = Dimensions.get('window').width;
const CompanyFilter = (props) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isServiceModal, setIsServiceModal] = React.useState(1)
    const [serviceData, setServicesData] = React.useState([])
    const { startingAdress, destinationAdress, serviceProviderData,distance } = useSelector(state => state.Profile)
    const [selectData,setSelectData]=useState({})
    const [type,setType]=useState(0)
    const dispatch = useDispatch()
    const { types } = props.route.params;
    React.useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const res = await dispatch(getService())
        if (res.status === true) {
            setServicesData(res.data[0].symbol)
        }
    }
    const onClickLogo = async (businessName) => {
        setIsLoading(true)
        const res = await dispatch(getProfileDetails(businessName));
        props.navigation.navigate('SpProfile');

        setIsLoading(false)
    }
    const onBookService = (item) => {
        props.navigation.navigate('ConfirmPayment', {
            data: item,
           // venue: data
        })
    }
    console.log(startingAdress, destinationAdress, "Hello")
    const renderItems = (item, data) => {
        console.log(item, "item")
        return (
            <View style={{
                marginTop: 20, backgroundColor: palette.white, elevation: 3,
                flex: 1,
                shadowRadius: 1.22,
                shadowColor: palette.lightGrey,
                borderRadius: 10,
                shadowOffset: {
                    width: 0,
                    height: 1
                },
                borderColor:selectData?.businessName===item?.businessName?palette.pink:'',
                shadowOpacity: 1.0,
                width: '95%',
                alignSelf: 'center'
            }}>
                <View style={Style.bannerContainer}>
                    <Image
                        source={{ uri: item?.bannerImage ? item?.bannerImage : 'https://myawsbucket-swiftbel.s3.ca-central-1.amazonaws.com/test1/1649827692112i.png' }}
                        resizeMode='cover'
                        style={[Style.bannerImage_Style]}
                    />
                    <View style={Style.ratingContainer}>
                        <Image
                            source={share}
                            resizeMode='contain'
                            style={{ height: 20, width: 20, }}
                        />

                    </View>
                    <View style={Style.favourateContainer}>
                        <Image
                            source={favourate}
                            resizeMode='contain'
                            style={{ height: 40, width: 40 }}
                        />
                    </View>
                </View>
                <TouchableOpacity style={Style.profileContainer} onPress={() => onClickLogo(item.businessName)}>
                    <View style={Style.profileButton}>
                        <Image
                            source={{ uri: item?.logoImage ? item?.logoImage : 'https://myawsbucket-swiftbel.s3.ca-central-1.amazonaws.com/test1/1649827692112i.png' }}
                            resizeMode='cover'
                            style={Style.profileImage}
                        />
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={Style.companyNameText}>{item?.businessName}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={star}
                                resizeMode='contain'
                                style={{ height: 18, width: 18, marginRight: 5 }}
                            />
                            <Text style={Style.MottoText}>{`${item?.rating}`}</Text>
                        </View>
                    </View>
                    {/* {item?.estimatedHourlyPrice?
                <Text style={Style.MottoText}>{`Your price CAD `}
                <Text style={{fontSize:20,color:palette.black}}>{`$${item?.estimatedHourlyPrice} `}</Text>{"per hour"}</Text>:
                <Text style={Style.MottoText}>{`starting at CAD `}
                <Text style={{fontSize:20,color:palette.black}}>{`$${data?.hourlyPrice?.HourlyCharge?.twoMoversOneTonTruck} `}</Text>
                {'per hour'}
                </Text>} */}

                </View>

                <Text style={Style.languageText}>{'Free cancellation up to 24 hours before the job'}</Text>
                {/* {item?.finalPrice ?
                    <View style={{marginBottom:20}}>

                        <HorizontalTextKeyValue
                        title={"Hourly price"}
                        value={`$ ${Math.ceil(item?.estimatedHourlyPrice)} per hour`}
                        />
                         <HorizontalTextKeyValue
                        title={"Travel time"}
                        value={`${item?.travelTime||'0 min'}`}
                        />
                         <HorizontalTextKeyValue
                        title={"Total hours (Includes travel time)"}
                        value={`${item?.estimatedTime||'0 min'}`}
                        />
                         <HorizontalTextKeyValue
                        title={"Total estimate"}
                        value={`$ ${Math.ceil(item?.finalPrice)}`}
                        />
                    </View>: null} */}
                <View style={{ flexDirection: 'row' }}>
                    <RippleButton
                        buttonView={{ alignItems: 'center' }}
                        ButtonText={item.estimatedHourlyPrice ? `Select` : "Get online estimate"}
                        buttonTextStyle={{ fontSize: 16, textAlign: 'center', color:  palette.black }}
                        button={{ borderWidth: 1, height: 45, width: 300, justifyContent: 'center', marginBottom: 20, marginLeft: 20, borderRadius: 8, backgroundColor:  palette.white }}
                        onPress={() => item.estimatedHourlyPrice ? onBookService(item) : setIsServiceModal(-1)}
                    
                    />
                    <View style={Style.callContainer}>
                        <Image
                            source={call}
                            resizeMode='contain'
                            style={{ height: 30, width: 30 }}
                        />
                    </View>
                </View>

            </View>

        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: palette.smokeWhite }}>
            <Loader visible={isLoading} />
            <MainHeader
            centerText= {types==="Moving"?"Get online estimates":"Calculate your price"}
            leftImage={true}
            onleftClick={()=>props.navigation.goBack()}
            />
           {types==="Moving"? <View style={{backgroundColor: palette.white,height:'18%', justifyContent:'center',  paddingTop: 5,paddingBottom:20 }}>
                <View>
                <TouchableOpacity activeOpacity={0.8} style={Style.LocationDataButton}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={UpArrow} style={{ width: 12, height: 15, tintColor: palette.grey, marginRight: 10 }} />
                        <Text numberOfLines={1} style={Style.locationDataText}>{startingAdress?.description?.description}</Text>
                    </View>
                </TouchableOpacity>
             {type===0||type===2?   <TouchableOpacity activeOpacity={0.8} style={Style.LocationDataButton}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={dropDownArrow} style={{ width: 12, height: 15, tintColor: palette.grey, marginRight: 10 }} />
                        <Text numberOfLines={1} style={Style.locationDataText}>{destinationAdress?.description?.description}</Text>
                    </View>

                </TouchableOpacity>:null}
                </View>
                
            </View>: <View style={{backgroundColor: palette.white,height:'9%', justifyContent:'center',  paddingTop: 5,paddingBottom:20 }}>
            <TouchableOpacity activeOpacity={0.8} style={Style.LocationDataButton}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={UpArrow} style={{ width: 12, height: 15, tintColor: palette.grey, marginRight: 10 }} />
                        <Text numberOfLines={1} style={Style.locationDataText}>{startingAdress?.description?.description}</Text>
                    </View>
                </TouchableOpacity>
                </View>}
           
            {
                <View style={{height:'40%'}}>
                <LocationMapView
                    onDragEnd={(e) => console.log(e, "e")}
                    position={startingAdress?.location}
                    destination={destinationAdress?.location}
                />
                </View>

            }
            {
            // serviceProviderData[0]?.finalPrice ?
            //     <View style={{ backgroundColor: palette.white, width: '100%',flexDirection:'row', height: 110, shadowColor: '#171717',
            //     shadowOffset: { width: -2, height: 1 },
            //     shadowOpacity: 0.2,
            //     shadowRadius: 2,elevation:10,paddingBottom:10 }}>
            //         <View style={{justifyContent:'center',paddingLeft:30}}>
            //         <Text style={{fontSize:20,color:palette.grey,marginBottom:2}}><Text style={{textDecorationLine:'line-through'}}>${serviceProviderData[1]?.estimatedHourlyPrice+15}</Text> ${serviceProviderData[1]?.estimatedHourlyPrice}
            //         <Text style={{fontSize:16}}> per hour</Text>
            //         </Text>
            //         <Text style={{fontSize:14,textDecorationLine:'underline'}}> 2 Movers with 3 ton truck</Text>
            //         </View>
            //         <ButtonWithIcon
            //             ButtonLeftText="Reserve now"
            //             buttonLeftTextStyle={{ fontSize: 18, textAlign: 'center', color: palette.white, marginLeft: 10 }}
            //             ButtonStyle={{ height: 55, width: 149, borderRadius: 10, justifyContent: 'center', marginBottom: 30, alignItems: 'center', position: 'absolute', bottom: 0, right: 30, backgroundColor: palette.pink, flexDirection: 'row' }}
            //             onClick={() => onleftClick()}
            //         />
            //     </View>
            //     :
                <ServiceInput
                {...props}
                    TYPE={types}
                    isVisible={isServiceModal}
                    onCancel={() => setIsServiceModal(-1)}
                    onselect={() => setIsServiceModal(-1)}
                    setTypeIndex={(val)=>setType(val)}
                />}
              

        </View>

    )
}
export default CompanyFilter