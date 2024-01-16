import { Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserCheckState } from '../recoil/atoms/UserState';

/* eslint-disable */
const PublicRoute = ({element})=>{
    console.log("publicRoute")
    // const userCheck = useRecoilValue(UserCheckState)
    const tokenCheck = localStorage.getItem('access_token')
    // console.log("userCheck",userCheck)
    console.log("element",element)

    return tokenCheck !==null ? <Navigate replace to="/home"/> : element ;
  };
export default PublicRoute;