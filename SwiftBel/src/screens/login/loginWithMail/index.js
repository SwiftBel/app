import {loginId,loginUser} from '../../../store/actions/Login.action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginMail from './loginMail';

const mapStateToProps = (state) => ({ SignUp: state.Login });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginUser,
    },
    dispatch
  );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginMail);