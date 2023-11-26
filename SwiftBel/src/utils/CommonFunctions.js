//import Toast from "../components/toast/Toast";
import EncryptedStorage from 'react-native-encrypted-storage';
export const EmailValidation=(text)=>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false)
        return false
    else
        return true
}
export const numberSymbolValidation=(text)=>{
    var reg = /^(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (reg.test(text) === true)
        return true;
    else
        return false;
    
}

export const containEmailValidation=(email,password)=>{
    var partsOfThreeLetters = email.match(/.{4}/g).concat(
        email.substr(1).match(/.{4}/g) );
  return new RegExp(partsOfThreeLetters.join("|"), "i").test(password);
}

// export const showToast=(message,type,height)=>{

//     Toast.show(message,{
//         duration:Toast.durations.SHORT,
//         type:type ?type:Toast.type.ERROR,
//         shadow:false,
//         animation:true,
//         delay:0,
//         height:height
//     });
// }

export const formatMobileNumber=(text)=> {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        number = ["(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      return number;
    }
    return text;
  }

export  const handleChangeText = (index, text, digits, pinCount) => {
    const digitArray = digits;
    let newDigits = digitArray.slice();
    const oldTextLength = newDigits[index] ? newDigits[index].length : 0;
    const newTextLength = text.length;
    if (newTextLength - oldTextLength === pinCount) { // user pasted text in.
      newDigits = text.split('').slice(oldTextLength, newTextLength);
      return newDigits;
    }
  
    if (text.length === 0) {
      if (newDigits.length > 0) {
        newDigits = newDigits.slice(0, newDigits.length - 1);
      }
    }
    else {
      text.split('').forEach((value) => {
        if (index < pinCount) {
          newDigits[index] = value;
          // eslint-disable-next-line no-param-reassign
          index += 1;
        }
      });
      // eslint-disable-next-line no-param-reassign
      index -= 1;
    }
    return newDigits;
  };

export  const focusField = (index, fields) => {
    if (index < fields.current.length) {
      fields.current[index] && fields.current[index].focus();
    }
  };

  export const getToken=async()=> {
    const token = await EncryptedStorage.getItem("access_token");
    const session=await token?JSON.parse(token):''
    console.log("<<<", session)
    return session?true:false
  }