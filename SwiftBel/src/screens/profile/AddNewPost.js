import * as React from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView,Animated, Dimensions, SafeAreaView, Platform } from 'react-native';
import { palette } from '../../theme';
import MainHeader from '../../components/Header/MainHeader/MainHeader';
import { Etc } from '../../assets';
import Style from './Style';
import { Input } from '../../components';
import BottomButton from '../ServiceProvider/components/BottomButton';
import {UploadPost,getPostData} from '../../store/actions/Profile.action'
import Constants from '../../utils/Constant';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useSelector, useDispatch } from 'react-redux'
const AddNewPost=(props)=>{
    const dispatch = useDispatch();
  const [inactive,setInactive] =React.useState(0)
  const [isIndicator, setIsIndicator] = React.useState(false)
  const profileData = useSelector(state => state.Profile)
  const [caption,SetCaption]=React.useState('')
  const {data}=props.route.params
        const onChange=(nativeEvent)=>{
            if(nativeEvent){
                const slide=Math.ceil(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width);
                if(slide !=inactive){
                    setInactive(slide)
                }
            }
        }
        const onChangeCaption=(text)=>{
            SetCaption(text)
        }
    React.useEffect=(()=>{
        console.log(props,"hiii")
    },[])
    const onAddNewPost=async()=>{
        console.log(data,"dattaaaa")
        const details={
            img:data,
            caption:caption
        }
        setIsIndicator(true)
      const res=  await dispatch(UploadPost(details));
if(res.status==true)
{
    await dispatch(getPostData());
    props.navigation.navigate('ProfileIndex')
    setIsIndicator(false)
}
else
{
    setIsIndicator(false)
}
  
    }
 return(
    <SafeAreaView style={{backgroundColor:'white',flex:1}}> 
     <MainHeader
                centerText='Move On'
                leftText="Back"
                RightImage={Etc}
                onleftClick={() => props.navigation.goBack()}
                customStyle={Style.NewpostHeader}
            />
       <View style={{width:windowWidth,height:windowHeight*0.45}}>
        <ScrollView
        onScroll={({nativeEvent})=>onChange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
       style={{width:windowWidth,height:windowHeight*0.45}}
        >
            {
                data.map((e,index)=>
                    <Image
                    key={e.path}
                    resizeMode='cover'
                    style={{width:windowWidth,height:windowHeight*0.45}}
                    source={{uri:e.path}}
                    />    
                )
            }
        </ScrollView>
        <View style={{position:'absolute',flexDirection:'row',bottom:0,alignSelf:'center'}}>
            {
                data.map((e,index)=>
                data.length ==1?null:
                <Text
                key={e.path}
                style={inactive==index?{color:palette.pink,margin:3}:{color:palette.grey,margin:3}}
                >
                    ●
                </Text>
                )
            }
        </View>
        
       </View>
       <Input
       placeholder={'write a caption '}
       onChangeText={(text) => onChangeCaption(text)}
       inputStyle={{ borderWidth:0,height:windowHeight-600}}
       inputContainerStyle={{height:Platform.OS==='ios'?300:50,width:windowWidth-600,marginTop:20}}
       multiline={true}
       />
       <Text style={{alignSelf:'flex-end',marginRight:20,color:palette.grey}}>0/500</Text>
    <BottomButton
     leftButtonText={"Cancel"}
     rightButtonText={Constants.Authentication.continue}
     onPressLeft={() => props.navigation.goBack()}
     onPressRight={() => onAddNewPost()}
     rightIndicator={isIndicator}

    />
    </SafeAreaView>
    )
}
export default AddNewPost;