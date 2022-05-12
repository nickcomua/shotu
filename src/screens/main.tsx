import React from "react";
import {StyleSheet, SafeAreaView, Button,Text,Image, View ,TextInput} from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js"; 
import { Ionicons } from '@expo/vector-icons';  
import { Layout } from "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PropsMainStack,PropsMain,PropsAddContactStack } from "../types/navigation";
import { AppDispatch, RootState } from "../store";
const Stack = createNativeStackNavigator();
export default function App({navigation,route}:PropsMain) {
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTitle: () =>  <Header /> 
    });
    }, [navigation]);
    return (
    <Stack.Navigator   >
      <Stack.Screen name="MainInStack" component={MainScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Add Contact" component={AddContact} />
    </Stack.Navigator>
  );
}


const AddContact = ({navigation}:PropsAddContactStack) => {
  React.useLayoutEffect(() => {
    navigation.getParent().setOptions({
        headerShown: false,
  });
 }, [navigation.getParent()]
  );
  return null;
}
type PropsComonMain = PropsMainStack & RootState['settings']&  RootState['user'] & AppDispatch;
const MainScreen = connect((state:any )=> state.user)(({ navigation, dispatch, username } :PropsComonMain) => {
    console.log('MainScreen'); 
    const perents = navigation.getParent();
    React.useEffect(() => {
      console.log('MainScreen useLayoutEffect');
      perents.setOptions({
        headerShown: true,
  })}, [navigation]) 
    return ( 
      <Ionicons name="add-circle-outline" size={60} color="black" style={styles.icon} onPress={()=>navigation.push("Add Contact")}/>
    );
  });

  function Header() {
    return (
      <View style={styles.header}> 
          <TextInput style={styles.headerText} placeholder="Search" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    header: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#333',
      //letterSpacing: 1,
      flex: 1,
    },
    icon: {
      //position: 'absolute',
      //left: "50%"
      position: 'absolute',
      bottom: 15,
      right: 15,
    }
  });