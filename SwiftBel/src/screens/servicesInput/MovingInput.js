import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { chevrondown, Cross, Delete } from '../../assets'
import { palette } from '../../theme'
import InputPicker from '../../components/InputPicker/InputPicker'
import styles from './Style'
import { Input, RippleButton } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getMovingInputDetails } from '../../store/actions/Profile.action'
import MapSearchInput from '../../components/MapSearchInput'
import moment from 'moment'
import { ElevatorOptions, houseoptions, SizeOptions, Timelist } from './Components/listofFormData'
import RnIncrementDecrementBtn from '../../components/IncrementDecrementBtn/IncrementDercrementbtn'
import { TimeList } from '../searchFilter/utils/ListComponent'
import CalendarPicker from 'react-native-calendar-picker'
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { parseInt } from 'lodash'
import PhoneInpuField from '../../components/PhoneInput/PhoneInput'
const MovingInput = props => {
    const { startingAdress, destinationAdress, serviceProviderData, distance } = useSelector(state => state.Profile)
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [indicator, setIndicator] = useState(false)
    const [selectIndex, setSelectIndex] = React.useState(distance >= 75 ? 2 : 0)
    const [modalIndex, setModalIndex] = useState()
    const [dateTime, setdateTime] = React.useState(`${new Date()}`)
    const [modalHeight, setModalHeight] = useState('74%')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const sheetRef = React.useRef(null);

    const snapPoints = React.useMemo(() => ["35%", "35%", modalHeight], []);

    const handleSheetChange = React.useCallback((index) => {
        console.log("handleSheetChange", index);
        setModalIndex(index)
    }, []);
    const handleSnapPress = React.useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleSnapClose = React.useCallback((index) => {
        sheetRef.current?.close();
    }, []);
    const [values, setValues] = useState({
        "typeofHouse": "Condo",
        "approxSizeInSqFt": "500 to 1,200 ",
        "numberOfRooms": "2",
        "elevatorAvailable": "Shared elevator",
        "fromAddress": startingAdress?.description?.description,
        "date": moment(new Date()).format('DD MMM YYYY'),
        "time": "10:00 AM",
        "toAddress": destinationAdress?.description?.description,
        "movers": 129,
        "typeOfMove": 'twoMoverthreeTonTruck'
    })
    const [Bool, setBool] = useState({
        "condo": false,
        "size": false,
        "rooms": false,
        "elevator": false,
    })




    const close = () => {
        setModalVisible(false)

    }


    const onselect = async () => {
        let res
        const moverOnlyData = {
            "fromAddress": values.fromAddress,
            "numberOfMovers": values.numberOfRooms,
            "date": values.date,
            "time": values.time
        }
        setIndicator(true)
        if (selectIndex === 1) {
            res = await dispatch(getMovingInputDetails(moverOnlyData))
        }
        else if (selectIndex === 2) {
            res = await dispatch(getMovingInputDetails({ ...values, "phone": phoneNumber, "name": name }))
            return
        }
        else {
            res = await dispatch(getMovingInputDetails(values))
        }
        if (res.status) {
           // handleSnapClose()
            props.navigation.navigate('Estimate')
        }
        else {
            Alert.alert(
                "Error",
                `${res.message}`)
        }

        setIndicator(false)
    }
    const handlebool = (type) => {
        if (type === 'condo') {
            setBool({ ...Bool, condo: !Bool.condo, size: false, rooms: false, elevator: false })
        }
        else if (type === 'size') {
            setBool({ ...Bool, size: !Bool.size, condo: false, rooms: false, elevator: false })
        }
        else if (type === 'rooms') {
            setBool({ ...Bool, rooms: !Bool.rooms, size: false, condo: false, elevator: false })
        }
        else if (type === 'elevator') {
            setBool({ ...Bool, elevator: !Bool.elevator, size: false, rooms: false, condo: false })
        }

    }
    const handlechange = (name, value) => {
        console.log(value)
        if (name === 'date') {
            setValues({ ...values, [name]: moment(value).format('DD MMM YYYY') })
        }
        else {
            setValues({ ...values, [name]: value })
        }
         if (name === 'approxSizeInSqFt') {
            const mover = value === 'Less than 500' || value === '500 to 1,200 ' ? 129 : value=== '1,200 to 2,000 ' || value === '2,000 to 3,000 ' ? 169 : 210
    
            setValues({ ...values, [name]: value, "movers": mover, "typeOfMove": mover === 129 ? 'twoMoverthreeTonTruck' : mover === 169 ? 'threeMoverFiveTonTruck' : 'fourMoverFiveTonTruck' })
            console.log(mover,name,"dnkd")
        }
        if (name === 'typeofHouse') {
            setBool({ ...Bool, condo: !Bool.condo })
        }
        else if (name === 'approxSizeInSqFt') {
            setBool({ ...Bool, size: !Bool.size })
        }
        else if (name === 'elevatorAvailable') {
            setBool({ ...Bool, elevator: !Bool.elevator })
        }

    }
    useEffect(() => {
        handleSnapPress(props?.isVisible)
    }, [props?.isVisible])

    const renderOptionList = () => {

        return (

            <View style={[styles.optionContainer, props.optionContainer]}>


                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: palette.smokeWhite, borderRadius: 8 }}>
                        <TouchableOpacity onPress={() => {
                            setSelectIndex(0)
                            props?.setTypeIndex(0)
                        }} style={{ height: 50, justifyContent: 'center', width: '50%', backgroundColor: selectIndex === 0 || selectIndex === 2 ? palette.black : palette.smokeWhite, borderRadius: 8, alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', color: selectIndex === 0 || selectIndex === 2 ? palette.white : palette.black, fontWeight: '500' }}>{selectIndex === 2 ? "Long distnace" : 'Local moving'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectIndex(1)
                            props?.setTypeIndex(1)
                        }} style={{ height: 50, justifyContent: 'center', width: '50%', backgroundColor: selectIndex === 1 ? palette.black : palette.smokeWhite, borderRadius: 8, alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', color: selectIndex === 1 ? palette.white : palette.black, fontWeight: '500' }}> Movers only</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ marginBottom: 150 }} showsVerticalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="always">
                    {selectIndex === 2 ? <View>
                            <Input
                                placeholder={"name"}
                                // onChangeText={(text) => setPassword(text)}
                                inputStyle={{ marginLeft: 20, borderRadius: 10,marginBottom:15 }}
                            // showHide={true}
                            //value={password}
                            //errorMessage={error}
                            />
                            <PhoneInpuField
                                header={false}
                                headerName={"Phone number *"}
                                PhoneInputContainer={{ height: 60, marginLeft: 40, marginRight: 20,marginBottom:15 }}
                                phoneInputStyle={{ borderRadius: 10,height: 60, }}
                                flagButtonStyle={{ borderRadius: 10, }}
                                onChangeFormattedText={(text) => {
                                    var cleaned = ("" + text).replace(/\D/g, "");
                                    handlechange('phone', cleaned)
                                }}
                                onChangeText={(text) => {
                                    console.log(text)
                                }}
                            //  value={values.phone}
                            />
                            </View> : null}
                        <View style={{ paddingHorizontal: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>

                            {/* <View style={styles.dragView}>
                                <Text style={{ margin: 5 }}>Starting Address</Text>
                                <MapSearchInput
                                    disableScroll={true}
                                    listView={{ height: 130, width: '97%', borderWidth: 1, marginLeft: 5, marginBottom: 10, borderRadius: 15, borderColor: palette.lightGrey }}
                                    onPress={(data) => setStartingAddress(data.description)}
                                    onLocation={(location) => console.log(location)}
                                    placeholder={'Starting Address'}
                                    textInputStyle={{ borderWidth: 1, borderColor: palette.lightGrey, height: 50 }}
                                />
                            </View>
                            <View style={styles.dragView}>
                                <Text style={{ margin: 5 }}>Destination</Text>
                                <MapSearchInput
                                    disableScroll={true}
                                    listView={{ height: 140, width: '97%', borderWidth: 1, marginLeft: 5, marginBottom: 10, borderRadius: 15, borderColor: palette.lightGrey }}
                                    onPress={(data) => setDestination(data.description)}
                                    onLocation={(location) => console.log(location)}
                                    placeholder={'Destination'}
                                    textInputStyle={{ borderWidth: 1, borderColor: palette.lightGrey, height: 50 }}
                                />
                            </View> */}
                            {/* <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, width: '95%', borderColor: palette.lightGrey, marginLeft: 10, marginBottom: 15 }}>
                                    <Text style={styles.headerText}>{" Type of home you're moving from"}</Text>
                                    <TouchableOpacity onPress={() => {
                                        handlebool('condo')
                                    }} style={[styles.PickerButton]}>
                                        <View style={styles.PickerButtonContainer}>
                                            <Text style={styles.PickerButtontext}>{values?.typeofHouse}</Text>
                                            <Image
                                                source={chevrondown}
                                                resizeMode='contain'
                                                style={styles.Icon}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View> */}

                            {/* {Bool.condo === true ?
                                    <View style={{ borderWidth: 1,flexDirection:'row',justifyContent:'space-between', padding: 10, borderRadius: 10, width: '95%', borderColor: palette.lightGrey, width: '95%', marginLeft: 10, marginBottom: 15 }}>

                                        {houseoptions?.map((item, index) => {
                                            return <TouchableOpacity style={{alignItems:'center', backgroundColor:values?.typeofHouse===item.name?palette.pink:'' ,padding:10,borderRadius:10}} onPress={()=>handlechange('typeofHouse',item.name)}>
                                                <Image source={item.img} style={{width:85,height:85,paddingBottom:10,borderRadius:10,
                                               
                                               }}/>
                                                <Text id={item} style={{ padding: 5,fontSize:16, color: values?.typeofHouse===item.name?palette.white:''}} key={index}  >{item.name} </Text>
                                            </TouchableOpacity>
                                        })}


                                    </View>
                                    : null} */}
                            {selectIndex !== 1 ? <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, width: '95%', borderColor: palette.lightGrey, marginLeft: 10, marginBottom: 15 }}>
                                <Text style={styles.headerText}>{"Home size you're moving from (Sq.Ft.)"}</Text>
                                <TouchableOpacity onPress={() => {
                                    handlebool('size')
                                }} style={[styles.PickerButton]}>
                                    <View style={styles.PickerButtonContainer}>
                                        <Text style={styles.PickerButtontext}>{values?.approxSizeInSqFt}</Text>
                                        <Image
                                            source={chevrondown}
                                            resizeMode='contain'
                                            style={styles.Icon}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View> : null}

                            {Bool.size === true ?
                                <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, width: '95%', borderColor: palette.lightGrey, width: '95%', marginLeft: 10, marginBottom: 15 }}>

                                    {SizeOptions?.map((item, index) => {
                                        return <TouchableOpacity onPress={() => handlechange('approxSizeInSqFt', item)}>
                                            <Text id={item} style={{ padding: 5 }} key={index}  >{item} </Text>
                                        </TouchableOpacity>
                                    })}


                                </View>
                                : null}
                            {/* <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, width: '95%', borderColor: palette.lightGrey, marginLeft: 10, marginBottom: 15 }}>
                                    <Text style={styles.headerText}>{"Dedicated elevator ?"}</Text>
                                    <TouchableOpacity onPress={() => {
                                        handlebool('elevator')
                                    }} style={[styles.PickerButton]}>
                                        <View style={styles.PickerButtonContainer}>
                                            <Text style={styles.PickerButtontext}>{values?.elevatorAvailable}</Text>
                                            <Image
                                                source={chevrondown}
                                                resizeMode='contain'
                                                style={styles.Icon}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View> */}
                               

                            {Bool.elevator === true ?
                                <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, width: '95%', borderColor: palette.lightGrey, width: '95%', marginLeft: 10, marginBottom: 15 }}>

                                    {ElevatorOptions?.map((item, index) => {
                                        return <TouchableOpacity onPress={() => handlechange('elevatorAvailable', item)}>
                                            <Text id={item} style={{ padding: 5 }} key={index}  >{item} </Text>
                                        </TouchableOpacity>
                                    })}
                                </View>
                                : null}
                        </View>
                      
                        <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, width: '90%', borderColor: palette.lightGrey, marginLeft: 20, marginBottom: 15 }}>
                            <Text style={styles.headerText}>{"Number of rooms"}</Text>
                            <View style={[styles.PickerButton]}>
                                <View style={styles.PickerButtonContainer}>
                                    <View style={{ borderWidth: 1, padding: 8, width: 50, borderRadius: 8, backgroundColor: palette.smokeWhite }}>
                                        <Text style={styles.PickerButtontext}>{values?.numberOfRooms}</Text>
                                    </View>
                                    <RnIncrementDecrementBtn
                                        minreq={2}
                                        max={7}
                                        handleClick={(item) => handlechange('numberOfRooms', item)}
                                        val={parseInt(values?.numberOfRooms)}
                                    />
                                </View>
                            </View>
                        </View>
                      
                        <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, width: '90%', borderColor: palette.lightGrey, marginLeft: 20, marginBottom: 15 }}>
                            <Text style={styles.headerText}>{"Moving date and Preferred time"}</Text>
                            <TouchableOpacity onPress={() => {
                                handlebool('rooms')
                            }} style={[styles.PickerButton]}>
                                <View style={styles.PickerButtonContainer}>
                                    <Text style={styles.PickerButtontext}>{`${values?.date}, ${values?.time}`}</Text>
                                    <Image
                                        source={chevrondown}
                                        resizeMode='contain'
                                        style={styles.Icon}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                        {Bool.rooms === true ? <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, width: '90%', borderColor: palette.lightGrey, marginLeft: 20, marginBottom: 15 }}>
                            <CalendarPicker
                                //onDateChange={onChange}
                                //scrollable={true}
                                // horizontal={true}
                                initialDate={values?.date}
                                onDateChange={(text) => handlechange('date', text)}
                                maxDate={"01/01/2050"}
                                minDate={new Date()}
                                //  selectedDisabledDatesTextStyle={{backgroundColor:'#fff'}}
                                selectedDayTextStyle={{ color: palette.white }}
                                // selectedDayColor={palette.white}
                                selectedDayStyle={{ color: palette.white, backgroundColor: palette.black }}
                                todayBackgroundColor={"#fff"}
                                todayTextStyle={{ color: palette.black }}
                                value={dateTime}
                                // scrollable={true}
                                width={350}
                                height={350}

                            />
                            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: palette.lightGrey, marginTop: 10 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={{ marginTop: 15, marginBottom: 15 }}

                                >

                                    {Timelist.map((item, index) =>
                                        <TouchableOpacity style={{ flex: 1, height: 30, width: 80, marginLeft: 15, }} onPress={() => {
                                            handlechange('time', item)
                                            // setTime(item)
                                            // timeanimatebutton()
                                        }}>
                                            <View key={index} style={{ borderWidth: values?.time === item ? 2 : 1, borderColor: palette.black, borderRadius: 10, marginRight: 20, marginBottom: 10, height: 30, width: 80, justifyContent: 'center', alignItems: 'center' }}>

                                                <Text style={{ color: values?.time === item ? palette.black : '#787373', fontSize: 14, fontWeight: '500', }}>{item}</Text>
                                            </View>
                                            {/* <Text style={{fontSize:14,fontWeight:'500',marginLeft:8 }}>{item.name}</Text> */}

                                        </TouchableOpacity>
                                    )}
                                </ScrollView>

                            </View>
                        </View> : null}
                       
                        <View style={{ flexDirection: 'row',alignItems:'center',  width: '95%', borderColor: palette.lightGrey, width: '90%', marginLeft: 20, marginTop: 15 }}>

                            {selectIndex !== 1 && houseoptions?.map((item, index) => {
                                return <TouchableOpacity key={index} style={{ alignItems: 'center',marginRight:10, borderWidth: 1, width: '32%', backgroundColor: values?.typeofHouse === item.name ? '#F7F5FA' : '#fff', borderColor: values?.typeofHouse === item.name ? '#957DBD' : palette.lightGrey, padding: 10, borderRadius: 10 }} onPress={() => handlechange('typeofHouse', item.name)}>
                                    <Image 
                                    resizeMode='contain'
                                    source={item.img} style={{
                                        width:  50, height: 45, 

                                    }} />
                                    <Text id={item} style={{ padding: 5, fontSize: 14, }} key={index}  >{item.name} </Text>
                                </TouchableOpacity>
                            })}


                        </View>


                    </ScrollView>
                    <View style={[styles.modalButton, { marginLeft: 20, marginBottom: 20 }]}>

                        <RippleButton
                            buttonView={{ alignItems: 'center', }}
                            ButtonText={"Continue"}
                            buttonTextStyle={[styles.buttonText, props.rightButtonTextStyke]}
                            button={[styles.button, props.rightButtonStyle]}
                            onPress={() => onselect()}
                            isDisable={props.isDisable}
                            indicator={indicator}
                        />
                    </View>
                </View>
            </View>

        )
    }



    const dp = (
        <BottomSheet
            ref={sheetRef}
            //enablePanDownToClose
            snapPoints={snapPoints}
            index={0}
            onChange={(index) => handleSheetChange(index)}
            enableHandlePanningGesture
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"

        >
            {renderOptionList()}
        </BottomSheet>
    )

    return (

        <BottomSheet
            ref={sheetRef}
            // enablePanDownToClose
            snapPoints={snapPoints}
            index={1}
            //onAnimate={()=>handleSnapPress()}
            // handleIndicatorStyle={{ backgroundColor: "transparent" }}
            //   name={TAG}
            enableHandlePanningGesture
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"

        // backdropComponent={CustomBackdrop}
        >
            {renderOptionList()}
        </BottomSheet>

    );
}

MovingInput.defaultProps = {
    data: [],
    onChange: () => { },
    onCancel: () => { },
    onselect: () => { },
    initValue: 'Select me!',
    style: {},
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel',
    isVisible: false
}

export default MovingInput
