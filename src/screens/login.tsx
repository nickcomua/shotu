import React from "react";
import i18n from "i18n-js";

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as Google from 'expo-auth-session/providers/google';
import { SafeAreaView, Button, Text, TextInput, Settings, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import "firebase/firestore";
import { updateProfile, signInAnonymously, getAuth, GoogleAuthProvider, signOut, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import { auth, db } from "../firebase";
import { get } from "@firebase/database";
import { ref } from "firebase/database";




type PropsLogin = NativeStackScreenProps<{ Welcome: undefined; Login: undefined; }, 'Login', 'Stack'> & RootState['settings'] & RootState['user'] & AppDispatch;
export default connect((state: RootState) => { return { ...state.user, ...state.settings } })(({ navigation, dispatch, username, isLogined }: PropsLogin) => {
  const [logintext, onChangeLogin] = React.useState('');
  const temp = async () => {
    console.log(logintext);
    const userr = (await signInAnonymously(auth)).user
    updateProfile(userr, { "displayName": logintext })

    const photo = await get(ref(db, 'avatars/default')) 

    dispatch({ type: 'SET_PHOTO', payload:  photo.val()});
    dispatch({type: 'SET_USERNAME', payload: logintext})
    dispatch({ type: 'LOGIN' })
  }
  return (
    <SafeAreaView style={{ padding: 20, marginTop: 50 }}>
      <Text>{i18n.t('logintext')}</Text>
      <TextInput style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: 120 }}
        placeholder={'Login'}
        onChangeText={onChangeLogin} value={logintext}
        onSubmitEditing={temp} />
      <Button onPress={temp}
        title={i18n.t('next')} />

    </SafeAreaView>
  )
});
