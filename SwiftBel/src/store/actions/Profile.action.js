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

