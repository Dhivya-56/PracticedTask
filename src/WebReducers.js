import { createSlice } from "@reduxjs/toolkit";

export const WebSlice=createSlice({
    name:'Anime',
     initialState:{
   value:{
            email:'',
            pass:'',
            fname:'',
            confirmpass:'',
            lname:'',
            phno:null,
            loggIn:false,
   }
     },
     reducers:{
        info:(state,action)=>{
            state.value=action.payload
        }
        
     }
})
export const { info } = WebSlice.actions;
export default WebSlice.reducer;
