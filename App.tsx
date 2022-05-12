import * as React from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as FileSystem from "expo-file-system";
import { useFonts } from '@expo-google-fonts/inter';
import { Button, StyleSheet,Image, Text, View, TextInput, SafeAreaView, useWindowDimensions, TouchableWithoutFeedback, LogBox, Settings, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';   
import { connect, ConnectedComponent, InferableComponentEnhancerWithProps, Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'; 
import LoginScreen from './src/screens/login';
import MainScreen from './src/screens/main';
import WelcomeScreen from './src/screens/welcome';
import CastomMenu from './src/screens/menudrawer';
import SettingsScreen from './src/screens/settings';
import { RootDrawParmList, RootStackParamList } from './src/types/navigation';
//import AddContact from './src/screens/addcontact';
import {store, persistor, RootState} from './src/store'; 
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

i18n.translations = {
  ua: { welcometext: 'привітальний текст' },
  en: { logout:"logout",welcome: 'Hello', welcometext: 'привітальний текст', next : 'далі', logintext : "todo logintext" },
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawParmList>();
export default function App() {
  //store.dispatch({type:"SET_PHOTO_1" });
  //store.dispatch({type:"SET_LOADING_FALSE" });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Base/>
      </PersistGate>
    </Provider>
  );
}

const Base = connect((state:RootState) => {return {...state.user,...state.settings}})(({dispatch,isLogined,username,photo,isLoading}:any)  =>  {
  console.log('App'+isLoading);  
  //console.log(require('./assets/images/user-profile.jpg'))
  let [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),  
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),

   });
   
   const [Base64Val, setBase64Val] = React.useState<string|null>(null);
     React.useEffect(() => { 
       const f =async () => {
  let uri = FileSystem.documentDirectory + 'avatar.png';
  let getInfo = await FileSystem.getInfoAsync(uri);
  //getInfo && console.log(getInfo);
  let options = { encoding: FileSystem.EncodingType.Base64 };
  let base64 = await FileSystem.readAsStringAsync(uri, options);
  setBase64Val("data:image/jpeg;base64," + base64);
        dispatch({type:"SET_LOADING_FALSE" });
       }
        f();
  }, [isLoading]);

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) { 
      await SplashScreen.hideAsync();
    }
  }, [!isLoading]);

   if (!fontsLoaded||isLoading) {
     return null;
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
      
      drawerContent={props => <CastomMenu {...{props:{...props},username,dispatch,photo:Base64Val}} />}
      screenOptions={{ 
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: { 
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
              <Drawer.Screen options={{  headerShown: true,}} name="Main" component={MainScreen} />
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

