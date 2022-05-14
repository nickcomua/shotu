import React from "react";
import i18n from "i18n-js";

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as Google from 'expo-auth-session/providers/google';
import { SafeAreaView, Button, Text, TextInput, Settings, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as firebase from "firebase/app";
import "firebase/firestore";
import {updateProfile, signInAnonymously, getAuth, GoogleAuthProvider, signOut, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { Alert } from "react-native";
import { initializeApp } from "firebase/app";

// const credential = GoogleAuthProvider.credential(
//   googleUser.getAuthResponse().id_token);




type PropsLogin = NativeStackScreenProps<{ Welcome: undefined; Login: undefined; }, 'Login', 'Stack'> & RootState['settings'] & RootState['user'] & AppDispatch;
export default connect((state: RootState) => { return { ...state.user, ...state.settings } })(({ navigation, dispatch, username, isLogined }: PropsLogin) => {
  const auth = getAuth();
  const [logintext, onChangeLogin] = React.useState('');
  const [passwordtext, onChangePassword] = React.useState('');
  const temp = () => {
    console.log(logintext);
    signInAnonymously(auth )
      .then((userCredential) => {
        // Signed in 

        const user = userCredential.user;
        console.log(user);

    updateProfile(userCredential.user, {"displayName" : "test"})
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
    dispatch(setUsername(logintext))
    dispatch({ type: 'LOGIN' })
  }
  return (
    <SafeAreaView style={{ padding: 20, marginTop: 50 }}>
      <Text>{i18n.t('logintext')}</Text>
<TextInput style = {{height: 40,margin: 12,borderWidth: 1,padding: 10, width:120}}
         placeholder={'Login'}
         onChangeText={onChangeLogin} value={logintext}
         onSubmitEditing={temp}/> 
<Button onPress={temp} 
       title={i18n.t('next')} /> 
       
</SafeAreaView>
  )
});
/*
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState<string>();
  const [verificationId, setVerificationId] = React.useState<string>();
  const [verificationCode, setVerificationCode] = React.useState<string>();

  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState<any>();
  const attemptInvisibleVerification = true;
  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: 'Verification code has been sent to your phone.',
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await signInWithCredential(auth, credential);
            showMessage({ text: 'Phone authentication successful 👍' });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: 'center' } as any,
          ]}
          onPress={() => showMessage(undefined)}>
          <Text
            style={{
              color: message.color || 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : (
        undefined
      )}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
});
/* <Text>{i18n.t('logintext')}</Text>
<TextInput style = {{height: 40,margin: 12,borderWidth: 1,padding: 10, width:120}}
         placeholder={'Login'}
         onChangeText={onChangeLogin} value={logintext}
         onSubmitEditing={temp}/>
<TextInput style = {{height: 40,margin: 12,borderWidth: 1,padding: 10, width:120}}
         placeholder={'pswd'}
         onChangeText={onChangePassword} value={passwordtext}
         onSubmitEditing={temp}/>
<Button onPress={temp} 
       title={i18n.t('next')} /> 
       
</SafeAreaView>
);
});*/

function setUsername(logintext: string): any {
  return { type: 'SET_USERNAME', payload: logintext };
}
