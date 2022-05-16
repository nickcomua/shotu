import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { Settings } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer/lib/typescript/src/types";
import { RootState, AppDispatch } from "../store";
import type { CompositeScreenProps, ParamListBase } from '@react-navigation/native';
import React, { ComponentType } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

interface SettingsType{ 
    isLogined: boolean; 
    isLoading: boolean; 
  }

interface UserType{
    username: string;
}

export type  RootDrawParmList = {
    Main: {payload:boolean};
    Settings: undefined;
}
 

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined; 
    SignUp: undefined;
  };
export type DrawParmList = {
    MainInStack   :undefined,
    'Add Contact' :undefined,
    'ScanQR'      :undefined,
    'AddContactMenu': {QrCode:string},
  }  
export type BasePops = RootState['settings']&  RootState['user'] & AppDispatch;
export type PropsWelcome = NativeStackScreenProps<RootStackParamList, 'Welcome', 'Stack'> 
export type PropsSettingst = DrawerScreenProps<RootDrawParmList, 'Settings', 'Stack'> & RootState['settings']&  RootState['user'] & AppDispatch;
export type PropsMain = CompositeScreenProps<DrawerScreenProps<RootDrawParmList, 'Main', 'Stack'>,PropsMainStack>
export type PropsMainStack = NativeStackScreenProps<DrawParmList, 'MainInStack', 'Drawer'>

export type PropsAddContactStack = NativeStackScreenProps<DrawParmList, 'MainInStack', 'Drawer'>& RootState['settings']&  RootState['user'] & AppDispatch;

export type PropsQRCodeStack = NativeStackScreenProps<DrawParmList, 'ScanQR', 'Drawer'>& RootState['settings']&  RootState['user'] & AppDispatch;
export type PropsAddContactMenuStack = NativeStackScreenProps<DrawParmList, 'AddContactMenu', 'Drawer'>& RootState['settings']&  RootState['user'] & AppDispatch;