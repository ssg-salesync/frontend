import { Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserCheckState } from '../recoil/atoms/UserState';

/* eslint-disable */
const PrivateRoute = ({element})=>{
    const userCheck = useRecoilValue(UserCheckState)
    
    console.log("PrivateRoute")
    console.log("userCheck",userCheck)
    return userCheck ? element : <Navigate replace to="/"/>;
}
export default PrivateRoute;