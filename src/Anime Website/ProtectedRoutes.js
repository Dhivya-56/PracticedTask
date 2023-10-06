import React from "react";
import { Navigate } from "react-router-dom";
import Home1 from './Home1'
import Dash from "./Dash";
import {  useSelector } from "react-redux";


const ProtectedRoutes = () => {
const selector=useSelector(state=>state.Anime.value)
console.log(selector)
  return  selector.loggIn? <Dash/>: <Navigate to="/" />;
};

export default ProtectedRoutes;

