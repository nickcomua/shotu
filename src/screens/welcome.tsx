import React from "react";
import i18n from "i18n-js";
import { SafeAreaView, Button, Text } from "react-native";
import { connect } from "react-redux";
import { PropsWelcome } from "../types/navigation";
import { RootState } from "../store";

export default connect((state:RootState) => state.settings)(({ navigation, isLogined }:PropsWelcome & RootState['settings']) =>
{
  
  console.log("WelcomeScreen isLogined",isLogined);
  return ( 
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{i18n.t('welcometext')}</Text>
      <Button onPress={() => {navigation.navigate('Login')}}
              title={i18n.t('next')}
      />
    </SafeAreaView> 
  );
});
