import React from 'react';
import { Animated, Text, View,Dimensions,Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import { openingpage1, Search } from '../../assets';
import { palette } from '../../theme';
import Style from './Styles'
const screenwidth = Dimensions.get('screen').width
const screenheight = Dimensions.get('screen').height
 class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(50),  
    fadeAnim2: new Animated.Value(300),
    isTrue:false
  }

  componentDidMount() {
  }

  animatebutton() {
      Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: screenheight,                
        duration: 500,              // Make it take a while
      }
    ).start();   
    Animated.timing(                  // Animate over time
        this.state.fadeAnim2,            // The animated value to drive
        {
          toValue: screenwidth,                
          duration: 500,              // Make it take a while
        }
      ).start();   
                            // Starts the animation
  }

  animatebuttonClose() {
    Animated.timing(                  // Animate over time
    this.state.fadeAnim,            // The animated value to drive
    {
      toValue: 50,                
      duration: 300,              // Make it take a while
    }
  ).start();  
  Animated.timing(                  // Animate over time
    this.state.fadeAnim2,            // The animated value to drive
    {
      toValue: 300,                
      duration: 500,              // Make it take a while
    }
  ).start();      
                          // Starts the animation
}

  render() {
    let { fadeAnim,fadeAnim2 } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          height: fadeAnim, 
          width : fadeAnim2,borderRadius:15 ,
          shadowColor: palette.lightGrey,
          shadowOffset: { width: 10, height: 10 },
          elevation:19,
          shadowOpacity: 2,
          shadowRadius: 4,
     
    justifyContent:'center',  
    alignSelf:'center',
  
  
flex:1
        }}
      >
         
        {this.props.children}
      
      </Animated.View>
    );
  }
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default class BottomApp extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  animatebutton(){
    this.fade.animatebutton();
  }

  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', position:'absolute', width:'100%',  justifyContent: 'center',zIndex:100000000}}>
      <View style={{flex: 1, alignItems: 'center',  justifyContent: 'center',zIndex:100000000}} >
       
            
          
       <FadeInView style={{backgroundColor: 'lightblue'}} ref={ani => this.fade = ani}>

                    <TouchableOpacity activeOpacity={0.4} style={[Style.searchBarContainer,]} onPress={()=>this.fade.animatebutton()}>
                        <Text>Service | Address | Date and time</Text>
                        <Image
                            source={Search}
                            resizeMode='contain'
                            style={{ height: 35, width: 35 }}
                        />
                    </TouchableOpacity>

        <ScrollView>
        <Button title="go animate" onPress={() => this.fade.animatebuttonClose()}/>
        <View style={Style.topImageContainer}>
                    <Image
                        source={openingpage1}
                        resizeMode='cover'
                        style={{ height: '100%', width: '100%' }}
                    />
                </View>
        </ScrollView>
        </FadeInView>
       
      </View>
      </View>
    )
  }
}