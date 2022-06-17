import Constants from "../../utils/Constant";
const { TYPE } = Constants
const initialState = {
    bussinesname: {},
    location: {},
    mobileNo: '',
    services:[],
    addOwnerData:[],
    profileImage:'',
    address:[],
    postData:[],
    profileDetails:[],
    bannerDetails:{},
    isLoading:true,
    licenseType:{}
}

const ProfileReducer = (state = initialState, action) => {

    switch (action.type) {
        case TYPE.Businessname:
            return { ...state, bussinesname: action.payload }
        case TYPE.mobileNumber:
            return { ...state, mobileNo: action.payload }
        case TYPE.addPicture:
            return { ...state, profileImage: action.payload }
        case TYPE.addlocation:
            return { ...state, location: action.payload }
        case TYPE.addService:
            return { ...state, services:action.payload}
        case TYPE.addOwner:
            return { ...state, addOwnerData: action.payload }
        case TYPE.address:
            return { ...state, address: action.payload }
        case TYPE.profileToken:
            return { ...state, authToken: action.payload }
        case TYPE.PostData:
            return { ...state, postData: action.payload }
        case TYPE.profileDetails:
            return { ...state, profileDetails: action.payload }
            case TYPE.bannerDetails:
                return { ...state, bannerDetails: action.payload }
                case TYPE.licenseType:
                    return { ...state, licenseType: action.payload }
        default:
            return state;
    }
}
export default ProfileReducer;