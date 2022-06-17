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
const DocumentPickers = (props) => {
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
            label: 'Choose from Files'
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
            }).then(image => {
                props.value?setProfileImage(props.value.path) :setProfileImage(image.path);
                props.documentName?
                SetprofileName(props.documentName):
                SetprofileName(image.filename)
                console.log(image,"image")
                props.onChange(image);
            }).finally(close);
    }
    const close = () => setIsModalVisible(false);
    const chooseFromLibarary = async () => {
        ImagePicker.openPicker(
            {
                width: 340,
                height: 240,
                cropping: true
            }).then(image => {
                   props.value?setProfileImage(props.value.path) :setProfileImage(image?.path)
                   props.documentName?
                   SetprofileName(props.documentName):
                   SetprofileName(image.filename);
                    console.log(image,"image")
                props.onChange(image);
            }).finally(close);
    }
    const chooseFromFiles = async () => {
        try {
            const uri = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            const result =props.value?await PdfThumbnail.generate(props.value, 0):
            await PdfThumbnail.generate(uri[0].uri, 0)
            ;
            setProfileImage(result.uri)
            console.log(uri[0])
            props.documentName?SetprofileName(props.documentName):
            SetprofileName(uri[0].name)
            props.onChange(uri[0]);
            setThumbnail(result);
            setError(undefined);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                setThumbnail(undefined);
                setError(err);
            }
        }
        finally {
            close();
        }

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
            {props.headerName ?
                <Text style={{ paddingLeft: 20, fontSize: 16 }}>{props.headerName}</Text>
                : null
            }
            {profileImage ?
                <View style={Style.documentIconContainer}>
                    <TouchableOpacity
                        onPress={() => setIsModalVisible(true)}>
                        <Image
                            style={Style.documentIcon}
                            source={{ uri: `${profileImage}` }}
                            resizeMode='cover'
                            borderRadius={20}
                        />
                    </TouchableOpacity>
                </View>
                :
                    <ButtonWithIcon
                        ButtonStyle={Style.documentPickerContainer}
                        imageSource={uploadPhoto}
                        imageStyle={Style.iconStyle}
                        onClick={() => {
                            setIsModalVisible(true)
                        }}
                    />
            }
            <Text style={Style.documentName} >{profileName}</Text>
            {isModalVisible && (
                <ModalPicker
                    data={data}
                    cancelText={'Cancel'}
                    visible={isModalVisible}
                    onChange={(item) => onClickAddImage(item)}
                    onCancel={() => setIsModalVisible(false)}
                />
            )}
        </View>
    )
}
DocumentPickers.defaultProps = {
    headerName: '',
    onChange: () => { },
    leftFormatText: '',
    fileSixe: '',
    documentName:'',
    value:''
}
export default DocumentPickers
