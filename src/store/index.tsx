import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import settingsReducer from './settings'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { batchedSubscribe } from "redux-batched-subscribe";
import { debounce } from "lodash";

const persistConfig: any = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2 // may be error
}
const reducers = combineReducers({
  user: userReducer,
  settings: settingsReducer
});


const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
  reducer: persistedReducer,
  enhancers: batchedSubscribe(
    debounce(notify => {
      notify();
    })
  ),
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = { dispatch: typeof store.dispatch }
export const persistor = persistStore(store)