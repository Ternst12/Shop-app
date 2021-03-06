import AppLoading from "expo-app-loading";
import * as Font from "expo-font" 

import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from "redux-thunk"

import cartReducer from "./store/reducers/cartReducer";
import productsReducers from './store/reducers/productsReducers';
import orderReducer from "./store/reducers/orderReducer";
import authReducer from "./store/reducers/authReducer";
import NavigationContainer from "./navigation/NavigationContainer";


const rootReducer = combineReducers({
  products: productsReducers,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })

}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync= {fetchFonts}
    onFinish={() => setFontLoaded(true)}
    onError={(err) => console.log(err)} />;
  }
  
  return (
    <Provider store={store}>
        <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
