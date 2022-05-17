import * as React from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as FileSystem from "expo-file-system";
import { useFonts } from '@expo-google-fonts/inter';
import { Button, StyleSheet, Image, Text, View, TextInput, SafeAreaView, useWindowDimensions, TouchableWithoutFeedback, LogBox, Settings, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect, ConnectedComponent, InferableComponentEnhancerWithProps, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LoginScreen from './src/screens/login';
import MainScreen from './src/screens/main';
import WelcomeScreen from './src/screens/welcome';
import CastomMenu from './src/screens/menudrawer';
import SignUpScreen from './src/screens/signup';
import SettingsScreen from './src/screens/settings';
import { BasePops, RootDrawParmList, RootStackParamList } from './src/types/navigation';
//import AddContact from './src/screens/addcontact';
import { store, persistor, RootState } from './src/store';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { auth, db } from './src/firebase';
import {
  onAuthStateChanged,
  updateProfile,
  getAdditionalUserInfo
} from 'firebase/auth';
import { ref, get, onValue } from 'firebase/database';



i18n.translations = {
  ua: { welcometext: 'привітальний текст' },
  en: { logout: "logout", welcome: 'Hello', welcometext: 'привітальний текст', next: 'далі', logintext: "todo logintext" },
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;



const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawParmList>();
export default function App() { 
  return null
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Base />
      </PersistGate>
    </Provider>
  );
}

const Base = connect((state: RootState) => { return { ...state.user, ...state.settings } })
  (({ dispatch, isLogined, username, isLoading, photo, bio, uid }: BasePops) => {
    //dispatch({type:"LOGOUT" });  
    console.log(!!photo)
    console.log(bio, username, uid)
    //dispatch({ type: 'LOGOUT' });

    // onAuthStateChanged(auth, user => {
    //   console.log(321)
    //   console.log(user)
    //   if (user != null) {
    //     dispatch({ type: "LOGIN" })
    //     dispatch({ type: "SET_USERNAME", username: user.displayName })
    //     dispatch({ type: "SET_UID", payload: user.uid })
    //   }
    //   else {
    //     console.log("not logined")
    //     dispatch({ type: "LOGOUT" })
    //   }
    // });

    let [fontsLoaded] = useFonts({
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
      'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
      'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
    });
    onValue(ref(db,'/contacts'), (snapshot) => {
      snapshot.val().forEach(({uid1,uid2,isFinite}) => {
        if(isFinite){
          if(uid1 == uid)
          {
           // dispatch({ type: "ADD_CONTACT", payload: {id:uid2,username:} })
          }
          else if(uid2 == uid)
          {
            
          }
        }
      })
    });

    onValue(ref(db, 'avatars/' + uid), (snapshot) => {
      console.log(uid)
      console.log(123)
      if (snapshot.val()) {
        dispatch({ type: 'SET_PHOTO', payload: snapshot.val() })
      }
    });

    React.useEffect(() => {
      const f = async () => {
        if (isLoading) {
          await SplashScreen.preventAutoHideAsync();
          console.log(222)
          updateProfile(auth.currentUser, {
            displayName: username
          });

          dispatch({ type: "SET_LOADING_FALSE" });
        }
        else {
          await SplashScreen.hideAsync();
        }
      }
      f();
    }, [isLoading]);
    if (!fontsLoaded || isLoading) {
      return null;
    }
    if (!isLogined)
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    else
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <NavigationContainer>
              <Drawer.Navigator useLegacyImplementation

                drawerContent={props => <CastomMenu {...{ props: { ...props }, username, dispatch, photo, bio }} />}
                screenOptions={{
                  drawerActiveBackgroundColor: '#aa18ea',
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#333',
                  drawerLabelStyle: {
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                  },
                }}>
                <Drawer.Screen options={{ headerShown: true, }} name="Main" component={MainScreen} />
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

