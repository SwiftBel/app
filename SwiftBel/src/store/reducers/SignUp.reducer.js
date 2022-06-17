import Constants from "../../utils/Constant";
const { TYPE } = Constants
const initialState = {
    emailId: '',
    registerId: '',
}

const SignUpReducers = (state = initialState, action) => {

    switch (action.type) {
        case TYPE.registerMail:
            return { ...state, emailId: action.payload }
        case TYPE.registerId:
            return { ...state, registerId: action.payload }
        default:
            return state;
    }

}
export default SignUpReducers;