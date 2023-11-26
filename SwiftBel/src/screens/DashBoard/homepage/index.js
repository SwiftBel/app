import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Animated, TouchableOpacity, useWindowDimensions, Dimensions, FlatList } from 'react-native'
import { carpetCleaning, Cleaning, Cross, electricity, Handyman, HAVC, moving, painting, Plumbing, Presssurewashing, Roofcleaning, Search, } from "../../../assets";
import { palette } from "../../../theme";
import CustomBackdrop from '../../../components/CommonCustomBackDrop';
import style from "./style";
import { getService } from '../../../store/actions/Profile.action'
import { useDispatch } from 'react-redux'
import { useCardAnimation } from '@react-navigation/stack';
import ServiceCrousal from "./ServiceCrousal";
import PlaceCrousal from "./PlaceCrousal";
import ImageCrousal from './ImageCrousal'
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import MapviewList from "../../../components/MapViewList";
import { ActionSheetProvider,ActionSheetContext } from "../../../context/ActionSheetProvider";
import { useContext,useMemo } from "react";
import LocationSearch from "../../../components/LocationSearch";
const HomePage = ({ navigation, index, setIndex }) => {
  const dispatch = useDispatch()
  const [ref, setRef] = React.useState()
  
  const [selectIndex, setSelectIndex] = React.useState(0)
  const [serviceData, setServicesData] = useState([])
  const [cardServiceData, setCardServiceData] = useState(false)
  const { next } = useCardAnimation();
  const { height } = useWindowDimensions();
  const [cardOffset, setCardOffset] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [iindex, setIIndex] = useState(0);
  const { services,openServices} = useContext(ActionSheetContext);
  const translateYUp =
    next?.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -cardOffset],
    }) ?? 0;
  const loopArr = [
    "Home", "House", "Condo", "Storage", "Business", "Office"
  ];
  const existSnapPoints = useMemo(() => ['1', '85%'], ["85%"]);
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


  const translateYDown =
    next?.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, bottomOffset],
    }) ?? 0;

  const opacity =
    next?.progress.interpolate({
      inputRange: [0.99, 1],
      outputRange: [1, 0],
    }) ?? 1;

  const onExpandableCardLayout = event => {
    const cardHeight = event.nativeEvent.layout.height;
    setCardOffset(
      cardHeight + Spacings.s16 + Spacings.s24 + Spacings.s24 + Spacings.s16,
    );
  };

  const onLayoutDownOffset = event => {
    setBottomOffset(height - event.nativeEvent.layout.y);
  };
  React.useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const res = await dispatch(getService())
    if (res.status === true) {
      console.log(res.data[0].data)
      setServicesData(res.data[0].symbol)
      setCardServiceData(res.data[0].data)
    }
  }
  const getItemLayout = (data, index) => {
    console.log(index, "height")
    return ({
      length: 165,
      offset: 270 * index,
      index
    })
  }
  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.y / (nativeEvent.layoutMeasurement.width - 130));
      console.log(slide)
      setSelectIndex(slide)
    }
  }
  return (
    <ActionSheetProvider>
    <View style={[style.container,]}>
      <ScrollView
        style={{ marginTop: 60 }}
        ref={(ref) => setRef(ref)}
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => onChange(nativeEvent)}
        onLayout={(data, index) => getItemLayout(data, index)}
        nestedScrollEnabled={true}
        contentContainerStyle={{paddingBottom:80,paddingTop:20}}
      >
        <Animated.View style={{ transform: [{ translateY: translateYUp }], alignItems: 'center' }}>
          <TouchableOpacity key={index} activeOpacity={0.4} style={style.searchBarContainer} onPress={() => navigation.navigate('SearchFilter')}>
            <View>
            <Text style={style.searchText}>Need something done?</Text>
            <Text style={[style.subtext,{fontSize:12}]}>Plumbers. Pressure Washers. Many More</Text>
            </View>
            <Image
              source={Search}
              resizeMode='contain'
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>
        </Animated.View>
        {/* <View >
          <ServiceCrousal
            navigation={navigation}
          />
        </View> */}


        {/* <ScrollView 
          horizontal 
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        
          style={{width:'100%'}}
          >
     { serviceData.map((item)=>  <View style={style.card}>

<View style={{ flexDirection: 'row',padding:20,borderColor:palette.lightGrey,      borderBottomWidth:1  }}>
  <View style={style.Wrap}>
    <Image
      source={{ uri: item?.greyurl }}
      resizeMode='cover'
      style={{ width: 60, height: 53,tintColor:palette.pink }}
    />
  </View>
  <View>
    <Text style={style.text}>{item?.name}</Text>
    <Text style={style.subtext}>starting at $95 per hour</Text>
  </View>
</View>
<View style={{ flexDirection: 'row',justifyContent:'space-between'  }}>
<TouchableOpacity style={{width:'48%',height:55,justifyContent:'center', alignItems:'center',borderRightWidth:1,borderColor:palette.lightGrey}}>
      <Text  style={{color:palette.grey,fontWeight:'500'}}>learn more</Text>
    </TouchableOpacity>
<TouchableOpacity style={{width:'50%',height:55,justifyContent:'center', alignItems:'center',borderColor:palette.lightGrey,borderRadius:8}}>
      <Text style={{color:palette.pink,fontWeight:'500'}}>Find a service provider</Text>
    </TouchableOpacity>
    </View>
</View>)
}

          </ScrollView> */}
        <View style={style.cardWrap}>
          <View style={style.flexCard}>
            <TouchableOpacity onPress={() => navigation.navigate("LocationTraker",{type:'Moving'})} style={style.firstCardWrap}>
              <Image
                source={moving}
                resizeMode='contain'
                style={[style.cardImg]}
              />
              <Text style={style.card1Text} >{serviceData[0]?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("LocationTraker",{type:'Electricians'})} style={style.firstCardWrap}>
              <Image
               source={electricity}
                resizeMode='contain'
                style={[style.cardImg]}
              />
              <Text style={style.card1Text} >{serviceData[1]?.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={style.flexCard2}>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate("LocationTraker",{type:'Plumbers'})} style={style.secondCardWrap}>
                <Image
                 source={Plumbing}
                  resizeMode='contain'
                  style={[style.cardImg, {  alignSelf: 'center' }]}
                />
              </TouchableOpacity>
              <Text style={style.card2Text} >{serviceData[3]?.name}</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate("LocationTraker",{type:'Carpet Cleaning'})} style={style.secondCardWrap}>
                <Image
                  source={Cleaning}
                  resizeMode='contain'
                  style={[style.cardImg, {  alignSelf: 'center' }]}

                />
              </TouchableOpacity>
              <Text style={style.card2Text} >{serviceData[6]?.name}</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 15, width: '22.5%' }}>
              <TouchableOpacity  onPress={() => navigation.navigate("LocationTraker",{type:'Pressure Washing'})} style={style.secondCardWrap}>
                <Image
                 source={Presssurewashing}
                  resizeMode='contain'
                  style={[style.cardImg, {  alignSelf: 'center' }]}
                />
              </TouchableOpacity>
              <Text style={style.card2Text} >{serviceData[2]?.name}</Text>
            </View>
            <TouchableOpacity onPress={()=>openServices(services)} style={{ alignItems: 'center', width: '21%' }}>
              <View style={[style.secondCardWrap, { height: 83, justifyContent: 'center' }]}>
                <Text style={{ fontSize: 8, fontWeight: '400', textAlign: 'center', marginTop: 5 }} >{" ● ● ●"}</Text>
              </View>
              <Text style={style.card2Text} >{"See all"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[style.cardWrap,{marginBottom:30}]}>
        <ImageCrousal/>
        </View>
        <View style={[style.cardWrap]}>
          <View style={style.scrollStyle}>
          <TouchableOpacity key={index} activeOpacity={0.4} style={style.searchBarContainer2} onPress={() => navigation.navigate('SearchFilter')}>
            <Text style={{fontSize:16}}>Where's home ?</Text>
            <View style={{borderWidth:1,borderRadius:14,height:34,width:70,backgroundColor:'#000', justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#fff',fontWeight:'500'}}>Search</Text>
            </View>
          </TouchableOpacity>
                    </View>
                    
          {/* <ScrollView
            horizontal
            // pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginLeft: 10 }}
            style={style.scrollStyle}
          >
            {serviceData?.map((item, index) => <View style={style.card}>
              <View style={style.mapCard}>
                <Image
                  source={{ uri: serviceArr?.[index]?.url || "https://s3-media0.fl.yelpcdn.com/bphoto/n1ZVLWZzV2kcrtZph2p79g/o.jpg" }}
                  resizeMode='cover'
                  style={style.mapCardImg}
                />
                <View>
                  <Text style={style.text}>{item?.name}</Text>
                  <Text style={style.subtext}>{`starting at ${serviceArr?.[index]?.price || '$95'} per hour`}</Text>
                </View>
              </View>
            </View>)
            }

          </ScrollView> */}
        
          <View pointerEvents='none' style={style.mapWrap}>
            <MapviewList
              onDragEnd={(e) => console.log(e, "e")}
              strokeWidth={1}
              strokeColor={palette.babyPink}
              fillColor={'rgba(217,20,110,0.14)'}
            />
          </View>
        </View>
        {/* <View style={[style.cardWrap, { marginTop: 30, paddingBottom: 90 }]}>
          <Image source={{ uri: 'https://s3-media0.fl.yelpcdn.com/bphoto/S5K9ak4YcOpzZv2DMs-h-w/o.jpg' }} resizeMode='cover' style={{ width: '87%', height: 230 }} />
          <View style={style.bookingcard}>
            <Text style={style.text}>Inexpensive prices from vetted professionals</Text>
            <Text style={style.subtext}>SwiftBel finds affordable and reliable home service professionals so you don't have to. We survey the market so that you don't overpay.</Text>
          </View>
        </View> */}
        {/* <Text style={[style.text, { marginLeft: 15, marginBottom: 20, marginTop: 20 }]}>Cities we operate</Text> */}
        <PlaceCrousal
          onselect={() => navigation.navigate('SearchFilter')}
        />
      </ScrollView>
      <BottomSheetModal
                ref={services}
                enablePanDownToClose
              //  onChange={handleSheetChange}
                backdropComponent={CustomBackdrop}
                index={1}
                snapPoints={existSnapPoints}
                enableOverDrag={true}
                handleIndicatorStyle={{ backgroundColor: "transparent" }}
                style={{ borderRadius: 10, }}
            >
                <FlatList
      ref={ref}
        style={{ flexGrow: 0 }}
        data={serviceArr}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
        scrollEnabled={false}
        ListHeaderComponent={
          <View style={{ height: 60,marginLeft:-20, marginTop: -20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderColor: palette.lightGrey, marginBottom: 30 }}>
          <TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', left: 20, top: 20 }}>
              <Image
                  source={Cross}
                  resizeMode='contain'
                  style={{ height: 25, width: 25 }}
              />
          </TouchableOpacity>
          <Text style={{fontSize:16,fontWeight:'500'}}>{"Select a service"}</Text>

      </View>
        }
        renderItem={({ item, index: fIndex }) => {
          return (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate("LocationTraker",{type:item.name})}>
                <View style={{ alignItems: 'center', marginRight: 15, width:'88%', marginBottom:15 }}>
              <View style={style.serviceCardWrap}>
                <Image
                 source={item.icon}
                  resizeMode='contain'
                  style={[style.cardImg, {  alignSelf: 'center' }]}
                />
              </View>
              <Text style={style.card2Text} >{item.name}</Text>
            </View>
            </TouchableOpacity>
            </View>
          );
        }}
      />
              </BottomSheetModal>
    </View>
    </ActionSheetProvider>
  )
}
export default HomePage