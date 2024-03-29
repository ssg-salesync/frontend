import { Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { CategoryGetApi } from '../api/pos/category/CategoryGetApi';
import { CategoryState } from '../recoil/atoms/CategoryState';

/* eslint-disable */
const PrivateRoute = ({element})=>{
    console.log("PrivateRoute")
    const tokenCheck = localStorage.getItem('access_token')
    const setCategoryCheck = useSetRecoilState(CategoryState)
    const checkCategory = async () => {
        const categoryIsNull = await CategoryGetApi();
        console.log("categoryIsNull",categoryIsNull.categories.length == 0)
        return categoryIsNull.categories
    }
    const category = checkCategory()
    console.log("PrivateRoute-category:", category)
    console.log("PrivateRoute-element",element)
    // console.log("categoryIsNull",categoryIsNull)

    if(category.length == 0){
        console.log("PrivateRoute-category.length == 0")
        setCategoryCheck(true)
        return <Navigate replace to="/signup/stores/pos"/>
    }else{
        return tokenCheck !==null ? element : <Navigate replace to="/"/>;
    }
    // return tokenCheck !== null ? element : <Navigate replace to="/"/>;
}
export default PrivateRoute;