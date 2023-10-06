import {configureStore,combineReducers} from '@reduxjs/toolkit'
import AnimeReducer from './WebReducers'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({ 
   Anime:AnimeReducer,
  })
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store = configureStore({
    reducer: persistedReducer
  })
  export const persistor = persistStore(store)