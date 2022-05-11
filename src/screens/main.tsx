import React from "react";
import { SafeAreaView, Button,Text } from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js"; 


export default connect((state:any )=> state.user)(({ navigation, dispatch, username } :any) => {
    console.log('MainScreen');console.log(username);
    return (
      <SafeAreaView >
        <Text>{i18n.t('welcometext')}</Text>
        <Text>{username}</Text>
        <Button onPress={() => dispatch({type:'LOGOUT'})} title={i18n.t('logout')} />
      </SafeAreaView>
    );
  });
  