import { Route, Navigate } from 'react-router-dom';

/* eslint-disable */
const PublicRoute = ({element})=>{
    console.log("publicRoute")

    const tokenCheck = localStorage.getItem('access_token')

    console.log("element",element)

    return tokenCheck !==null ? <Navigate replace to="/home"/> : element ;
  };
export default PublicRoute;