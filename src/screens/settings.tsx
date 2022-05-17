import React from "react";
import { SafeAreaView, Button, Text, View } from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js";

import * as Google from 'expo-auth-session/providers/google';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack/";
import { PropsSettingst } from "../types/navigation";
import { TextInput } from "react-native-gesture-handler";
import { auth, db } from "../firebase";
import { ref, set } from "firebase/database";
 

const pickImage = async (dispatch: any) => { 
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true, 
    base64: true,
    aspect: [1, 1],
    quality: 1,
  });

  //console.log(result);

  if (!result.cancelled) {

    // FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'avatar.png',(result as any).base64,{
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    // console.log(result.base64);
    console.log('avatars/'+auth.currentUser.uid as string) 
    const mountainImagesRef = ref(db, 'avatars/'+auth.currentUser.uid as string); 
    set(mountainImagesRef,"data:image/jpeg;base64," + (result as any).base64);
    // uploadString(mountainImagesRef, (result as any).base64, 'base64',{ contentType: 'image/jpeg',}).then((snapshot) => {
    //   console.log('Uploaded a data_url string!');
    // });
    //dispatch({type: 'SET_LOADING_TRUE'})
    //dispatch({ type: "SET_PHOTO", payload:"data:image/jpeg;base64,"+(result as any).base64 });
  }
};
export default connect((state: RootState) => state.user)
  (({ navigation, dispatch, username, bio }: PropsSettingst) => {
  console.log('Settings')  
  const [tusername, setTusername] = React.useState<string|null>(username);
  const [tbio, setTbio] = React.useState<string|null>(bio);
  return (
    <View style={{ flex: 1 }}> 
      <TextInput  placeholder="bio" value={tbio} onChangeText={setTbio} onSubmitEditing={() => {dispatch({ type: "SET_BIO", payload: tbio })}} />
      <TextInput placeholder="username" value={tusername} onChangeText={setTusername} onSubmitEditing={() => {dispatch({ type: "SET_USERNAME", payload: tusername })}} />
      <Button title="Set Photo" onPress={() => pickImage(dispatch)} /> 
    </View>
  );
});
