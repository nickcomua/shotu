import React from "react";
import { SafeAreaView, Button,Text, View } from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js"; 
import * as ImagePicker from 'expo-image-picker';

const pickImage = async (dispatch:any) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
       dispatch({type:"SET_PHOTO",payload:result.uri});
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
  