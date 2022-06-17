import * as React from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { palette } from '../../../theme';
import Styles from './Styles';
import { Rating, AirbnbRating } from 'react-native-ratings';
import moment from 'moment';
const Languages = (props) => {
    const { data } = props
    console.log(data,"><><><<><<")
    return (
        <View
            style={Styles.container}>
            <View style={Styles.reviewContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={Styles.logoContainer}>
                        <Image
                            source={{ uri: data?.profileImage }}
                            resizeMode='cover'
                            style={Styles.image_Style}
                        />
                    </View>
                    <Text style={Styles.nameText}>{data?.reviewerName?data.reviewerName: "_"}</Text>
                </View>
                <Text style={{ color: palette.grey }}>{moment(data.reviewedAt).format("DD/MM/YYYY")}</Text>
            </View>
            <AirbnbRating
                defaultRating={5}
                
                starContainerStyle={{
                    alignSelf: 'flex-start',
                    marginLeft: 10
                }}
                count={5}
                selectedColor={palette.pink}
                showRating={false}
                isDisabled={true}
                size={15}
            />
            <Text style={Styles.comentText}>
                {data.review}
            </Text>
        </View>
    )
}
export default Languages;