import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptianRiding from "./pages/CaptianRiding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>
        <Route path="/captain-login" element={<CaptainLogin />}></Route>
        <Route path="/captain-signup" element={<CaptainSignup />}></Route>
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        ></Route>

        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        ></Route>

        <Route path='/captain-home' element={
         <CaptainProtectWrapper>
          <CaptainHome/>
         </CaptainProtectWrapper>
          
          
        }></Route>

        <Route path="/captain/logout"
        element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
          
        }>

        </Route>

        <Route path="/riding" element={<Riding/>}></Route>
        <Route path="/captain-riding" element={<CaptianRiding/>}></Route>
       
      </Routes>
    </div>
  );
};

export default App;
