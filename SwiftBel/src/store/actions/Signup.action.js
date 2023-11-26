import Constants from "../../utils/Constant";
import NetworkOps from "../../services/network/NetworkOps";
import { ServiceEnum } from '../../services/network/Urls';
import EncryptedStorage from 'react-native-encrypted-storage';
const { TYPE } = Constants
export const registerMail = (payload) => ({
  type: TYPE.registerMail,
  payload,
});
export const registerId = (payload) => ({
  type: TYPE.registerId,
  payload,
});
export const onSubmitMail = (mailId) => async (dispatch) => {
  const data = {
    "email": mailId
  };
  dispatch(registerMail(mailId));
  const res = await NetworkOps.post(ServiceEnum.register, data);
  if (res.status === true) {
    const id = res.data._id.toString()
    console.log(id,"datataaa")
    dispatch(registerId(id));
  }
  return res;
}

export const rensendVerification = (data) => async (dispatch) => {
  const res = await NetworkOps.post(`${ServiceEnum.resendVerification}?user=${data}`)
  return res;
}
export const setPassword = (data) => async (dispatch) => {
  const res = await NetworkOps.post(ServiceEnum.setPassword, data);
  if(res.status===true)
    {
      try {
        await EncryptedStorage.setItem(
            "access_token",
            JSON.stringify({
                token : res.token,
                username : '',
                isServiceProvider:false
            })
        );
    } catch (error) {
    }
    console.log(res.token,"token")
      dispatch({type:TYPE.authToken,payload:res.token})
}
  return res;
}
export const verifyId = () => async (dispatch, getstate) => {
  const { registerId } = getstate().SignUp
  console.log(getstate())
  const res = await NetworkOps.get(`${ServiceEnum.userDetails}/${registerId}`);
  return res;
}
export const google_Signup = (tokenId) => async (dispatch) => {
  const data = {
    "tokenId": tokenId
  };
  const res = await NetworkOps.post(ServiceEnum.gooleSignup, data);
  if(res.status===true)
  {
    try {
      await EncryptedStorage.setItem(
          "access_token",
          JSON.stringify({
              token : res.token,
              username : '',
              isServiceProvider:false
          })
      );
  } catch (error) {
  }
}
  console.log(res.email, "res")
  return res;
};
export const Apple_SignUp = (data) => async (dispatch) => {
  const res = await NetworkOps.post(ServiceEnum.appleSignup, data);
  if(res.status===true)
  {
    try {
      await EncryptedStorage.setItem(
          "access_token",
          JSON.stringify({
              token : res.token,
              username : '',
              isServiceProvider:false
          })
      );
  } catch (error) {
  }
}
  console.log(res, "res")
  return res;
};
export const verifyEmailUser = (data) => async (dispatch, getstate) => {
  const res = await NetworkOps.post(ServiceEnum.verifyEmail,data);
  return res;
}