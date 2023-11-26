// In App.js in a new project
import * as React from 'react';
import RootNavigator from "./src/routes/Root-Navigator"
import { Provider } from "react-redux";
import Store from "./src/store/index";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App() {
  return (
   
    <Provider store={Store}>
       <GestureHandlerRootView style={{flex:1}}>
      <BottomSheetModalProvider>
      <RootNavigator/>
      </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>

  );
}

export default App;