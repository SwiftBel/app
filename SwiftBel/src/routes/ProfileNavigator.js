import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Home/Welcome';
const Stack = createNativeStackNavigator();
function ProfileNavigator() {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerBackTitleVisible: false,
                gestureEnabled: false,
                headerShown: false
            })}
        >
        <Stack.Screen name='Home' component={Welcome}/>


        </Stack.Navigator>
        
        )}
export default ProfileNavigator;