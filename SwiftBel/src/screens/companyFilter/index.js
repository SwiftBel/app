import moment from "moment";
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { Back, chevrondown, Chevronleft, favourate, priceSearch, star } from "../../assets";
import { Button, ButtonWithIcon, RippleButton } from "../../components";
import { palette } from "../../theme";
import Style from './Style'
const CompanyFilter = (props) => {
    const { data } = props.route.params
    const dataList = [
        {
            name: 'SwiftBel',
            tagLine: 'We make sure to move you on time!',
            language: 'English, Ukrainian, Russian',
            banner: 'https://myawsbucket-swiftbel.s3.ca-central-1.amazonaws.com/test1/1649827692112i.png'
        },
        {
            name: 'You Move Me',
            tagLine: 'We make sure to move you on time!',
            language: 'English, Hindi, French',
            banner: 'https://myawsbucket-swiftbel.s3.ca-central-1.amazonaws.com/test1/1654669647797IMG_0009.JPG'

        }
    ]
    const renderItems = ({ item }) => {
        return (
            <View style={{ marginTop: 20, backgroundColor: palette.white }}>
                <View style={Style.bannerContainer}>

                    <Image
                        source={{ uri: item.banner }}
                        resizeMode='cover'
                        style={Style.bannerImage_Style}
                    />
                    <View style={{ height: 25,position: 'absolute', top: 20, left: 20,flexDirection:'row' ,alignItems:'center'}}>
                        <Image
                            source={star}
                            resizeMode='contain'
                            style={{ height: 25, width: 25 }}
                        />
                        <Text style={{fontSize:16}}> 4.5Rating</Text>
                    </View>
                    <View style={{ height: 35,position: 'absolute', top: 7, right: 20,}}>
                        <Image
                            source={favourate}
                            resizeMode='contain'
                            style={{ height: 55, width: 55 }}
                        />
                       
                    </View>
                </View>

                <View style={Style.profileContainer}>
                    <View style={Style.profileButton}>

                        <Image
                            source={{ uri: item.banner }}
                            resizeMode='cover'
                            style={Style.profileImage}
                        />
                    </View>
                </View>
                <Text style={Style.companyNameText}>{item.name}</Text>
                <Text style={Style.MottoText}>{"We make sure to move you on time!"}</Text>
                <Text style={Style.languageText}>{item.language}</Text>
                <RippleButton
                  buttonView={{ alignItems: 'center' }}
                  ButtonText={"View Pricing"}
                  buttonTextStyle={{fontSize:18,textAlign:'center'}}
                  button={{borderWidth:1,height:44,width:289,justifyContent:'center',marginBottom:20,marginTop:20}}
                  onPress={() => onselect()}
                  //isDisable={props.isDisable}
                 // indicator={props.rightIndicator}
                />
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: palette.lightGrey }}>
            <View style={{ height: 110, backgroundColor: palette.white }}>
                <View style={{ marginTop: 50, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => props.navigation.goBack()}>
                        <Image
                            source={Back}
                            resizeMode='contain'
                            style={{ height: 20, width: 20, marginLeft: 10, }}
                        />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>{data.service}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>{`${data.address.description} `}</Text>
                            <Text>{moment(data.dateTime).format('DD/MM')}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList
                data={dataList}
                renderItem={renderItems}
                showsVerticalScrollIndicator={false}
            />
             <ButtonWithIcon
             imageSource={priceSearch}
             imageStyle={{width:25,height:25}}
              ButtonLeftText="Price your service"
              buttonLeftTextStyle={{fontSize:18,textAlign:'center',color:palette.white,marginLeft:10}}
              ButtonStyle={{height:65,width:289,borderRadius:35, justifyContent:'center',marginBottom:20,alignItems: 'center',position:'absolute',bottom:0,right:50 ,backgroundColor:palette.pink,flexDirection:'row'}}
              onClick={() => onleftClick()} 
                />
            </View>
        
    )
}
export default CompanyFilter