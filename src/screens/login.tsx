import React from "react";
import i18n from "i18n-js";
import { SafeAreaView, Button, Text, TextInput, Settings } from "react-native";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
//hz
type PropsLogin = NativeStackScreenProps<{ Welcome: undefined; Login: undefined; }, 'Login', 'Stack'> & RootState['settings']&  RootState['user'] & AppDispatch;
export default  connect((state:RootState )=> {return {...state.user,...state.settings}})(({ navigation, dispatch, username, isLogined } :PropsLogin) => {
  console.log("login "+username);
  const [logintext, onChangeText] = React.useState('');
  const temp = () => {
  //alert('username :'+logintext)
    dispatch(setUsername(logintext))
    dispatch({type:'LOGIN'}) 
    //navigation.navigate('Main')  
  }
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{i18n.t('logintext')}</Text>
      <TextInput style = {{height: 40,margin: 12,borderWidth: 1,padding: 10, width:120}}
                placeholder={'Login'}
                onChangeText={onChangeText} value={logintext}
                onSubmitEditing={temp}/>
      <Button onPress={temp} 
              title={i18n.t('next')} />
    </SafeAreaView>
  );
});

function setUsername(logintext: string): any {
  return {type:'SET_USERNAME', payload:logintext};
}
