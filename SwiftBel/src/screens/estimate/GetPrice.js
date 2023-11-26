import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { Back, condo, img2, img3, img4, img5, localmove, profile, rightBack, star, tick, truck } from '../../assets';
import { ButtonWithIcon, TextKeyValue } from '../../components';
import LocationMapView from '../../components/LocationMapView';
import HorizontalTextKeyValue from '../../components/TextKeyValue/HorizontalTextKeyValue';
import { palette } from '../../theme';
import { mainreviews } from '../servicesInput/Components/listofFormData';
import Styles from './Styles'
const HEADER_MAX_HEIGHT = 290;
const HEADER_MIN_HEIGHT = 84;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const photo = {
    
    presureWashing:[
  { url: "https://s3-media0.fl.yelpcdn.com/bphoto/VuPhnxWdPMs47FtenbxCNw/o.jpg", key: 4 },
  { url: 'https://s3-media0.fl.yelpcdn.com/bphoto/CeFHuhMuKkXveN_NGPw0-Q/o.jpg', key: 1 },
  { url: "https://s3-media0.fl.yelpcdn.com/bphoto/9PPWWvnRU8uMl3Y3Ayc8lQ/o.jpg", key: 2 },
 

],
electrician:[
    { url: "https://s3-media0.fl.yelpcdn.com/bphoto/Crl9oVI9qcTz5g1dq6MXRg/o.jpg", key: 4 },
  { url: 'https://s3-media0.fl.yelpcdn.com/bphoto/fM4-ZOLlX8AY-bsDXilKMg/o.jpg', key: 1 },
  { url: "https://s3-media0.fl.yelpcdn.com/bphoto/g1B4zAs52pyNd_pcen_PVg/o.jpg", key: 2 },
  
],
plumbers:[
    { url: "https://s3-media0.fl.yelpcdn.com/projectphoto/6JHTTS4aOIZF3C5ZtSiyaw/o.jpg", key: 4 },
    { url: 'https://s3-media0.fl.yelpcdn.com/projectphoto/rueR8_wsxRpHh1HahuU0eg/o.jpg', key: 1 },
    { url: "https://s3-media0.fl.yelpcdn.com/projectphoto/FAgO3poOccDyu65ni6_Wpw/o.jpg", key: 2 },
]
}



function GetPrice(props) {
    const { type } = props.route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [inactive, setInactive] = React.useState(0)
  const { startingAdress, destinationAdress, serviceProviderData, finalData } = useSelector(state => state.Profile)
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  let reviews =
 type==='Carpet Cleaning'?mainreviews[0]?.carpetreview:
  type==='plumbers'?mainreviews[0]?.plumbingreview:
  type==="Electricians"?mainreviews[0]?.electriciansreview:
  type==='Pressure washing'?mainreviews[0]?.pressurereview:[]

  let photos=type==="Electricians"?photo?.electrician:
  type==='Pressure washing'?photo?.presureWashing:type==='Plumbers'?photo.plumbers:[]
  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != inactive) {
        setInactive(slide)
      }
    }
  }
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: 'clamp',
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });
  const onBookService = (item) => {
    props.navigation.navigate('ConfirmPayment', {
      data: serviceProviderData,
      type:type
      // venue: data
    })
  }
  console.log(serviceProviderData, "datatatta")
  const renderListItem = () => (
    <View>


      <View style={{ borderBottomWidth: 1, marginHorizontal: 15, borderColor: palette.lightGrey ,paddingBottom:15}}>
        <Text style={{ fontSize: 24, fontWeight: '500', marginTop: 15 }}>About your booking</Text>
        <HorizontalTextKeyValue
          title={"Moving date"}
          value={`${finalData?.date}`}
          Container={{ marginTop: 10, marginLeft: 0 ,marginRight:0}}
        />
        <HorizontalTextKeyValue
          title={"Moving time"}
          value={`${finalData?.time}`}
          Container={{ marginTop: 5,marginLeft: 0, marginRight:0 }}
        />
        
       {type==="Pressure washing"? <HorizontalTextKeyValue
          title={"Areas to be cleaned"}
          value={`${finalData?.areasToBeCleaned?.join(', ')}`}
          Container={{ marginTop: 5,marginLeft: 0, marginRight:0 }}
        />:null}
        {type==="Electricians"||type==="Plumbers"? <HorizontalTextKeyValue
          title={"Type of call"}
          value={`${finalData?.typeOfCall}`}
          Container={{ marginTop: 5,marginLeft: 0, marginRight:0 }}
        />:null}
        {
          type==="Carpet Cleaning"?
          <View>
          <HorizontalTextKeyValue
          title={"Number of stairs"}
          value={`${finalData?.numberofStair}`}
          Container={{ marginTop: 5,marginLeft: 0, marginRight:0 }}
        />
        <HorizontalTextKeyValue
          title={"Number of hallways"}
          value={`${finalData?.additionalHall}`}
          Container={{ marginTop: 5,marginLeft: 0, marginRight:0 }}
        />
        </View>
        :null}
      
       { finalData?.approxSizeInSqFt?<Text style={{ fontSize: 16,  marginTop: 25, marginBottom: 15, marginLeft: 5, color: palette.grey }}>Based on the inputs your calculated price is ${type==="Pressure washing"? serviceProviderData:serviceProviderData?.finalPrice}</Text>:null}
        {/* <View style={styles.card}>
        <TextKeyValue
        title={"Type of moving"}
        value={"Local Moving"}
       
        />
        <View style={{backgroundColor:'#FDF5F0',padding:20}}>
        <Image
        source={localmove}
        style={{width:50,height:55}}
        />
        </View>
     </View> */}
        {/* <View style={styles.card}>
        <TextKeyValue
        title={"Type of house"}
        value={finalData?.typeofHouse}
        
        />
        <View style={{backgroundColor:'#F7F5FA',padding:19}}>
        <Image
        source={condo}
        style={{width:52,height:52}}
        />
        </View>
     </View> */}


      </View>

      <View style={{ borderBottomWidth: 1, marginHorizontal: 15, borderColor: palette.lightGrey }}>
        <HorizontalTextKeyValue
          title={"Due now"}
          value={"$0"}
          valueStyle={{ fontSize: 22 }}
          Container={{ marginLeft: 0,marginRight:0 }}
        />
        <Text style={{ fontSize: 16, marginTop: 10, color: palette.grey, paddingBottom: 20 }}>Reserve at <Text style={{ color: palette.pink }}>no cost</Text>, you'll only pay after your move is completed</Text>
        {/* <View style={styles.bookingcard}>
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
      </View>
      <View style={{ borderBottomWidth: 1, marginHorizontal: 15, borderColor: palette.lightGrey }}>
        <View pointerEvents='none' style={{ height: 300, borderRadius: 15, paddingTop: 20, paddingBottom: 20, flex: 1 }}>
          <LocationMapView
            onDragEnd={(e) => console.log(e, "e")}
            position={startingAdress?.location}
            destination={ {}}
          />
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, marginLeft: 15, marginVertical: 22, borderColor: palette.lightGrey }}>
        <Text style={{ fontSize: 20, fontWeight: '500' }}>Customer feedback</Text>
        <ScrollView
          // onScroll={({nativeEvent})=>onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          horizontal
        //  pagingEnabled
        // style={{width:windowWidth,height:windowHeight*0.45}}
        >
          {
            reviews?.map((item, index) =>
              <View key={index} style={[styles.bookingcard, { width: windowWidth - 80, marginRight: 20, flex: 1 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                    <View style={Styles.logoContainer}>
                     <Text style={Styles.logoText}>{item.nickName}</Text>
                    </View>
                    <View>
                      <Text style={Styles.nameText}>{item?.name || "_"}</Text>
                      <Text style={{ color: palette.grey }}>{item.date}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image style={{ width: 17, height: 17, marginRight: 5 }} source={star} />
                    <Text style={Styles.nameText}>{item?.rating || "_"}</Text>
                  </View>
                </View>

                <Text style={[Styles.nameText, { marginTop: 15,fontWeight:'400', color: palette.grey }]}>{item?.review || "_"}</Text>

              </View>
            )
          }

        </ScrollView>
      </View>
      <View

        style={Styles.ButtonContainer}>
        <TouchableOpacity style={Styles.buttonStyle} >
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 22, color: '#190F0F' }}>{"Cancellation policy"}</Text>
            <Text style={{ color: palette.grey, marginTop: 5 }}>{"This reservation is fully-refundable 24 hours before the moving date"}</Text>
          </View>
          <Image
            source={rightBack}
            resizeMode='contain'
            style={Styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.saveArea}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 32, paddingBottom: 100 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}>
        {renderListItem()}
      </Animated.ScrollView>
      <View style={{
        backgroundColor: palette.white, width: '100%', flexDirection: 'row', height: 110, position: 'absolute', bottom: 0, shadowColor: '#171717',
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2, elevation: 10
      }}>
        <View style={{ justifyContent: 'center', paddingLeft: 20 }}>
          <Text style={{ fontSize: 20, color: palette.black, marginBottom: 2 }}>{type==="Pressure washing"||type==="Carpet Cleaning"? `$${serviceProviderData}`:`$${serviceProviderData?.finalPrice} for the first hour`} 
         
          </Text>
          <Text style={{ fontSize: 12,color: palette.grey }}> {type==="Pressure washing"||type==="Carpet Cleaning"?"Due now $0":`$${serviceProviderData?.secondHour} for each additional hour`}</Text>
        </View>
        <ButtonWithIcon
          ButtonLeftText="Reserve"
          buttonLeftTextStyle={{ fontSize: 18, textAlign: 'center', color: palette.white, }}
          ButtonStyle={{ height: 55, width: 149, borderRadius: 10, justifyContent: 'center', marginBottom: 30, alignItems: 'center', position: 'absolute', bottom: 0, right: 20, backgroundColor: palette.pink, flexDirection: 'row' }}
          onClick={() => onBookService()}
        />
      </View>
      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <Animated.ScrollView
          onScroll={({ nativeEvent }) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          style={{ width: windowWidth, height: windowHeight * 0.45 }}
        >
          {
        photos.map((e, index) =>
              <Animated.View key={index}>
                <Animated.Image
                  style={[
                    styles.headerBackground,
                    {
                      opacity: imageOpacity,
                      transform: [{ translateY: imageTranslateY }],
                    },
                  ]}
                  key={e.key}

                  source={{ uri: e.url }}
                />
              </Animated.View>

            )
          }
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.topBar,
            {
              transform: [{ scale: titleScale }, { translateY: headerTranslateY }],
            },
          ]}>
          <Text style={styles.title}>{inactive + 1}/5</Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          styles.topBarHeader,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
          },
        ]}>
          <TouchableOpacity onPress={()=>props.navigation.goBack()}>
        <Animated.Image


          style={{ width: 8, height: 15, marginLeft: -4, marginTop: -1, alignSelf: 'center' }}
          source={Back}
        />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf:'center',
    width:'99%',
    alignItems: 'center',
    shadowColor: '#402583',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: palette.lightGrey,
    borderRadius: 10,

    marginTop: 15,
  },
  bookingcard: {
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: palette.lightGrey,
    borderRadius: 10,
    padding: 15
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: palette.lightGrey,
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {

    width: windowWidth, height: windowHeight * 0.45,
    resizeMode: 'cover',
  },
  topBar: {
    marginTop: 40,
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 200,
    backgroundColor: '#00000059',
    right: 30,
  },
  topBarHeader: {
    marginTop: 40,
    height: 35,
    width: 35,
    borderRadius: 17.5,
    alignItems: 'center',

    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    backgroundColor: '#fff',

    left: 20,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  avatar: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
    borderRadius: 54 / 2,
  },
  fullNameText: {
    fontSize: 16,
    marginLeft: 24,
  },
});

export default GetPrice;