import Constants from "../../utils/Constant";
import axios from "axios";

import { AnyAction, Dispatch } from 'redux';
import NetworkOps from "../../services/network/NetworkOps";
import { ServiceEnum } from '../../services/network/Urls';
import EncryptedStorage from 'react-native-encrypted-storage';
import moment from "moment";
const { TYPE } = Constants
export const genAction = (type, payload) => ({ type, payload })


export const getPlumberInputDetails = (data) => async (dispatch, getstate) => {
    console.log(data, "data")
    const res = await NetworkOps.put(ServiceEnum.PlumberInput, data);
    if (res.status == true) {
        dispatch(genAction(TYPE.ServiceProviderData, res.data))
    }
    return res.data;
}

export const getElectricianInputDetails = (data) => async (dispatch, getstate) => {
    console.log(data, "data")
    const res = await NetworkOps.put(ServiceEnum.ElectricianInput, data);
    if (res.status == true) {
        dispatch(genAction(TYPE.ServiceProviderData, res.data))
    }
    return res.data;
}

export const getHVACInputDetails = (data) => async (dispatch, getstate) => {
    console.log(data, "data")
    const res = await NetworkOps.put(ServiceEnum.HVACInput, data);
    if (res.status == true) {
        dispatch(genAction(TYPE.ServiceProviderData, res.data))
    }
    return res.data;
}
export const getpaymentIntent=(value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.stripePaymentIntent}`,value)
    if (res.status === true) {
    }
    return res
  }
