// In App.js in a new project
import * as React from 'react';
import RootNavigator from "./src/routes/Root-Navigator"
import { Provider } from "react-redux";
import Store from "./src/store/index";
function App() {
  return (
    <Provider store={Store}>
      <RootNavigator/>
    </Provider>
  );
}

export default App;