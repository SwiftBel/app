
import * as React from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View,Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Calgary, Edmonton, Hamilton, Mississauga, Montreal, Ottawa, Toronto, Vancouver, Winnipeg } from '../../../assets';
import Style from './style'
const { width, height } = Dimensions.get('screen');

// const data = [...Array(20).keys()].map(() => ({
 
// }));
const data=[
    {
        name:"Toronto",
        url:Toronto
      },
   
  {
    name:"Calgary",
    url:Calgary
  },
  {
    name:"Vancouver",
    url:Vancouver
  },
  {
    name:"Edmonton",
    url:Edmonton
  },
  {
    name:"Hamilton",
    url:Hamilton
  },
  {
    name:"Mississauga",
    url:Mississauga
  },
  {
    name:"Montreal",
    url:Montreal
  },
  {
    name:"Ottawa",
    url:Ottawa
  },

  {
    name:"Winnipeg",
    url:Winnipeg
  }
]

const _colors = {
  active: `#FCD259ff`,
  inactive: `#FCD25900`,
};
const _spacing = 20;

export default function PlaceCrousal(props) {
  const ref=React.useRef(null);
  const [index,setIndex]=React.useState(0)
  const dispatch=useDispatch()
//   const onChange = (nativeEvent) => {
//     console.log(nativeEvent)
//     if (nativeEvent) {
//         const slide = Math.ceil(nativeEvent.contentOffset.y / (nativeEvent.layoutMeasurement.width));
       
//         setIndex(slide)
//     }
// }


// const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 0 })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginBottom:30,marginTop:20 }}>
      <FlatList
      ref={ref}
        style={{ flexGrow: 0 }}
        data={data}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity onPress={() => props?.onselect()}>
              <View style={Style.PlaceContainer} >
                    <Image
                        key={index}
                        source={item.url}
                        resizeMode='contain'
                        style={{ width: 110, height: 110, }}
                    />
                    <Text style={{fontSize:16,fontWeight:'500'}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}