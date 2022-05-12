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
  };
export type DrawParmList = {
    MainInStack   :undefined,
    'Add Contact' :undefined
  }  
export type PropsWelcome = NativeStackScreenProps<RootStackParamList, 'Welcome', 'Stack'> 
export type PropsSettingst = DrawerScreenProps<RootDrawParmList, 'Settings', 'Stack'> & RootState['settings']&  RootState['user'] & AppDispatch;
export type PropsMain = DrawerScreenProps<RootDrawParmList, 'Settings', 'Stack'> 
export type PropsMainStack = CompositeScreenProps<PropsMain, NativeStackScreenProps<{'MainInStack':undefined,'Add Contact':undefined}, 'MainInStack', 'Drawer'>>

export type PropsAddContactStack = CompositeScreenProps<PropsMain, NativeStackScreenProps<{'MainInStack':undefined,'Add Contact':undefined}, 'MainInStack', 'Drawer'>>
