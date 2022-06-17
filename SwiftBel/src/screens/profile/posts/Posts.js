import * as React from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView,Animated } from 'react-native';
import PostLoader from './PostSimmerEffect';
import PostStyle from './PostStyle';
const Posts=(props)=>{
    const {data,item,index,Loader}=props
    const [tab1Data] = React.useState(Array(40).fill(0));
    React.useEffect=(()=>{
        console.log(props,"hiii")
    },[])
    console.log(Loader)
 return(
    <TouchableOpacity  style={PostStyle.container} onPress={()=>props.navigation.navigate(
        'Profile',{
            postData:data,
            index:index
        }
    )}>
    <Image
    source={{uri:item.photos[0]}}
    resizeMode='cover'
    style={PostStyle.postImage}
    />
    
    </TouchableOpacity>
    )
}
export default Posts;