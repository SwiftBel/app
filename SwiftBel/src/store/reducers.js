import {combineReducers} from 'redux';
import SignUp from './reducers/SignUp.reducer'
import Login from './reducers/Login.reducer'
import ProfileReducer from './reducers/Profile.reducer';
const appReducers = combineReducers({
  SignUp:SignUp,
  Login:Login,
  Profile:ProfileReducer
});

const Reducer = (state, action) => {
  return appReducers(state, action);
};

export default Reducer;
