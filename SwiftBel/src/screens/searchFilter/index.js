import * as React from 'react';
import {
    Input, RippleButton, ProfileHeader
} from '../../components/index'
import { StatusBar, View, Text } from 'react-native';
import Style from './Style'
import Constants from '../../utils/Constant';
import { palette } from '../../theme';
import { useDispatch } from 'react-redux'
import { addBussinessName, getService } from '../../store/actions/Profile.action'
import KeyBoardAvoidingWrapper from '../../components/KeyBoardAvoidingWrapper';
import DateTimePicker from '../../components/DatePicker/DateTimePicker';
import MapSearchInput from '../../components/MapSearchInput';
import CalendarPicker from 'react-native-calendar-picker';
import ServiceModal from '../../components/ServiceModal/ServicesModal';
import TimePicker from '../../components/TimePicker/TimePicker';
const SearchFilter = (props) => {
    const dispatch = useDispatch();
    const [dateTime, setdateTime] = React.useState(new Date())
    const [serviceData, setServiceData] = React.useState([])
    const [address, setAddress] = React.useState('')
    const [service, setService] = React.useState('')
    const [time, setTime] = React.useState('')
    React.useEffect(() => {
        init()
    }, [])
    const init = async () => {
        const res = await dispatch(getService())
        if (res.status === true) {
            console.log(res.data[0].data)
            setServiceData(res.data[0].data)
        }
    }
    const onSubmit = () => {
        const data = {
            dateTime: dateTime,
            time:time,
            address:address,
            service:service
        }
        props.navigation.navigate('CompanyFilter',{
            data:data
        })
    }
    return (
        <View style={Style.container}>
            <StatusBar barStyle='dark-content' />
            <KeyBoardAvoidingWrapper style={Style.container}>
                <View style={{ marginTop: 80 }}>
                    <ServiceModal
                        headerName={'Home Service'}
                        data={serviceData}
                        value={service}
                        buttonStyle={{ width: '93%' }}
                        onChange={(item) => {
                            setService(item.name)
                        }}
                        onCancel={() => setModalVisible(false)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 30 }}>
                        <DateTimePicker
                            headerName={'Date'}
                            buttonStyle={{ width: '100%' }}
                            DateContainerStyle={{ marginBottom: 10, width: '48%' }}
                            value={dateTime}
                            OnSelectedDate={(date) => console.log(date)}
                            onChange={(date) => setdateTime(date)}
                        />
                        <TimePicker
                            placeholder={'Select'}
                            headerName={'Time'}
                            buttonStyle={{ width: '100%' }}
                            DateContainerStyle={{ marginBottom: 10, width: '48%' }}
                            value={time}
                            OnSelectedDate={(date) => console.log(date)}
                            onChange={(date) => setTime(date)}
                        />
                    </View>
                    <Text style={Style.headerName}>{"Home Address"}</Text>
                    <View style={Style.dragView}>
                        <MapSearchInput
                            onPress={(data) => setAddress(data)}
                            //onLocation={(location) => onLocation(location)}
                            placeholder={'Where would you like the service?'}
                            textInputStyle={{ borderWidth: 1, borderColor: palette.lightGrey, height: 50, marginLeft: -8 }}
                        />
                    </View>

                </View>
            </KeyBoardAvoidingWrapper>
            <View style={Style.bottomContainer}>
                <RippleButton
                    buttonView={{ alignItems: 'center' }}
                    ButtonText={"Back"}
                    buttonTextStyle={{ color: palette.grey }}
                    button={Style.backButton}
                    onPress={() => props.navigation.goBack()}
                />
                <RippleButton
                    buttonView={{ alignItems: 'center', paddingLeft: 30 }}
                    ButtonText={"Search"}
                    buttonTextStyle={[Style.buttonText,
                    { color: address && service && dateTime && time ? palette.white : palette.black }]}
                    button={[Style.button,
                    { backgroundColor: address && service && dateTime && time ? palette.black : palette.smokeWhite }]}
                    onPress={() => onSubmit()}
                    isDisable={address && service && dateTime && time ? false : true}
                />

            </View>
        </View>
    );
}
export default SearchFilter;