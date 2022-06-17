import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { openingpage1, Right, Search } from "../../../assets";
import { Input, SearchInput } from "../../../components";
import { palette } from "../../../theme";
import style from "./style";
import { getService } from '../../../store/actions/Profile.action'
import { useDispatch } from 'react-redux'
const HomePage = (props) => {
    const dispatch = useDispatch()
    const [ref, setRef] = React.useState()
    const [selectIndex, setSelectIndex] = React.useState(0)
    const [serviceData, setServicesData] = useState([])
    React.useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const res = await dispatch(getService())
        if (res.status === true) {
            console.log(res.data[0].data)
            setServicesData(res.data[0].data)
        }
    }
    const getItemLayout = (data, index) => {
        console.log(index, "height")
        return ({
            length: 165,
            offset: 270 * index,
            index
        })
    }
    const onChange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.y / (nativeEvent.layoutMeasurement.width - 130));
            console.log(slide)
            setSelectIndex(slide)
        }
    }
    return (
        <View style={style.container}>
            <ScrollView
                style={{ marginTop: 80 }}
                ref={(ref) => setRef(ref)}
                scrollEventThrottle={16}
                onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                onLayout={(data, index) => getItemLayout(data, index)}
                nestedScrollEnabled={true}

            >
                <Text style={style.headerText}>Taking care of your home has never been easier</Text>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.4} style={style.searchBarContainer} onPress={()=>props.navigation.navigate('SearchFilter')}>
                        <Text>Service | Address | Date and time</Text>
                        <Image
                            source={Search}
                            resizeMode='contain'
                            style={{ height: 35, width: 35 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={style.topImageContainer}>
                    <Image
                        source={openingpage1}
                        resizeMode='cover'
                        style={{ height: '100%', width: '100%' }}
                    />
                </View>
                <View style={{ flex: 1, marginTop: 20 }} >
                    <Text style={{ fontSize: 18,marginLeft:10}}>Search and compare with no commitment. Then book and see how easy it is!</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            serviceData.map((item, index) =>
                                <View style={style.servicesContainer}>
                                    <Image
                                        key={index}
                                        source={{ uri: item.url }}
                                        resizeMode='contain'
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                            )
                        }

                    </ScrollView>
                </View>
                <View>
                </View>

            </ScrollView>
        </View>
    )
}
export default HomePage