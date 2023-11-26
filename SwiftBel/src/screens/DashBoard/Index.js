import * as React from 'react'
import {Image} from 'react-native'
import {
    createBottomTabNavigator
  } from '@react-navigation/bottom-tabs';
import { booking, Home, message, Notification, onGoing, profile, Right, setting } from '../../assets';
import notification from '../Notification';
import { palette } from '../../theme';
import OnGoing from '../onGoing/Index';
import Messages from '../messages';
import Setting from '../Settings';
import HomePage from './homepage';
import { useSelector, useDispatch } from 'react-redux'
import { getBannerDetails, getProfileDetails } from '../../store/actions/Profile.action';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ActionSheetProvider } from '../../context/ActionSheetProvider';
  const Tab = createBottomTabNavigator();
const DashBoard=()=> {
  const dispatch=useDispatch()
  React.useEffect(() => {
    init();

}, []);

const init = async () => {
    await dispatch(getProfileDetails());
    await dispatch(getBannerDetails())
}
    return (
      <ActionSheetProvider>
      <BottomSheetModalProvider>
        
        <Tab.Navigator
          initialRouteName="Setting"
        backBehavior='firstRoute'
        detachInactiveScreens={false}
          screenOptions={{
            //headerBackTitleVisible: false,
            gestureEnabled: true,
            headerShown: false,
            lazy:false
          }}
          tabBarOptions={{
            activeTintColor: palette.pink,
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomePage}
            options={{
              tabBarInactiveTintColor:palette.black,
              tabBarLabel: 'Explore',
              unmountOnBlur:true,
              tabBarLabelStyle:{color:palette.black,fontWeight:'400',marginBottom:5},
              tabBarIcon: ({ color, size }) => (
                <Image
                source={Home}
                resizeMode='contain'
                style={{width:20,height:20,tintColor:color}}
                />
              ),
            }}  />
          <Tab.Screen
            name="Notification"
            component={notification}
            options={{
              tabBarInactiveTintColor:palette.black,
              tabBarLabel: 'Saved Job',
              unmountOnBlur:true,
              tabBarLabelStyle:{color:palette.black,fontWeight:'400',marginBottom:5},
              tabBarIcon: ({ color, size }) => (
                <Image
                source={onGoing}
                resizeMode='contain'
                style={{width:20,height:20,tintColor:color}}
                />
              ),
            }} />
             <Tab.Screen
            name="OnGoing"
            component={OnGoing}
            options={{
              tabBarInactiveTintColor:palette.black,
              tabBarLabel: 'Bookings',
              tabBarLabelStyle:{color:palette.black,fontWeight:'400',marginBottom:5},
              tabBarIcon: ({ color, size }) => (
                <Image
                source={booking}
                resizeMode='contain'
                style={{width:20,height:20,tintColor:color}}
                />
              ),
            }} />
             <Tab.Screen
            name="Messages"
            component={Messages}
            options={{
              tabBarInactiveTintColor:palette.black,
              tabBarLabel: 'Messages',
              tabBarLabelStyle:{color:palette.black,fontWeight:'400',marginBottom:5},
              unmountOnBlur:true,
              tabBarIcon: ({ color, size }) => (
                <Image
                source={message}
                resizeMode='contain'
                style={{width:20,height:20,tintColor:color}}
                />
              ),
            }} />
             <Tab.Screen
            name="mon"
            component={Setting}
            options={{
              tabBarInactiveTintColor:palette.black,
              tabBarLabelStyle:{color:palette.black,fontWeight:'400',marginBottom:5},
              tabBarLabel: 'Profile',
              unmountOnBlur:true,
              tabBarIcon: ({ color, size }) => (
                <Image
                source={profile}
                resizeMode='contain'
                style={{width:20,height:20,tintColor:color}}
                />
              ),
            }} />
        </Tab.Navigator>
        </BottomSheetModalProvider>
        </ActionSheetProvider>
    );
  }
  export default DashBoard;