import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { backPicture, Etc, } from '../../assets'
import MainHeader from '../../components/Header/MainHeader/MainHeader'
import Style from './Style'
import Posts from './posts/Posts'
import Languages from './Languages/Languages'
import Reviews from './Reviews/Reviews'
import TopScroolableTabBar from '../profile/Components/TopScroolableTabBar'
import AboutCompany from './AboutCompany/AboutCompany'
import { getPostData, getProfileDetails, getBannerDetails, UploadBannerImage } from '../../store/actions/Profile.action'
import HeaderList from './Reviews/HeaderList '
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload'
import { ServicesData } from './Services/ServicesData'
import Services from './Services/Services'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import EmptyScreen from '../../components/EmptyScreen'
import {AvatarLoader,BannerLoader} from './SimmerLoader'
const Profile = (props) => {
    const dispatch = useDispatch();
    const profileData = useSelector(state => state.Profile)
    const [tab1Data] = useState(Array(40).fill(0));
    const [isProfileVisible, setIsProfileVisible] = useState(false)
    const [isBannersVisible, setIsBannerVisible] = useState(false)
    const [isAddPostVisible, setisAddPostVisible] = useState(false)
    const [loader,setLoader]=useState(false)
    const [profilePicture, setProfilePicture] = useState('https://myawsbucket-swiftbel.s3.ca-central-1.amazonaws.com/test1/1649827692112i.png')
    const [bannerPicture, setBannerPicture] = useState('https://myawsbucket-swiftbel.s3.ca-central-1.amazonaws.com/test1/1649827692112i.png')
    const serviceData= profileData?.profileDetails?.servicesOffered
    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        setLoader(true);
        await dispatch(getPostData());
        await dispatch(getProfileDetails());
        await dispatch(getBannerDetails());
        setLoader(false)
    }
    console.log(profileData, "dataaaa")
    const headerrender = () => {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <MainHeader
                    centerText={profileData.bannerDetails.businessName}
                    leftText="Back"
                    RightImage={Etc}
                    onleftClick={() => props.navigation.goBack()}
                    customStyle={Style.postHeader}
                />
                <Loader visible={loader}/>
                {loader?<BannerLoader/>:<TouchableOpacity style={Style.bannerContainer} onPress={() => setIsBannerVisible(true)}>
                    <Image
                        source={{ uri: profileData.bannerDetails.bannerImage ? profileData.bannerDetails.bannerImage : bannerPicture }}
                        resizeMode='cover'
                        style={Style.bannerImage_Style}
                    />
                </TouchableOpacity  >}
                <PhotoUpload
                    isModalVisible={isBannersVisible}
                    onChange={async (item) => {
                        const res = await dispatch(UploadBannerImage(item, 'banner'))
                        setLoader(true)
                        if (res.status == true) {
                            await dispatch(getBannerDetails());
                        }
                        setLoader(false)
                    }}
                    onCancel={() => setIsBannerVisible(false)}
                    close={() => setIsBannerVisible(false)}
                />
                {loader?<AvatarLoader/>:<TouchableOpacity style={Style.profileContainer} onPress={() => setIsProfileVisible(true)}>
                    <View style={Style.profileButton}>
                        <Image
                            source={{ uri: profileData.bannerDetails.logoImage ? profileData.bannerDetails.logoImage : profilePicture }}
                            resizeMode='cover'
                            style={Style.profileImage}
                        />
                    </View>
                </TouchableOpacity>}
                <PhotoUpload
                    isModalVisible={isProfileVisible}
                    cropperCircleOverlay={true}
                    onChange={async (item) => {
                        const res = await dispatch(UploadBannerImage(item, 'logo'))
                        setLoader(true);
                        if (res.status == true) {
                            await dispatch(getBannerDetails());
                        }
                        setLoader(false)
                    }}
                    onCancel={() => setIsProfileVisible(false)}
                    close={() => setIsProfileVisible(false)}
                />
                <Text style={Style.MottoText}>{profileData.bannerDetails.tagLine}</Text>
                <View style={Style.informationContainer}>
                    <Text style={Style.InformationTextStyle}>{`${profileData.bannerDetails.rating}Rating`}</Text>
                    <Text style={Style.InformationTextStyle}>{`${profileData.bannerDetails.likes}Likes`}</Text>
                    <Text style={Style.InformationTextStyle}>{`${profileData.bannerDetails.moves}Moves`}</Text>
                </View>
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <PhotoUpload
                        isModalVisible={isAddPostVisible}
                        multiple={true}
                        onChange={(item) => props.navigation.navigate('addNewPost', {
                            data: item
                        })}
                        onCancel={() => setisAddPostVisible(false)}
                        close={() => setisAddPostVisible(false)}
                    />
                    <TouchableOpacity style={Style.newPostButton} onPress={() => setisAddPostVisible(true)}>
                        <Text style={Style.newPostButtonText}>Add New Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <TopScroolableTabBar
            PostData={profileData.postData}
            languageData={profileData.profileDetails.languagesSupported}
            ReviewData={profileData.profileDetails.review}
            AboutData={tab1Data}
            ServicesData={profileData.profileDetails.servicesOffered}
            postNumcols={3}
            languageNumcols={2}
            reviewNumcols={null}
            aboutNumcols={null}
            servicesNumcols={2}
            rednerServicesItem={({ item, index }) => {
                console.log(item,"item")
                return (
                    <Services data={item} {...props} />
                )
            }}
            rednerPostItem={({ item, index }) => {
                return (
                    <Posts data={profileData.postData} item={item} index={index} Loader={loader} {...props} />
                )
            }}
            rednerLanguageItem={({ item }) => {
                return (
                    <Languages data={item} {...props} />
                )
            }}
            rednerReviewItem={({ item }) => {
                return (
                    <Reviews data={item} {...props} />
                )
            }}
            rednerAboutItem={() => {
                return (
                    null
                )
            }}
            ListHeaderReviewComponent={
                <HeaderList data={profileData.profileDetails.review} {...props} />
            }
            ListHeaderAboutComponent={
                <AboutCompany data={profileData.profileDetails} {...props} />
            }
            ListHeaderServicesComponent={
                serviceData?.length>0?null:
                <EmptyScreen ScreenText={"No Services Avilabale"}/>
            }
            ListHeaderPostComponent={
                profileData?.postData.length>0?null:
                <EmptyScreen ScreenText={"No Posts Avilabale"}/>
            }
            Header={() => headerrender()}

        />


    )
}

export default Profile