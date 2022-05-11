import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView, Button, Text, View,Image, ImageBackground, TouchableHighlight, TouchableOpacity } from "react-native";
export default ({props, username,dispatch,photo}:any):any => {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{backgroundColor: '#8200d6'}}>
          {/* <ImageBackground
            source={require('../../assets/images/menu-bg.jpeg')}
            style={{padding: 20}}> */}
              <TouchableHighlight underlayColor="" onPress={() => alert("HI")}>
            <Image 
              source={ photo ? {uri:photo} : require('../../assets/images/user-profile.png')
            }
              style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10, marginLeft: 10}}
            /></TouchableHighlight>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                marginBottom: 5,
                marginLeft: 15,
              }}>
              {username}
            </Text>
            {/* <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Regular',
                  marginRight: 5,
                }}>
                280 Coins
              </Text> 
            </View> */}
          {/* </ImageBackground> */}
          <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
            <DrawerItemList {...props} />
          </View>
  
  
        {
          //TODO
        }
        </DrawerContentScrollView>
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
          <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {//<Ionicons name="share-social-outline" size={22} />
  }
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                }}>
                Share //TODO
              </Text>
            </View>
          </TouchableOpacity>
          {/*
          <TouchableOpacity onPress={() => {dispatch({type:'LOGOUT'})}} style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
             {//} <Ionicons name="exit-outline" size={22} />
  }
              <Text
                
                style={{
                  fontSize: 15,
              //    fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
              */}
        </View>
      </View>
    );
  };