
import * as React from 'react';
//import SplashScreen from 'react-native-splash-screen';
import EncryptedStorage from 'react-native-encrypted-storage';
import Loader from '../../components/Loader/Loader';
function App(props) {
const [visible,setvisible]=React.useState(false)
  // React.useEffect(()=>{
  //   init();
  //   SplashScreen.hide()
  // },[])

const init=async()=>{
  setvisible(true)
const token = await EncryptedStorage.getItem("access_token");
const isProfile= token?JSON.parse(token):''
console.log(isProfile,"profile")
isProfile?.token?isProfile?.isServiceProvider?
props.navigation.navigate('Dashboard'): 
props.navigation.navigate('SignUp'):
props.navigation.navigate('SignUp')
setvisible(false)
}
return(
<Loader visible={visible}/>
)
  }
  export default App;