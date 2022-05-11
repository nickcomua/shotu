import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import settingsReducer from './settings'
//import AsyncStorage  from '@react-native-async-storage/async-storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import { persistStore,persistReducer } from 'redux-persist' 
import thunk from 'redux-thunk'
import createSecureStore from "redux-persist-expo-securestore";
const storage = createSecureStore()
const persistConfig : any= {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2 // may be error
}
const reducers = combineReducers({
     user: userReducer,
     settings: settingsReducer
 });
  
 
 const persistedReducer = persistReducer(persistConfig, reducers);
 
 
 export const store = configureStore({
     reducer: persistedReducer,
     devTools: process.env.NODE_ENV !== 'production',
     middleware: [thunk]
 });
 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch 
export const persistor = persistStore(store)