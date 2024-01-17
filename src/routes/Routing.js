import { Navigate, Route, Router, Routes} from "react-router-dom";
import { useRecoilValue } from "recoil";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import StorePage from "../pages/StorePage";
import PosPage from "../pages/PosPage";
import MyPage from "../pages/MyPage";
import InfoPage from "../pages/InfoPage";
import DashboardPage from "../pages/DashboardPage";
import OrderPopup from "../popup/OrderPopup";
import PaymentPage from "../popup/PaymentPopup";
import CardPage from "../popup/CardPopup";
import CashPage from "../popup/CashPopup";
import CostPage from "../pages/CostPage";
import InfoNpwPage from "../pages/InfoNpwPage";
import KioskPage from "../pages/KioskPage";
import NotFoundPage from "../pages/NotFoundPage";
import WelcomePage from "../pages/WelcomePage";
import Layout from "../components/common/Layout";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import InternalErrorPage from "../pages/InternalErrorPage";
import { UserCheckState } from "../recoil/atoms/UserState";

/* eslint-disable*/
function Routing() {
  // const userCheck = useRecoilValue(UserCheckState)

  return(
    <Routes>
    <Route element={<Layout />}>      
      {/* <Route path="/login" element={<PublicRoute element={<LoginPage />} />} /> */}
      {/* <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} /> */}
      {/* <Route path="/signup/stores" element={<PublicRoute element={<StorePage />} />} /> */}
      <Route path="/signup/stores/pos" element={<PrivateRoute element={<PosPage />}/>} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />} />
      <Route path="/mypage/info" element={<PrivateRoute element={<InfoPage />} />} />
      <Route path="/mypage/info/newpassword" element={<PrivateRoute element={<InfoNpwPage />} />} />
      <Route path="/mypage/cost" element={<PrivateRoute element={<CostPage />} />} />
      <Route path="/mypage/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
      <Route path="/order/:tableId" element={<PrivateRoute element={<OrderPopup />} />} />
      <Route path="/order/:tableId/payment" element={<PrivateRoute element={<PaymentPage />} />} />
      <Route path="/order/:tableId/payment/card" element={<PrivateRoute element={<CardPage />} />} />
      <Route path="/order/:tableId/payment/cash" element={<PrivateRoute element={<CashPage />} />} />
      <Route path="/kiosk" element={<PrivateRoute element={<KioskPage />} />} />
    </Route>
    <Route path="/" element={<WelcomePage/>} />
    <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
    <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
    <Route path="/signup/stores" element={<PublicRoute element={<StorePage />} />} />
    <Route path="/500" element={<InternalErrorPage />} />
    {/* NotFound 페이지를 가장 맨 아래에 위치 */}
    <Route path="/*" element={<NotFoundPage />} />
  </Routes>
       
    // <Routes>
    //   <Route element={<Layout />}>
    //   <Route path="/" element={<WelcomePage/>}/>
    //   <Route path="/login" element={<LoginPage/>}/>
    //   <Route path="/signup" element={<SignupPage/>}/>
    //   <Route path="/home" element={<Home/>}/>
    //   <Route path="/signup/stores" element={<StorePage/>}/>
    //   <Route path="/signup/stores/pos" element={<PosPage/>}/>
    //   <Route path="/mypage" element={<MyPage/>}/>
    //   <Route path="/mypage/info" element={<InfoPage/>}/>
    //   <Route path="/mypage/info/newpassword" element={<InfoNpwPage/>}/>
    //   <Route path="/mypage/cost" element={<CostPage/>}/>
    //   <Route path="/mypage/dashboard" element={<DashboardPage/>}/>
    //   <Route path="/order/:tableId" element={<OrderPopup/>}/>
    //   <Route path="/order/:tableId/payment" element={<PaymentPage/>}/>
    //   <Route path="/order/:tableId/payment/card" element={<CardPage/>}/>
    //   <Route path="/order/:tableId/payment/cash" element={<CashPage/>}/>

    //   <Route path="/kiosk" element={<KioskPage/>}/>
    //   </Route>
    //    {/* NotFound 페이지를 가장 맨 아래에 위치 */}
    //    <Route path="/*" element={<NotFoundPage />} />
       
    // </Routes>
  );
};

export default Routing