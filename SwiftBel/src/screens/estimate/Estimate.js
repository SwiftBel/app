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
import Styles from './Styles'
const HEADER_MAX_HEIGHT = 290;
const HEADER_MIN_HEIGHT = 84;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const photo = [
  { url: "https://s3-media0.fl.yelpcdn.com/bphoto/n1ZVLWZzV2kcrtZph2p79g/o.jpg", key: 4 },
  { url: 'https://s3-media0.fl.yelpcdn.com/bphoto/Gt2h7wpwfVRkxq9QVsUtdA/o.jpg', key: 1 },
  { url: "https://s3-media0.fl.yelpcdn.com/bphoto/g1B4zAs52pyNd_pcen_PVg/o.jpg", key: 2 },
  { url: "https://s3-media0.fl.yelpcdn.com/bphoto/3tVgFRj9kEbRhU01GVw5Xw/o.jpg", key: 3 },

  { url: "https://s3-media0.fl.yelpcdn.com/bphoto/mOhwwWfA9Ohv5YMykuSnyA/o.jpg", key: 5 },

]
const movingreview = [

  {
    name: "Alison Rasberry",
    date: '12th August 2022',
    review: "I had a very very positive experience with Lions Gate Moving last weekend. After many bad movers experiences before that in my life. This was the best by far. I was moving within the city from a one-bedroom sunken basement suite to an apartment building and was given a very reasonable quote of three movers (so it would be fast and efficient).",
    rating: 5,
    nickName:'AR'
  },
  {
    name: "Brittany Barker",
    date: '11th September 2022',
    review: "Collected a bunch of quotes from different moving companies and went with Scott and Steven @Lions Gate Moving because of the initial conversation and reasonable quote. Friendly, communicative, small moving business. Showed up on time, with all the supplies and moved all my stuff without incident or damage!",
    rating: 4.8,
    nickName:'BB'
  },
  {
    name: "Michelle Chand",
    date: '8th October 2022',
    review: " I used this moving company in late december with a lot snow on the ground. Alice accommodated my move after I required a few changes just few days before the move date. The movers were friendly, efficient, professional and worked great as a team 👏 I would highly recommend this company to anyone requiring moving services.",
    rating: 4.5,
    nickName:'MC'
  },
  {
    name: "Agnes Kot",
    date: '17th September 2022',
    review: " I cannot say enough about how hardworking and positive the crew were when moving me. I was really having a stressful time with having to downsize and move after many years at my previous home. From the moment they came through the door the members of the crew reassured me and told me not to worry and that they were there to take care of me....",
    rating: 4.7,
    nickName:'AK'
  },
  {
    name: 'Barry M',
    date: '22nd October 2022',
    review: "We had to move the contents of my mother-in-law's home after her passing. She was located in a rural area on Vancouver Island. Erick and Victor were...",
    rating: 4.9,
    nickName:'BM'
  },

]


function Estimate(props) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [inactive, setInactive] = React.useState(0)
  const { startingAdress, destinationAdress, serviceProviderData, finalData } = useSelector(state => state.Profile)
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
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
      // venue: data
    })
  }
  console.log(serviceProviderData, "datatatta")
  const renderListItem = () => (
    <View>


      <View style={{ borderBottomWidth: 1, marginHorizontal: 15, borderColor: palette.lightGrey }}>
        <Text style={{ fontSize: 24, fontWeight: '500', marginTop: 15 }}>About your booking</Text>
        <HorizontalTextKeyValue
          title={"Moving date"}
          value={`${finalData?.date}`}
          Container={{ marginTop: 10, marginLeft: 0 ,marginRight:0}}
        />
        <HorizontalTextKeyValue
          title={"Moving time"}
          value={`${finalData?.time}`}
          Container={{ marginBottom: 10,marginTop: 5,marginLeft: 0, marginRight:0 }}
        />
       {finalData?.approxSizeInSqFt? <View style={[styles.card, { marginBottom: 10 }]}>
          <TextKeyValue
            title={`$${serviceProviderData[1]?.estimatedHourlyPrice} per hour`}
            value={serviceProviderData[1]?.estimatedHourlyPrice===129?"2 Movers with 3 ton truck":serviceProviderData[1]?.estimatedHourlyPrice===169?'3 Movers with 5 ton truck':'4 Movers with 5 ton truck'}

          />
          <View style={{ backgroundColor: '#F5F9F3', paddingTop: 20, paddingBottom: 20, paddingLeft: 8, paddingRight: 8 }}>
            <Image
              source={truck}
              style={{ width: 80, height: 55 }}
            />
          </View>

        </View>:null}
       { finalData?.approxSizeInSqFt?<Text style={{ fontSize: 16,  marginTop: 15, marginBottom: 15, marginLeft: 5, color: palette.grey }}>Based on {finalData?.numberOfRooms} bedrooms and {finalData?.approxSizeInSqFt} your estimate is ${serviceProviderData[1]?.finalPrice}</Text>:null}
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
            destination={ finalData?.approxSizeInSqFt?destinationAdress?.location:{}}
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
            movingreview?.map((item, index) =>
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
          <Text style={{ fontSize: 20, color: palette.black, marginBottom: 2 }}> ${finalData?.approxSizeInSqFt? serviceProviderData[1]?.estimatedHourlyPrice:serviceProviderData[1]?.finalPrice}
           {finalData?.approxSizeInSqFt? <Text style={{ fontSize: 16 }}> per hour</Text>:null}
          </Text>
          <Text style={{ fontSize: 12, textDecorationLine: 'underline', color: palette.grey }}> Your estimated price is ${serviceProviderData[1]?.finalPrice}</Text>
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
            photo.map((e, index) =>
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

export default Estimate;