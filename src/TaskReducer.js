import { createSlice } from "@reduxjs/toolkit";
import Data from "./16.10.23 Task/Data";

const initialState = Data;

export const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    info: (state, action) => {
    
      return action.payload;
    },
  },
});

export const { info } = TaskSlice.actions;
export default TaskSlice.reducer;
