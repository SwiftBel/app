import React, { useState } from 'react'
import {
    View, Text, TouchableOpacity, Image
} from 'react-native'
import { Delete } from '../../assets'
import { Button, Input } from '../../components/index'
import Constants from '../../utils/Constant'
import Style from './Style'
import DatePickers from '../DatePicker/DatePicker'
import InputPicker from '../InputPicker/InputPicker'
import DocumentPickers from '../DocumentPiker/DocumentPicker'
import PhoneInpuField from '../PhoneInput/PhoneInput'
import { formatMobileNumber } from '../../utils/CommonFunctions'
const AddMoreOwner = (props) => {
    const [addOwnerData, setAddOwnerData] = useState([])
    const addCustomFiled = () => {
        setAddOwnerData([...addOwnerData,
        {
            firstName: '',
            lastName: '',
            gender: 'Male',
            dob: '',
            country: '',
            address: '',
            provisionState: '',
            city: '',
            photoId: '',
            phoneNumWithcode: '',
            phoneNumWithoutcode: '',
            email:'',
            birth_city: '',
            birth_province_state:'',
            birth_country:'',
        }
        ])
        props.onChangeData(addOwnerData);
    }
    const onchangefirstName = (text, index) => {
        console.log(text, "text")
        const data = [...addOwnerData]

        data[index].firstName = text
        setAddOwnerData(data);
        props.onChangeData([...data]);
    }
    const onchangeLastName = (text, index) => {
        const data = [...addOwnerData]
        data[index].lastName = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangeDate = (date, index) => {
        const data = [...addOwnerData]
        data[index].dob = date
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onCancelDate = (index) => {
        const data = [...addOwnerData]
        data[index].dob = ''
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onchangeGender = (text, index) => {
        const data = [...addOwnerData]
        data[index].gender = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangeCountry = (text, index) => {
        const data = [...addOwnerData]
        data[index].country = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangeAddress = (text, index) => {
        const data = [...addOwnerData]
        data[index].address = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangeProvisionState = (text, index) => {
        const data = [...addOwnerData]
        data[index].provisionState = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangeCity = (text, index) => {
        const data = [...addOwnerData]
        data[index].city = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangebirthCity = (text, index) => {
        const data = [...addOwnerData]
        data[index].birth_city = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangebirthCountry = (text, index) => {
        const data = [...addOwnerData]
        data[index].birth_country = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangebirthProvisionState = (text, index) => {
        const data = [...addOwnerData]
        data[index].birth_province_state = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangePhotoId = (text, index) => {
        const data = [...addOwnerData]
        data[index].photoId = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangeNumber = (text, index) => {
        let formatedNo = formatMobileNumber(text);
        const data = [...addOwnerData]
        data[index].phoneNumWithoutcode = formatedNo
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangeNumberWithCode = (text, index) => {
        var cleaned = ("" + text).replace(/\D/g, "");
        const data = [...addOwnerData]
        data[index].phoneNumWithcode = cleaned
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const onChangeEmail=(text,index)=>{
        const data = [...addOwnerData]
        data[index].email = text
        setAddOwnerData([...data])
        props.onChangeData(data);
    }
    const deleteHandler = (index) => {
        console.log(addOwnerData)
        const data = [...addOwnerData]
        data.splice(index, 1)
        setAddOwnerData(data)
        props.onChangeData([...data]);
    }
    return (
        <View style={Style.container}>
            {
                addOwnerData.map((customInput, key) => {
                    return (

                        <View key={key} style={{ margin: 10 }}>
                           
                            <View>
                                <Input
                                    placeholder={Constants.profile.firstName}
                                    header={true}
                                    headerName={`${Constants.profile.firstName}`}
                                    onChangeText={(text) => onchangefirstName(text, key)}
                                    inputStyle={{ borderRadius: 40, alignSelf: 'center', marginBottom: 10 }}
                                    secureTextEntry={false}
                                    value={customInput.firstName}
                                    HeaderStyle={{ paddingLeft: 10 }}
                                />
                                <Input
                                    placeholder={Constants.profile.lastName}
                                    header={true}
                                    headerName={`${Constants.profile.lastName}`}
                                    onChangeText={(text) => onchangeLastName(text, key)}
                                    inputStyle={{ borderRadius: 40, alignSelf: 'center', marginBottom: 10 }}
                                    secureTextEntry={false}
                                    value={customInput.lastName}
                                    HeaderStyle={{ paddingLeft: 10 }}
                                />
                                <InputPicker
                                    buttonStyle={{ width: 120 }}
                                    headerName={'Gender'}
                                    modalHeader={'Select Gender'}
                                    PickerContainerStyle={{ marginLeft: -10, marginBottom: 10 }}
                                    data={[
                                        { label: 'Male', value: 'Male', key: 1 },
                                        { label: 'Female', value: 'Female', key: 2 },
                                        { label: 'Others', value: 'Others', key: 3 },
                                    ]}
                                    value={customInput.gender}
                                    onChange={(value) => {
                                        onchangeGender(value, key);
                                    }}
                                />
                                <DatePickers
                                    headerName={'Date Of Birth'}
                                    buttonStyle={{ width: 140 }}
                                    DateContainerStyle={{ marginLeft: -10, marginBottom: 10 }}
                                    value={customInput.dob}
                                    OnSelectedDate={(date) => console.log(date)}
                                    onChange={(date) => onChangeDate(date, key)}
                                    onCancel={() => onCancelDate(key)}
                                />
                                
                                <PhoneInpuField
                                    PhoneInputContainer={{ marginLeft: 20, marginRight: 0, marginBottom: 10 }}
                                    onChangeFormattedText={(text) => onChangeNumberWithCode(text, key)}
                                    onChangeText={(text) => onChangeNumber(text, key)}
                                    value={customInput.phoneNumWithoutcode}
                                />
                                <Input
                                    placeholder={"Email"}
                                    header={true}
                                    headerName={`Email`}
                                    onChangeText={(text) => onChangeEmail(text, key)}
                                    inputStyle={{ borderRadius: 40, alignSelf: 'center', marginBottom: 10 }}
                                    secureTextEntry={false}
                                    value={customInput.email}
                                    HeaderStyle={{ paddingLeft: 10 }}
                                />
                                <Input
                                    placeholder={Constants.profile.Country}
                                    header={true}
                                    headerName={`${Constants.profile.Country}`}
                                    onChangeText={(text) => onChangeCountry(text, key)}
                                    inputStyle={{ borderRadius: 40, alignSelf: 'center', marginBottom: 10 }}
                                    secureTextEntry={false}
                                    value={customInput.country}
                                    HeaderStyle={{ paddingLeft: 10 }}
                                />
                                <Input
                                    placeholder={Constants.profile.Address}
                                    header={true}
                                    headerName={`${Constants.profile.Address}`}
                                    onChangeText={(text) => onChangeAddress(text, key)}
                                    inputStyle={{ borderRadius: 40, alignSelf: 'center', marginBottom: 10 }}
                                    secureTextEntry={false}
                                    value={customInput.address}
                                    HeaderStyle={{ paddingLeft: 10 }}
                                />
                                <Input
                                    placeholder={Constants.profile.ProvinceState}
                                    header={true}
                                    headerName={`${Constants.profile.ProvinceState}`}
                                    onChangeText={(text) => onChangeProvisionState(text, key)}
                                    inputStyle={{ borderRadius: 40, alignSelf: 'center', marginBottom: 10 }}
                                    secureTextEntry={false}
                                    value={customInput.provisionState}
                                    HeaderStyle={{ paddingLeft: 10 }}
                                />
                                <Input
                                    placeholder={Constants.profile.City}
                                    header={true}
                                    headerName={`${Constants.profile.City}`}
                                    onChangeText={(text) => onChangeCity(text, key)}
                                    inputStyle={{ borderRadius: 40, alignSelf: 'center', marginBottom: 10 }}
                                    secureTextEntry={false}
                                    value={customInput.city}
                                    HeaderStyle={{ paddingLeft: 10 }}

                                />
                                <Input
                            placeholder={Constants.profile.BirthCity}
                            header={true}
                            headerName={`${Constants.profile.BirthCity}`}
                            onChangeText={(text) => onChangebirthCity(text,key)}
                            inputStyle={{ borderRadius: 40, alignSelf: 'center' }}
                            secureTextEntry={false}
                            value={customInput.birth_city}
                            HeaderStyle={{ paddingLeft: 10 }}

                        />
                        <Input
                            placeholder={Constants.profile.BirthCountry}
                            header={true}
                            headerName={`${Constants.profile.BirthCountry}`}
                            onChangeText={(text) => onChangebirthCountry(text,key)}
                            inputStyle={{ borderRadius: 40, alignSelf: 'center' }}
                            secureTextEntry={false}
                            value={customInput.birth_country}
                            HeaderStyle={{ paddingLeft: 10 }}
                        />
                        <Input
                            placeholder={Constants.profile.BirthProvinceState}
                            header={true}
                            headerName={`${Constants.profile.BirthProvinceState}`}
                            onChangeText={(text) => onChangebirthProvisionState(text,key)}
                            inputStyle={{ borderRadius: 40, alignSelf: 'center' }}
                            secureTextEntry={false}
                            value={customInput.birth_province_state}
                            HeaderStyle={{ paddingLeft: 10 }}

                        />
                                <DocumentPickers
                                    headerName={'Photo Id'}
                                    onChange={(item) => onChangePhotoId(item, key)}
                                    value={customInput.photoId}
                                    documentName={customInput.photoId.type == "application/pdf" ? customInput.photoId.name : customInput.photoId.filename}
                                />

                            </View>
                            <TouchableOpacity
                                onPress={() => deleteHandler(key)}
                                style={Style.deleteButton}>
                                    <Text style={Style.deletText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
            <Button
                buttonView={{ alignItems: 'center', marginTop: 20 }}
                ButtonText={Constants.profile.AddMoreOwner}
                buttonTextStyle={[Style.bottonText, { color: props.buttonTextColor }]}
                button={[Style.button, { backgroundColor: props.buttonBackgroundColor }]}
                onPress={() => addCustomFiled()}
                isDisable={props.isDisable}
            />
        </View>
    )
}
AddMoreOwner.defaultProps = {
    onChangeData: () => { }
}
export default AddMoreOwner