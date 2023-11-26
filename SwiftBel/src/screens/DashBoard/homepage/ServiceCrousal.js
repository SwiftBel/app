

import * as React from 'react';
import { FlatList, Text, TouchableOpacity, View,Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { getService } from '../../../store/actions/Profile.action';
import Style from './style'
const _spacing = 20;

export default function ServiceCrousal(props) {
  const ref=React.useRef(null);
  const [index,setIndex]=React.useState(0)
  const [serviceData, setServicesData] = React.useState([])
  const dispatch=useDispatch()
  React.useEffect(() => {
    init()
}, [])

const init = async () => {
    const res = await dispatch(getService())
    if (res.status === true) {
        console.log(res.data[0].data)
        setServicesData(res.data[0].symbol)
    }
}
  return (
    <View style={Style.serviceCrousalContainer}>
      <FlatList
      ref={ref}
        style={{ flexGrow: 0 }}
        data={serviceData}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity onPress={() => props.navigation.navigate("LocationTraker")}>
              <View style={Style.servicesContainer} >
                    <Image
                        key={index}
                        source={{ uri: item.greyurl }}
                        resizeMode='contain'
                        style={Style.serviceImg}
                    />
                    <Text style={{fontWeight:'500'}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}