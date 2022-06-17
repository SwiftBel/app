import React, { useState } from 'react'
import {
    View, Text, TouchableOpacity, Modal, Image, StyleSheet
} from 'react-native'
import { ButtonWithIcon, TextKeyValue } from '..'
import { upload, uploadPhoto } from '../../assets'
import Constants from '../../utils/Constant'
import ModalPicker from '../PhoneInput/ModalPicker'
import ImagePicker from 'react-native-image-crop-picker';
import Style from './Style'
import DocumentPicker from 'react-native-document-picker';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import { palette } from '../../theme'
const PhotoUpload = (props) => {
    const { profile } = Constants
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [profileImage, setProfileImage] = useState('')
    const [thumbnail, setThumbnail] = React.useState('');
    const [error, setError] = React.useState('');
    const [profileName, SetprofileName] = React.useState('');
    const data = [
        ,
        {
            key: 1,
            label: 'Remove current photo'
        },
        {
            key: 2,
            label: 'Take photo'
        },
        {
            key: 3,
            label: 'Choose from library'
        }
    ]
    const takePhotoFromCamera = async () => {
        ImagePicker.openCamera(
            {
                width: 340,
                height: 240,
                cropping: true,
                cropperCircleOverlay:props.cropperCircleOverlay,
                multiple:props.multiple,
            }).then(image => {
                props.value?setProfileImage(props.value) :setProfileImage(image.path);
                props.documentName?
                SetprofileName(props.documentName):
                SetprofileName(image.filename)
                console.log(image,"image")
                props.onChange(image);
            }).finally(props.close);
    }
    const close = () => props.isModalVisible;
    const chooseFromLibarary = async () => {
        ImagePicker.openPicker(
            {
                width: 340,
                height: 240,
                cropping: true,
                cropperCircleOverlay:props.cropperCircleOverlay,
                multiple:props.multiple,
            }).then(image => {
                image.size > 50000 ?
                    console.log("error") :
                   props.value?setProfileImage(props.value) :setProfileImage(image.path)
                   props.documentName?
                   SetprofileName(props.documentName):
                   SetprofileName(image.filename);
                    console.log(image,"image")
                props.onChange(image);
            }).finally(props.close);
    }
    const chooseFromFiles = async () => {
       
            props.onChange('');
            props.close;

    }

    const onClickAddImage = (items) => {
        switch (items.key) {
            case 2:
                takePhotoFromCamera();
                break;
            case 3:
                chooseFromLibarary();
                break;
            case 1:
                chooseFromFiles();
                break;
            default:
                break;
        }
    }
    return (
        <View>
            {props.isModalVisible && (
                <ModalPicker
                    data={data}
                    cancelText={'Cancel'}
                    visible={props.isModalVisible}
                    onChange={(item) => onClickAddImage(item)}
                    onCancel={() => props.onCancel()}
                />
            )}
        </View>
    )
}
PhotoUpload.defaultProps = {
    headerName: '',
    isModalVisible:false,
    onChange: () => { },
    onCancel:()=>{ },
   cropperCircleOverlay:false,
   multiple:false,
    fileSixe: '',
    documentName:'',
    value:''
}
export default PhotoUpload
