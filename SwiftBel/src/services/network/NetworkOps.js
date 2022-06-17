import axios from "axios"
import { get } from "lodash"
import { urlFor } from "./Urls"
import EncryptedStorage from 'react-native-encrypted-storage';

export class NetworkOps {

  async getToken() {
    const token = await EncryptedStorage.getItem("access_token");
    const session=token?JSON.parse(token):null
    console.log("<<<", session?.token)
    return token ? ` ${session?.token}` : ""
  }

  async setHeaders(options) {
    console.log(options,"option")
    const headerOverrides = get(options, "headerOverrides", {})
    //const session = await EncryptedStorage.getItem("access_token");

   // console.log(session,"token")
    const request = {
      headers: {
       // Accept: "application/json",
        "content-Type": "application/json",
        //"x-api-key":session?.token,
        "x-api-key": await this.getToken(),
        //isMobile: true,
        ...options,
      },
    }
    console.log(request)
    return request
  }

  get = async (url,options) => {
    try {
      console.log(urlFor(url))
      const config = await this.setHeaders(options)
      const res = await axios.get(urlFor(url), config)
      console.log(res)
      if (res.status === 200 || res.status === 201 || res.status==true) {
        return res.data
      } 
      else {
        throw res.data
      }
     }
     catch (error) {
      const { response } = error
      console.log(response)
      const { ...errorObject } = response
      this.handleError(errorObject.data)
      return response
    }
  }

  handleError = async(response) =>{
    if( response.status===401 && response.message==='Invalid token'){
      await this.AuthStore.logout()
    }
  }

  post = async (url, data, options) => {
    try {
      console.log(urlFor(url))
      const config = await this.setHeaders(options)
      const res = await axios.post(urlFor(url), data, config)
      console.log(res)
      if (res.status === 200 || res.status === 201 || res.status === 204 ||res.status==true) {
        return res.data
      } else {
        throw res.data
      }
    } catch (error) {
      console.log(error)
      const { response } = error
      const { request, ...errorObject } = response // take everything but 'request'
      this.handleError(errorObject.data)
      return errorObject.data
    }
  
  }
  patch = async (url, data, options) => {
    // const isInternet = await AsyncStore.get(INTERNET)
    // if(isInternet !== null && isInternet === 'true') {
    try {
      console.log(urlFor(url))
      const config = await this.setHeaders(options)
      const res = await axios.patch(urlFor(url), data, config)
      console.log(res)
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        return res.data
      } else {
        throw res.data
      }
    } catch (error) {
      console.log(error)
      const { response } = error
      const { request, ...errorObject } = response // take everything but 'request'
      this.handleError(errorObject.data)
      return errorObject.data
    }
//   }
//   else {
//     applyToast(strings.CommonMessages.NoInternet, Toast.type.ERROR)
//     return {status: 502}
//    }
  }
  
  put = async (url, data, options) => {
    // const isInternet = await AsyncStore.get(INTERNET)
    // if(isInternet !== null && isInternet === 'true') {
    try {
      console.log(urlFor(url))
      const config = await this.setHeaders(options)
      const res = await axios.put(urlFor(url), data, config)
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        return res.data
      } else {
        throw res.data
      }
    } catch (error) {
      console.log(error.response)
      const { response } = error
      this.handleError(response)
      const { request, ...errorObject } = response // take everything but 'request'
      return errorObject.data
    }
  }

}

export default new NetworkOps()
