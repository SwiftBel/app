import React, { useEffect, useState } from 'react';
import { Image, View,Text,Animated } from 'react-native';
import { MotiView } from 'moti';
import styles from './StylesScreenSplash';
import { loader, Logo, LogoName } from '../../../assets';

import TextAnimator from './TextAnimator';
import { palette } from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';



function ScreenSplash(props) {
  const [animate,setAnimated]=useState(new Animated.Value(0))
  const time = 2500;
  const text=['S','w','i','f','t','B','e','l']
  const[index,setindex]=useState(false)
  useEffect(() => {
    setTimeout(() => {
   props.navigation.navigate('DashBoard')
    }, time);
  }, []);

 
  return (
      <View style={styles.container}>
       
        { <MotiView
      from={{
        opacity: 0,
        scale: 3,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: 'spring',
        duration: time,
        scale:{
          type:'spring',
          delay:100
        }
      }}
      
      style={styles.shape}
    >
   <Image
   source={loader}
   style={styles.logoStyle}
   />
    </MotiView>}
    {/* <LinearGradient 
    start={{x:0,y:1}}
    end={{x:1,y:0}}
    colors={[
      '#D81159', '#EB873F','#FFCF23'
    ]}
    > */}
    <TextAnimator
        content='SwiftBel'
        textStyle={{fontSize:65,marginTop:10,fontWeight:'500', color:palette.pink}}
        // textStyle={styles.textStyle}
        // style={styles.containerStyle}
        duration={1200}
        onFinish={()=>{}}
      />
  
      </View>
      
  );
}

export default ScreenSplash;
