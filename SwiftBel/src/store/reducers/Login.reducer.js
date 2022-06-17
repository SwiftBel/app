import Constants from "../../utils/Constant";
const { TYPE } = Constants
const initialState = {
    emailId: '',
    authToken: ''
}

const LoginReducers = (state = initialState, action) => {

    switch (action.type) {
        case TYPE.LoginMail:
            return { ...state, emailId: action.payload }
        case TYPE.authToken:
            return { ...state, authToken: action.payload }
        default:
            return state;
    }

}
export default LoginReducers;