import React, { useEffect } from "react";
import { palette } from "../../../theme";
import { View, Image, Text, FlatList, Dimensions, ScrollView } from 'react-native';
import { carpetMain, electricianmain, movingBox, Plumbingmain, Pressurewashingmain } from "../../../assets";
import Carousel from "react-native-snap-carousel";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ImageCrousal=()=>{
    const [inactive, setInactive] = React.useState(0)

  
    const onChange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != inactive) {
                setInactive(slide)
            }
        }
    }
    const getItemLayout = (data, index) => {
        return ({
            length: windowHeight / 1.55,
            offset: windowHeight / 1.55 * index,
            index
        })
    }
    
    const photo=[
       
        {name:'Moving',url:movingBox,color:'#e5acb6', price: '$95',key:5},
        {name:'Carpet cleaning',url:carpetMain,color:'#b5a6e0', price: '$150',key:2},
        {name:'Pressure washing',url:Pressurewashingmain,color:'#9eb7d9', price: '$150',key:3},
        {name:'Plumbers',url:Plumbingmain,color:'#f0a771', price: '$150',key:1},
        {name:'Electrician', url:electricianmain,color:'#9fc48d', price: '$60',key:4},
     
    ]
   function _renderItem ({item, index}) {
        return (
            <View style={{flex:1,borderRadius:10, backgroundColor:item.color,justifyContent:'space-between', width: windowWidth-36, flexDirection:'row',padding:15}}>
            <View style={{width:'58%'}}>
                <Text style={{fontSize:24,marginTop:15, fontWeight:'500',color:'white'}}>{item.name}</Text>
                <Text style={{color:'white',marginTop:8,fontSize:16}}>Starting at {item.price}  →</Text>
                </View>
              <View style={{ width: '40%',height:'85%', padding:10,marginBottom:-10,marginRight:-15,borderRadius:12, alignSelf:'flex-end'}}>
            <Image
                key={item.key}
                resizeMode='contain'
                style={{ width: '100%',height:'100%', alignSelf:'flex-end',  shadowColor:'#000',
                shadowOffset:{width:5,height:5},
                shadowOpacity:0.3,
                shadowRadius:2}}
                source={item.url}
            />
    </View>
            </View>
        )
    
    }
    return(
     
             <View style={{ flex:1, height:150, borderRadius:10,
    shadowColor: palette.grey,
    shadowOffset:{width:4,height:5},
    shadowOpacity:0.3,
    shadowRadius:4,
    
    elevation: 6,}}>
                           <Carousel
  ref={(c) => { this._carousel = c; }}
  data={photo}
  onSnapToItem={(i)=>setInactive(i)}
  renderItem={_renderItem}
  sliderWidth={windowWidth}
  itemWidth={windowWidth}
  autoplay={true}
  loop={true}
/>  
<View style={{ position: 'absolute', flexDirection: 'row', bottom: 10, alignSelf: 'center' }}>
                                    {
                                        photo.map((e, index) =>
                                                <Text
                                                    key={e.key}
                                                    style={inactive == index ? { color: palette.white,fontSize:12,  margin: 3 } : { color: palette.grey,fontSize:12, margin: 3 }}
                                                >
                                                    ●
                                                </Text>
                                        )
                                    }
                                </View> 
                                    {/* {
                                        photo.map((e, index) =>
                                        <View style={{backgroundColor:e.color,justifyContent:'space-between', width: windowWidth-36,flexDirection:'row',padding:15}}>
                                            <View style={{width:'48%'}}>
                                                <Text style={{fontSize:24,marginTop:15, fontWeight:'500',color:'white'}}>{e.name}</Text>
                                                <Text style={{color:'white',marginTop:8,fontSize:16}}>Starting at {e.price}  →</Text>
                                                </View>
                                              
                                            <Image
                                                key={e.key}
                                                resizeMode='contain'
                                                style={{ width: '35%',height:'85%',backgroundColor:'white',marginBottom:-20,marginRight:-25,borderRadius:12, alignSelf:'flex-end'}}
                                                source={e.url}
                                            />
                      
                                            </View>


                                        )
                                    }
                                </ScrollView>
                                <View style={{ position: 'absolute', flexDirection: 'row', bottom: 10, alignSelf: 'center' }}>
                                    {
                                        photo.map((e, index) =>
                                                <Text
                                                    key={e.key}
                                                    style={inactive == index ? { color: palette.white,fontSize:12,  margin: 3 } : { color: palette.grey,fontSize:12, margin: 3 }}
                                                >
                                                    ●
                                                </Text>
                                        )
                                    }
                                </View> */}

                            </View>
      
    )
}
export default ImageCrousal;