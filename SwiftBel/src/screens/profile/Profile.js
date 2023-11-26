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
    const serviceData= profileData?.services
    useEffect(() => {
        //init();
    }, [])

    // const init = async () => {
    //     setLoader(true);
    //     await dispatch(getPostData());
    //     await dispatch(getProfileDetails());
    //     await dispatch(getBannerDetails());
    //     setLoader(false)
    // }
    console.log(profileData, "dataaaa")
    const headerrender = () => {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <MainHeader
                    centerText={profileData.profileDetails.businessName}
                    leftText="Back"
                    RightImage={Etc}
                    onleftClick={() => props.navigation.goBack()}
                    customStyle={Style.postHeader}
                />
                <Loader visible={loader}/>
                {loader?<BannerLoader/>:<View style={Style.bannerContainer} >
                    <Image
                        source={{ uri: profileData.profileDetails.bannerImage ? profileData.profileDetails.bannerImage : bannerPicture }}
                        resizeMode='cover'
                        style={Style.bannerImage_Style}
                    />
                </View  >}
               
                {loader?<AvatarLoader/>:<View style={Style.profileContainer} onPress={() => setIsProfileVisible(true)}>
                    <View style={Style.profileButton}>
                        <Image
                            source={{ uri: profileData.profileDetails.logoImage ? profileData.profileDetails.logoImage : profilePicture }}
                            resizeMode='cover'
                            style={Style.profileImage}
                        />
                    </View>
                </View>}
                <Text style={Style.MottoText}>{profileData.profileDetails.tagLine}</Text>
                <View style={Style.informationContainer}>
                    <Text style={Style.InformationTextStyle}>{`${profileData.profileDetails.rating}Rating`}</Text>
                    <Text style={Style.InformationTextStyle}>{`${profileData.profileDetails.likes}Likes`}</Text>
                    <Text style={Style.InformationTextStyle}>{`${profileData.profileDetails.moves}Moves`}</Text>
                </View>
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={Style.favourateButton} onPress={() => setisAddPostVisible(true)}>
                        <Text style={Style.favourateButtonText}>Add to favourites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.bookButton} onPress={() => setisAddPostVisible(true)}>
                        <Text style={Style.bookButtonText}>Book</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <TopScroolableTabBar
            PostData={profileData.profileDetails.post}
            languageData={profileData.profileDetails.languagesSupported}
            ReviewData={profileData.profileDetails.review}
            AboutData={tab1Data}
            ServicesData={profileData.services}
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
                    <Posts data={profileData.profileDetails.post} item={item} index={index} Loader={loader} {...props} />
                )
            }}
            rednerLanguageItem={({ item }) => {
                return (
                    <Languages data={item} {...props} />
                )
            }}
            // rednerReviewItem={({ item }) => {
            //     return (
            //         <Reviews data={item} {...props} />
            //     )
            // }}
            rednerAboutItem={() => {
                return (
                    null
                )
            }}
            ListHeaderReviewComponent={
                profileData?.profileDetails?.review.length>0?
                <HeaderList data={profileData.profileDetails.review} {...props} />:
                <EmptyScreen ScreenText={"No Review Avilabale"}/>
            }
            ListHeaderAboutComponent={
                <AboutCompany data={profileData.profileDetails} {...props} />
            }
            ListHeaderServicesComponent={
                serviceData?.length>0?null:
                <EmptyScreen ScreenText={"No Services Avilabale"}/>
            }
            ListHeaderPostComponent={
                profileData?.profileDetails?.post.length>0?null:
                <EmptyScreen ScreenText={"No Posts Avilabale"}/>
            }
            ListHeaderlanguageComponent={
                profileData?.profileDetails?.languagesSupported.length>0?null:
                <EmptyScreen ScreenText={"No Language Avilabale"}/>
            }
            Header={() => headerrender()}

        />


    )
}

export default Profile