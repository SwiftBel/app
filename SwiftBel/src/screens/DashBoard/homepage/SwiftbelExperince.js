import React from "react";
import { char1, char2, char3, char4 } from "../../../assets";
import {View,Image,Text} from 'react-native'
import style from "./style";
function SwiftbelExperince(){
    const data=[
      //  {

        // title:'FRAUD PROTECTION',
        // subTitle:'Save money',
        // image:char1,
        // description:'Say goodbye to hidden charges and protect your move from fraud with our transparent pricing and comprehensive protection plan.​',
        // class:'char1 mb-4',
        // alt:'fraud protection',
        // },
        {
        title:'FREE CANCELLATION',
        subTitle:'Flexibility',
        image:char1,
        description:'You have the flexibility to cancel any reservation, at no charge, up to 24 hours before the booking.',
        class:'char2 mb-4',
        alt:'Free cancellations',
        },
        {
        title:'SWIFTBEL GUARANTEE',
        subTitle:'Security',
        image:char3,
        description:'Don’t stress. If there is a problem with your home service provider, we will help solve it and can reimburse damages up to $1,000.*​',
        class:'char3 mb-4',
        alt:'SwiftBel Guarantee',
        },
        // {
        // title:'LIVE TRACKING',
        // subTitle:'Peace of mind',
        // image:char4,
        // description:`With live tracking, you can see your mover’s location, travel time, and work time with the push of a button.`,
        // class:'char4 mb-4',
        // alt:'live tracking on SwiftBel app ',
        // }
        ]
    return(
     data.map((item)=>
     <View>
         <View style={{flexDirection:'row',marginBottom:20,marginRight:30}}>
         <Image style={{width:35,height:36,marginTop:10}} source={item.image}/>
         <View>
         <Text style={style.text}>{item.title}</Text>
         <Text style={style.subtext}>{item.description}</Text>
         </View>
         </View>
     </View>
     )
    )
}
export default SwiftbelExperince;