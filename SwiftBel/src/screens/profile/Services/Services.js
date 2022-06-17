import React, { useCallback, useState } from 'react'
import {
  Text, View, FlatList, TouchableOpacity, SectionList, Image
} from 'react-native'
import Style from './Style'
import { palette } from '../../../theme'
  const Services = (props) => {
      const {data}=props
      console.log(data,"data")
    return (
      <View style={Style.ServiceRenderContainer}>
       
          <Image
          source={{uri:data?.url}}
          resizeMode='contain'
          style={{
              width:'100%',
              height:'100%'
          }}
          />

      </View>
    )
  }
  
export default Services;