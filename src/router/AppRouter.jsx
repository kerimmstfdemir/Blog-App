import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import { PostDetails } from "../pages/postDetails/PostDetails"
import ProfileInfos from "../pages/profileInfos/ProfileInfos"
import Register from "../pages/register/Register"
import PrivateRouter from "./PrivateRouter"

const AppRouter = () => {
  
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/userinfos" element={<ProfileInfos />}/>
        <Route path="/postDetails" element={<PrivateRouter/>}>
          <Route path="" element={<PostDetails />}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </>
  )
}

export default AppRouter