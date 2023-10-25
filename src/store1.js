import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./TaskReducer";
export const store=configureStore({

    reducer:{
Task:TaskReducer,
    }
})

