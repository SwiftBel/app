import Constants from "../../utils/Constant";
import axios from "axios";

import { AnyAction, Dispatch } from 'redux';
import NetworkOps from "../../services/network/NetworkOps";
import { ServiceEnum } from '../../services/network/Urls';
import EncryptedStorage from 'react-native-encrypted-storage';
import moment from "moment";
const { TYPE } = Constants
export const genAction = (type, payload) => ({ type, payload })

export const mobileNo = (dispatch) => async (number) => {
  dispatch(genAction(TYPE.mobileNumber, number));
  const res = await NetworkOps.post(`${ServiceEnum.sendCode}?phoneNumber=${number}&channel=sms`);
  console.log(res)
  return res;
};
export const verifyotp = (otpPin) => async (dispatch, getstate) => {
  const { mobileNo } = getstate().Profile
  const res = await NetworkOps.post(`${ServiceEnum.verifyCode}?phoneNumber=${mobileNo}&code=${otpPin}`);
  return res;
};
export const getService = (data) => async (dispatch) => {
  const res = await NetworkOps.get(ServiceEnum.getServices);
  return res;
};

export const searchFilter = (data) => async (dispatch, getstate) => {
  const { mobileNo } = getstate().Profile
  console.log(data,"data")
  const res = await NetworkOps.post(ServiceEnum.searchFilter,data);
  dispatch( genAction(TYPE.ServiceProviderData,res.data))
  return res;
};

export const getProfileDetails = (uniqieURL) => async (dispatch, getstate) => {
  const { authToken } = getstate().Login
  console.log(uniqieURL,"url")
  const uniqueUrl = await EncryptedStorage.getItem("access_token");
  const session = JSON.parse(uniqueUrl)
  const res = await NetworkOps.get(`business/${session.username}`);
  if (res.status == true) {
    dispatch(genAction(TYPE.profileDetails, res.data));
    dispatch(genAction(TYPE.addService,res.servicesOfferedPhoto))
  }
  return res.data;
}

export const getMovingInputDetails = (data) => async (dispatch, getstate) => {
 console.log(data,"data")
  const res = await NetworkOps.put(ServiceEnum.movingInput,data);
  if (res.status == true) {
    dispatch( genAction(TYPE.ServiceProviderData,res.data))
    dispatch( genAction(TYPE.estimateDetails,res.finalData))
  }
  return res;
}
export const getPressureWashDetails = (data) => async (dispatch, getstate) => {
  console.log(data,"data")
   const res = await NetworkOps.put(ServiceEnum.pressurewashing,data);
   if (res.status == true) {
     dispatch( genAction(TYPE.ServiceProviderData,res.data))
     dispatch( genAction(TYPE.estimateDetails,res.finalData))
   }
   return res;
 }
 export const getElectricianDetails = (data) => async (dispatch, getstate) => {
  console.log(data,"data")
   const res = await NetworkOps.put(ServiceEnum.electricians,data);
   if (res.status == true) {
     dispatch( genAction(TYPE.ServiceProviderData,res.data))
     dispatch( genAction(TYPE.estimateDetails,res.finalData))
   }
   return res;
 }
 export const getPlumberDetails = (data) => async (dispatch, getstate) => {
  console.log(data,"data")
   const res = await NetworkOps.put(ServiceEnum.Plumbers,data);
   if (res.status == true) {
     dispatch( genAction(TYPE.ServiceProviderData,res.data))
     dispatch( genAction(TYPE.estimateDetails,res.finalData))
   }
   return res;
 }
 export const getCarpetCleaningDetails = (data) => async (dispatch, getstate) => {
  console.log(data,"data")
   const res = await NetworkOps.put(ServiceEnum.carpetcleaning,data);
   if (res.status == true) {
     dispatch( genAction(TYPE.ServiceProviderData,res.data))
     dispatch( genAction(TYPE.estimateDetails,res.finalData))
   }
   return res;
 }
 export const paymentBooking=(data,params)=>async(dispatch,getstate)=>{
  const details={
    "date": params?.date,
    "time": params?.time,
    "amount": data?.estimatedHourlyPrice
  }
  const res=await NetworkOps.post(`${ServiceEnum.paymentBooking}?sP=${data?.spId}&object=${params?._id}&serviceName=Moving`,details)
  return res;
}