import React from "react";
import { SafeAreaView, Button,Text, View } from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js"; 
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


const pickImage = async (dispatch:any) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, 
      base64: true,
      aspect: [1, 1],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      
      FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'avatar.png',(result as any).base64,{
        encoding: FileSystem.EncodingType.Base64,
      });
     // console.log(result.base64);

     dispatch({type:"SET_LOADING_TRUE" });
    }
  };

export default connect((state:any )=> state.user)(({ navigation, dispatch, username } :any) => {
    console.log('Settings') 
    return ( 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={() => pickImage(dispatch)} />
        </View> 
    );
  });
  