import Constants from "../../utils/Constant";
import NetworkOps from "../../services/network/NetworkOps";
import { ServiceEnum } from '../../services/network/Urls';
import EncryptedStorage from 'react-native-encrypted-storage';
const {TYPE}=Constants
export const loginId = (payload) => ({
    type: TYPE.LoginMail,
    payload,
  });
  export const genAction = (type, payload) => ({ type, payload })

export const loginUser=(data)=>async (dispatch)=>{
    const res = await NetworkOps.post(ServiceEnum.loginUser,data);
    if(res.status===true)
    {
      try {
        await EncryptedStorage.setItem(
            "access_token",
            JSON.stringify({
                token : res.token,
                username : res.uniqueUrl,
                isServiceProvider:false
            })
        );
    } catch (error) {
    }
    console.log(res.token,"token")
      dispatch({type:TYPE.authToken,payload:res.token})
      dispatch(genAction(TYPE.profileDetails, res.data));
}

      
    return res;
}
export const _googleLogin=(data)=>async (dispatch)=>{

    const expression={"expression": "google"}
    const googleData={...data,...expression}
    console.log(googleData,"dattaaaa")
    const res = await NetworkOps.post(ServiceEnum.loginUser,googleData);
    if(res.status===true)
    {
      try {
        await EncryptedStorage.setItem(
            "access_token",
            JSON.stringify({
                token : res.token,
                username : res.uniqueUrl,
                isServiceProvider:res.isServiceProvider
            })
        );
    } catch (error) {
    }
    console.log(res.token,"token")
      dispatch({type:TYPE.authToken,payload:res.token})
}

      
    return res;
}
export const _appleLogin=(data)=>async (dispatch)=>{

    const expression={"expression": "apple"}
    const appleData={...data,...expression}
    console.log(appleData,"dattaaaagggggggg")
    const res = await NetworkOps.post(ServiceEnum.loginUser,appleData);
    if(res.status===true)
    {
      try {
        await EncryptedStorage.setItem(
            "access_token",
            JSON.stringify({
                token : res.token,
                username : res.uniqueUrl,
                isServiceProvider:res.isServiceProvider
            })
        );
    } catch (error) {
    }
    console.log(res.token,"token")
      dispatch({type:TYPE.authToken,payload:res.token})
}

      
    return res;
}