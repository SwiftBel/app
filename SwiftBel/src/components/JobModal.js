import React, { useState } from "react";
import { Button, Text, View ,TouchableOpacity, Image} from "react-native";
import Modal from "react-native-modal";
import { Cross } from "../assets";
import { palette } from "../theme";
import Lottie from 'lottie-react-native';
function ModalTester(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{  }}>
      

      <Modal isVisible={props?.isModalVisible}>
        <View style={{ backgroundColor:palette.white,height:360,borderRadius:10 }}>
        <View >
                            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderColor: palette.lightGrey, marginBottom: 30 }}>
                                <TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', left: 10, top: 15 }}>
                                    <Image
                                        source={Cross}
                                        resizeMode='contain'
                                        style={{ height: 25, width: 25 }}
                                    />
                                </TouchableOpacity>
                                <Text style={{fontSize:18,fontWeight:'500',}}>{"Booking done"}</Text>
</View>
                            </View>
          <Lottie style={{width:100,height:100,alignSelf:'center'}} source={{uri:'https://assets5.lottiefiles.com/packages/lf20_JeHdhTHeLY.json'}}/>
<Text style={{textAlign:'center',fontSize:18,fontWeight:'500',color:palette.pink}}>Booking request sent</Text>
<Text style={{textAlign:'center',fontSize:14,color:palette.grey, padding:10}}>We will send an email once the service provider confirms the booking </Text>
      
      <TouchableOpacity onPress={()=>props.navigation.navigate('DashBoard')} style={{width:'90%',alignSelf:'center',borderWidth:1,borderRadius:10,borderColor:palette.pink,marginTop:20, height:60,justifyContent:'center',alignItems:'center',backgroundColor:palette.babyPink}}>
        <Text style={{color:palette.pink}}>Go to dashboard</Text>
      </TouchableOpacity>
        </View>

      </Modal>
    </View>
  );
}

export default ModalTester;