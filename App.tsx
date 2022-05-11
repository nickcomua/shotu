import * as React from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { useFonts } from '@expo-google-fonts/inter';
import { Button, StyleSheet,Image, Text, View, TextInput, SafeAreaView, useWindowDimensions, TouchableWithoutFeedback, LogBox, Settings, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
//import {HomeScreen} from "./Screens/HomeScreen";
//import AppLoading from 'expo-app-loading';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, ConnectedComponent, InferableComponentEnhancerWithProps, Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ReactElement } from 'react';
import AppLoading from 'expo-app-loading';
import LoginScreen from './src/screens/login';
import MainScreen from './src/screens/main';
import WelcomeScreen from './src/screens/welcome';
import CastomMenu from './src/screens/menudrawer';
import SettingsScreen from './src/screens/settings';
import {store, persistor, RootState} from './src/store';


i18n.translations = {
  ua: { welcometext: 'привітальний текст' },
  en: { logout:"logout",welcome: 'Hello', welcometext: 'привітальний текст', next : 'далі', logintext : "todo logintext" },
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Base/>
      </PersistGate>
    </Provider>
  );
}

const Base : any = connect((state:RootState) => {return {...state.user,...state.settings}})(({dispatch,isLogined,username,photo}:any)  =>  {
  console.log('App');  
  //console.log(require('./assets/images/user-profile.jpg'))
  let [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),  
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),

   });

   if (!fontsLoaded) {
     return <></>;
   }
   //dispatch({type:'SET_PHOTO', 'payload':null});
  if(!isLogined)
  return (  
          <NavigationContainer>
              <Stack.Navigator  screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login"   component={LoginScreen} />
              </Stack.Navigator>  
          </NavigationContainer>
  )
  else
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <Drawer.Navigator useLegacyImplementation
      
      drawerContent={props => <CastomMenu {...{props:{...props},username,dispatch,photo}} />}
      screenOptions={{
        //headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          //marginLeft: 100,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
              <Drawer.Screen name="Main" component={MainScreen} />
              <Drawer.Screen name="Settings" component={SettingsScreen} />

            </Drawer.Navigator>
          </NavigationContainer>
        </PersistGate>
    </Provider>
  );
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

