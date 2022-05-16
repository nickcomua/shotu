import React from "react";
import {StyleSheet, SafeAreaView, Button,Text,Image, View ,TextInput, ActivityIndicator, FlatList, RefreshControl} from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js"; 
import { HeaderBackButton } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';  
import { Layout } from "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PropsMainStack,PropsMain,PropsAddContactStack,DrawParmList } from "../types/navigation";
import { AppDispatch, RootState } from "../store";
import AddContact from "./addcontact";
import ScanQR from "./scanqr";
import AddContactMenu from "./addcontactmenu";

const Stack = createNativeStackNavigator<DrawParmList>();

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
      <Stack.Screen name="Add Contact" component={AddContact} options={{headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          navigation.setOptions({
                   headerShown: true,
                 });
          navigation.goBack();
        }}
      />
    ),}}/>
      <Stack.Screen name="ScanQR" component={ScanQR} />
      <Stack.Screen name="AddContactMenu" component={AddContactMenu} options={{headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          navigation.navigate("Add Contact");
        }}
      />
    ),}}/>
    </Stack.Navigator>
  );
}

 
type PropsComonMain = PropsMainStack & RootState['settings']&  RootState['user'] & AppDispatch;
const MainScreen = connect((state:RootState )=> { return { ...state.user, ...state.settings } })(({ navigation, dispatch, username, isLoading } :PropsComonMain) => {
    //console.log('MainScreen');  
    // React.useEffect(() => {
    //   const unsubscribe = navigation.addListener('focus', () => { 
    //     console.log('MainScreen focus');
    //     perents.setOptions({
    //       headerShown: true,
    //     });
    //   }); 
    //   return unsubscribe;
    // }, [navigation]);
  
    return (  <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      {isLoading ? <ActivityIndicator /> : null}
      <FlatList 
      renderItem={({ item }) => (
        <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            source={{ uri: item.photo }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
            <Text style={{ fontSize: 15 }}>{item.phone}</Text>
          </View>
        </View>
      )}
      data={[
        {
          name: "John Doe",
          phone: "123-456-7890",
          photo:
            "https://images.unsplash.com/photo-1593642647962-b9e5f8f8d9b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        },
        {
          name: "Jane Doe",
          phone: "123-456-7890",
          photo:
            "https://images.unsplash.com/photo-1593642647962-b9e5f8f8d9b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        }]}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => dispatch({type:'SET_LOADING_TRUE'})} />
        }
      />
      <Ionicons name="add-circle-outline" size={60} color="black" style={styles.icon} onPress={()=>navigation.push("Add Contact")}/>
  </SafeAreaView>
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