import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./TaskReducer";
export const store=configureStore({

    reducer:{
Task:TaskReducer,
    }
})

// import {configureStore,combineReducers} from '@reduxjs/toolkit'
// import TaskReducer from './TaskReducer'
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// const persistConfig = {
//     key: 'root',
//     storage,
//   }
//   const rootReducer = combineReducers({ 
//    Task:TaskReducer,
//   })
  
//   const persistedReducer = persistReducer(persistConfig, rootReducer)

//   export const store = configureStore({
//     reducer: persistedReducer
//   })
//   export const persistor = persistStore(store)