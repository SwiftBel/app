/**
 * @format
 */
 import 'react-native-gesture-handler';
 import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import { onRemoteMessage } from './src/screens/messages/src/utils';
if (Platform.OS !== 'ios') {
    messaging().setBackgroundMessageHandler(onRemoteMessage);
  }
  AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));

