import { Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import ProfileInfos from "../pages/profileInfos/ProfileInfos"
import Register from "../pages/register/Register"

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/userinfos" element={<ProfileInfos />}/>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </>
  )
}

export default AppRouter