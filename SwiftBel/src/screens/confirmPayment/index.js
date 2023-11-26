import moment from "moment";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, Alert,Button } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import { Back, banner1, chevrondown, Chevronleft, favourate, priceSearch, rightBack, star, tick, truck } from "../../assets";
import { RippleButton, TextKeyValue } from "../../components";
import { palette } from "../../theme";
import Lottie from 'lottie-react-native';
import Flt from '../../assets/HiFU86WkTS.json'
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import Style from './Styles'
import {
    CardField,
    CardFieldInput,
    useStripe,
    StripeProvider,
    CardForm,
    useApplePay,
    ApplePayButton

} from '@stripe/stripe-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getpaymentIntent } from "../../store/actions/UserInput";
import MainHeader from "../../components/Header/MainHeader/MainHeader";
import { ScrollView } from "react-native-gesture-handler";
import HorizontalTextKeyValue from "../../components/TextKeyValue/HorizontalTextKeyValue";
import Constants from "../../utils/Constant";
import SignUp from "../signUp/Index";
import { ActionSheetProvider } from "../../context/ActionSheetProvider";
import ModalTester from "../../components/JobModal";
import { paymentBooking } from "../../store/actions/Profile.action";
const ConfirmPayment = (props) => {
    const { data, venue,type } = props.route.params
    const [card, setCard] = useState(CardFieldInput.Details | null);
    const { presentApplePay, confirmApplePayPayment, isApplePaySupported } = useApplePay();
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [isModal,setIsModal]=useState(false)
    const { confirmPayment, initPaymentSheet, presentPaymentSheet, handleCardAction } = useStripe()
    const { startingAdress, destinationAdress, serviceProviderData,finalData } = useSelector(state => state.Profile)
    const dispatch = useDispatch()
    const sheetRef = useRef(null);
    const {Authentication}=Constants
  // variables
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
    const publishableKey = "pk_live_51KnIv3IP0V9hIrNScYkpMaRMBSzGwDekxHvEgBoXBo2iTlzOQ13rL927tddCs5JcnWMfVJeC6JJxRcrNtdKz70wY00DcDIUxhf";
    const customAppearance = {
        font: {
            family:
                Platform.OS === 'android' ? 'avenirnextregular' : 'AvenirNext-Regular',
                scale: 1.1,
                
        },
        shapes: {
            borderRadius: 10,
            borderWidth: 1,
            height: 800,
        
        },
        ShadowConfig:{
           
           
        },
        primaryButton: {
            shapes: {
                borderRadius: 8,
               
            },
        },
        colors: {
            primary: palette.pink,
            background: '#ffffff',
            componentBackground: '#ffffff',
            componentBorder: palette.lightGrey,
            componentDivider:  palette.lightGrey,
            primaryText: '#000000',
            primaryButtonText:'#ffffff',
            secondaryText: '#000000',
            componentText: '#000000',
            placeholderText: '#73757b',
        },
    };
    const initializePaymentSheet = async () => {
        // const {
        //   paymentIntent,
        //   ephemeralKey,
        //   customer,
        //   publishableKey,
        // } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            appearance: customAppearance,
            applePay: true,
            merchantDisplayName: "Swiftbel, Inc.",
            //   customerId: customer,
              customerEphemeralKeySecret: "pi_3MFceUIP0V9hIrNS1rKkByNG",
            paymentIntentClientSecret: "pi_3MFceUIP0V9hIrNS1rKkByNG_secret_9jWVYZlHKlkYAHAkD6mFYoxF2",
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }
    };
    useEffect(() => {
        getToken()
        initializePaymentSheet();
       
    }, []);
    const getToken = async () => {
        const token = await EncryptedStorage.getItem("access_token");
        const session = await token ? JSON.parse(token) : ''
        console.log("<<<", session)
        setIsAuthenticated(session ? true : false)
    }
    const pay = async () => {
     
        handleSnapPress(2)
        try {
            // sending request
            const datas = {
                "paymentMethod": ["card"],
                "serviceProviderId": serviceProviderData[1]?.spId,
            }
            let res = await dispatch(getpaymentIntent(datas));
            let ClientSercet = ''
            console.log(res)
            if (res.status === true) {
                ClientSercet = res.data?.client_secret
                // setSecretKey(res.data?.client_secret)
            }
            // await presentApplePay({
            //     cartItems: [
            //         {
            //             label: "Example item name",
            //             amount: "100.00",
            //             isPending: false,
            //             paymentType: "Immediate",
            //         },
            //     ],
            //     country: "CA",
            //     currency: "CAD",
            //     shippingMethods: [
            //         {
            //             amount: "20.00",
            //             identifier: "DPS",
            //             label: "Moving",
            //             detail: "Delivery",
            //             isPending: true,
            //         },
            //     ],

            // });
            const clientSecret = ClientSercet;
            
            const initSheet = await initPaymentSheet({
                appearance: customAppearance,
                    applePay:true,
                paymentIntentClientSecret: clientSecret,
                
            });
            if (initSheet.error) return (Alert.alert(initSheet.error.message),
            handleSnapPress(0)
            )
            
            const presentSheet = await presentPaymentSheet({
                clientSecret,
            }); 
            if (presentSheet.error) return (Alert.alert(presentSheet.error.message), handleSnapPress(0))
            {
                const res1= await dispatch(paymentBooking(finalData,serviceProviderData))
            setIsModal(true)

            }
        } catch (err) {
            console.error(err);
            Alert.alert("Something went wrong, try again later!");
        }
       
    }
    return (
        <ActionSheetProvider>
        <View style={{ flex: 1, }}>
      
<MainHeader
leftImage={true}
centerText="Request to book - SwiftBel"
onleftClick={()=>props.navigation.goBack()}
/>
<ScrollView>

<View style={Style.cardContainer}>

<View style={{marginBottom:20,flexDirection:'row',justifyContent:'space-between'}}>
    <View>
<Text style={Style.text}>Date and time</Text>
<Text style={Style.subValue}>{`${finalData?.date}, ${finalData?.time}`}</Text>
</View>
<View style={{justifyContent:'flex-end'}}>
<Text style={{textDecorationLine:'underline',fontSize:16}}>Edit</Text>
</View>
</View>

<View style={{marginBottom:20,flexDirection:'row',justifyContent:'space-between'}}> 
<View>
<Text style={Style.text}>{type==="moving"? "Pickup address":'Address'}</Text>
<Text style={Style.subValue}>{type==="moving"? finalData?.fromAddress:finalData?.address}</Text>
</View>
<View style={{justifyContent:'flex-end'}}>
<Text style={{textDecorationLine:'underline',fontSize:16}}>Edit</Text>
</View>
</View>
{finalData?.toAddress?<View style={{marginBottom:10,flexDirection:'row',justifyContent:'space-between'}}>
    <View>
<Text style={Style.text}>Dropoff Address</Text>
<Text style={Style.subValue}>{finalData?.toAddress}</Text>
</View>
<View style={{justifyContent:'flex-end'}}>
<Text style={{textDecorationLine:'underline',fontSize:16}}>Edit</Text>
</View>

</View>:null}
</View>
{type==="Moving"? finalData?.approxSizeInSqFt?<View style={Style.cardContainer}>
    <View style={Style.flexWrap}>
    <View style={Style.Wrap}>
        <Image
        source={truck}
        resizeMode='cover'
        style={{width:80,height:53}}
        />
    </View>
    <View>
        <Text style={Style.text}>{serviceProviderData[1]?.estimatedHourlyPrice===129?"2 Movers with 3 ton truck":serviceProviderData[1]?.estimatedHourlyPrice===169?'3 Movers with 5 ton truck':'4 Movers with 5 ton truck'}</Text>
        <Text style={Style.subValue}>{finalData?.approxSizeInSqFt} sq.ft</Text>
        <Text style={Style.subValue}>{serviceProviderData[1]?.estimatedHourlyPrice} per hour</Text>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:8,marginTop:10}}> 
                <Image style={{width:10,height:10,marginTop:8,marginRight:5}} source={star}/>
                <Text style={Style.starText}>{"4.7 (168)"}</Text>
                </View> */}
    </View>
    </View>
</View>:null:null}
<View style={Style.cardContainer}>
<Text style={Style.headerText}>Price details</Text>
<View style={{borderBottomWidth:1,borderColor:palette.lightGrey}}>
{type==="Moving"? finalData?.approxSizeInSqFt?<HorizontalTextKeyValue
title={'Hourly rate (CAD)'}
value={`$${serviceProviderData[1]?.estimatedHourlyPrice}`}
Container={{marginLeft:0,marginRight:0}}
keyStyle={{fontSize:16}}
valueStyle={{fontSize:16}}
/>:null:null}
<HorizontalTextKeyValue
title={'Price'}
value={type==="Moving"? `$${serviceProviderData[1]?.finalPrice}`:type==="Pressure washing"||type==="Carpet Cleaning"? `$${serviceProviderData}`:`$${serviceProviderData.finalPrice} for the first hour`}
Container={{marginLeft:0,marginRight:0,marginBottom:20}}
keyStyle={{fontSize:16}}
valueStyle={{fontSize:16}}
/>
{type==="Electricians"||type==="Plumbers"?<HorizontalTextKeyValue
title={' '}
value={`$${serviceProviderData.secondHour} for each additional hour`}
Container={{marginLeft:0,marginRight:0,marginTop:-20,marginBottom:20}}
keyStyle={{fontSize:16}}
valueStyle={{fontSize:16}}
/>:null}
</View>
<HorizontalTextKeyValue
title={'Due now'}
value={`$0`}
Container={{marginLeft:0,marginRight:0}}
keyStyle={{fontSize:16}}
valueStyle={{fontSize:20}}
/>
</View>
{/* <View style={Style.cardContainer}>
<Text style={Style.headerText}>Pay with</Text>
<View style={{borderWidth:1,borderColor:palette.lightGrey,padding:20,borderRadius:10,flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
<Text style={Style.text}>Debit and credit card</Text>
<Image style={{width:25,height:25,alignSelf:'center'}} source={rightBack}/>
</View>
<View style={{borderWidth:1,borderColor:palette.lightGrey,padding:20,borderRadius:10,flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
<Text style={Style.text}>Apple pay</Text>
<Image style={{width:25,height:25,alignSelf:'center'}} source={rightBack}/>
</View>
</View> */}
{/* <View style={Style.cardContainer}>

         <Text style={{fontSize:22,fontWeight:'500',}}>About your booking:</Text>
         <View style={{flexDirection:'row',marginTop:20}}>
             <Image source={tick} style={{width:15,height:15,marginRight:5}}/>
         <Text style={{fontSize:16,color:palette.grey}}>You won’t be charged anything to reserve.</Text>
         </View>
         <View style={{flexDirection:'row',marginTop:10}}>
             <Image source={tick} style={{width:15,height:15,marginRight:5}}/>
         <Text style={{fontSize:16,color:palette.grey}}>Free cancellation.</Text>
         </View>
         <View style={{flexDirection:'row',marginTop:10}}>
             <Image source={tick} style={{width:15,height:15,marginRight:5}}/>
         <Text style={{fontSize:16,color:palette.grey}}>We don't charge any additional fees.</Text>
         </View>
         </View> */}
         <View style={Style.cardContainer}>
         <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between'}} >
                    <View style={{width:'90%'}}>
                        <Text style={{fontSize:22,color:'#190F0F'}}>{"Cancellation policy"}</Text>
                        <Text style={{ color: palette.grey,marginTop:10 }}>{"You have the flexibility to cancel any reservation, at no charge, up to 24 hours before the booking."}</Text>
                        </View>
                        <Image
                        source={rightBack}
                        resizeMode='contain'
                        style={Style.iconStyle}
                        />
                        </TouchableOpacity>
         </View>
         <View style={Style.cardContainer}>
         <Text style={[Style.acknoledgeText,{marginBottom:20,lineHeight:20}]}>
                 {"By selecting the button below, I agree to the SwiftBel Rules,"}
               
                <Text style={Style.policText}>
               {"Cancellation and Refund Policy and Terms of Service."}
                </Text>
                <Text style={Style.acknoledgeText}>
                {"If your job requires materials, your Service Provider will ask you to authorize those material costs and they will be added to the price you pay."}
                </Text>
               
                </Text>
        
         </View>
</ScrollView>
            {/* <View style={Style.bannerContainer}>
                <Image
                    source={{ uri: data.bannerImage ? data.bannerImage : 'https://myawsbucket-swiftbel.s3.ca-central-1.amazonaws.com/test1/1649827692112i.png' }}
                    resizeMode='cover'
                    style={Style.bannerImage_Style}
                />
                <View style={Style.ratingContainer}>
                    <Image
                        source={star}
                        resizeMode='contain'
                        style={{ height: 15, width: 15, marginLeft: 10, marginRight: 5 }}
                    />
                    <Text style={{ fontSize: 14, marginRight: 10 }}>{data?.rating}</Text>
                </View>
                <View style={Style.favourateContainer}>
                    <Image
                        source={favourate}
                        resizeMode='contain'
                        style={{ height: 50, width: 50 }}
                    />
                </View>
            </View>
            <View style={Style.profileContainer}>
                <View style={Style.profileButton}>
                    <Image
                        source={{ uri: data.logoImage ? data.logoImage : 'https://myawsbucket-swiftbel.s3.ca-central-1.amazonaws.com/test1/1649827692112i.png' }}
                        resizeMode='cover'
                        style={Style.profileImage}
                    />
                </View>
            </View>
            <Text style={Style.companyNameText}>{data.businessName}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: palette.smokeWhite, }}>
                <TextKeyValue
                    Container={{ marginBottom: 20 }}
                    title={"Service"}
                    value={venue.servicesOffered}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: palette.smokeWhite, marginRight: 40, marginTop: 20 }}>
                <TextKeyValue
                    Container={{ marginBottom: 20 }}
                    title={"Time"}
                    value={venue.time}
                />
                <TextKeyValue
                    Container={{ marginBottom: 20 }}
                    title={"Date"}
                    value={venue.date}
                />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: palette.smokeWhite }}>
                <TextKeyValue
                    Container={{ marginBottom: 20, marginTop: 20 }}
                    title={"Address"}
                    value={venue.placeOfService}
                />
            </View> */}
            <View style={{ alignItems: 'center' }}>
                <StripeProvider
                    publishableKey={publishableKey}
                 //   merchantIdentifier="merchant.com.swiftbel"

                >
                    
                </StripeProvider>

                {/* <Button style={styles.payButton}
              title="Pay with Apple Pay"
              onPress={() => this.pay()} /> */}
            </View>
            <View style={[Style.bottomContainer,{height:100,justifyContent:'center',backgroundColor:'white'}]}>
                
            <RippleButton
                    buttonView={{ alignItems: 'center',  }}
                    ButtonText={"Pay Now"}
                    buttonTextStyle={[Style.buttonText]}
                    button={[Style.button]}
                    onPress={() => pay()}
                />
            </View>
            {/* <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <View style={{flex:1,backgroundColor:'#fff',zIndex:1000,justifyContent:'center',alignItems:'center'}}>
        <Lottie source={require('../../assets/HiFU86WkTS.json')} autoPlay  loop />
          <Text style={{fontSize:20,fontWeight:'500'}}>We are getting your booking ready</Text>
        </View>
      </BottomSheet> */}
      {
          !isAuthenticated&&<SignUp
          {...props}
          index={1}
          />
      }
      <ModalTester
      {...props}
      isModalVisible={isModal}
      />
        </View>
        </ActionSheetProvider>
    )
}
export default ConfirmPayment