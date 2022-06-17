import * as React from 'react';
import { View, Image, Text, FlatList, Dimensions, ScrollView } from 'react-native';
import { Etc } from '../../../assets';
import MainHeader from '../../../components/Header/MainHeader/MainHeader';
import { palette } from '../../../theme';
import PostStyle from './PostStyle';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
const PostsList = (props) => {
    const profileData = useSelector(state => state.Profile)
    const [inactive, setInactive] = React.useState(0)
    const onChange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != inactive) {
                setInactive(slide)
            }
        }
    }
    const getItemLayout = (data, index) => {
        return ({
            length: windowHeight / 1.55,
            offset: windowHeight / 1.55 * index,
            index
        })
    }
    const { postData, index } = props.route.params
    console.log(profileData.postData, "dataa")
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}
        >
            <MainHeader
                centerText='Move On'
                leftText="Back"
                RightImage={Etc}
                onleftClick={() => props.navigation.goBack()}
                customStyle={PostStyle.postHeader}
            />

            <FlatList
                data={profileData.postData}
                getItemLayout={(data, index) => getItemLayout(data, index)}
                initialScrollIndex={index}
                scrollto
                renderItem={({ item, index }) => {
                    console.log(item, "itemm")
                    return (
                        <View>
                            <View style={{ width: windowWidth, height: windowHeight * 0.45 }}>
                                <ScrollView
                                    onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    pagingEnabled
                                    style={{ width: windowWidth, height: windowHeight * 0.45 }}
                                >
                                    {
                                        item.photos.map((e, index) =>
                                            <Image
                                                key={e}
                                                resizeMode='cover'
                                                style={{ width: windowWidth, height: windowHeight * 0.45 }}
                                                source={{ uri: e }}
                                            />


                                        )
                                    }
                                </ScrollView>
                                <View style={{ position: 'absolute', flexDirection: 'row', bottom: 0, alignSelf: 'center' }}>
                                    {
                                        item.photos.map((e, index) =>
                                            item.photos.length == 1 ? null :
                                                <Text
                                                    key={e.path}
                                                    style={inactive == index ? { color: palette.pink, margin: 3 } : { color: palette.grey, margin: 3 }}
                                                >
                                                    ●
                                                </Text>
                                        )
                                    }
                                </View>

                            </View>
                            <Text style={PostStyle.dateText}>{moment(item.date).format('DD/MM/YYYY')}</Text>
                            <Text style={PostStyle.captionText}>{item.comment}</Text>
                        </View>
                    )
                }}
            />
        </View>)
}
export default PostsList;