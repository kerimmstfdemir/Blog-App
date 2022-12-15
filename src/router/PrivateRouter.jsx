import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
    const { loginInformation } = useSelector((state) => state.loginInfos)
  return (
    <>
    {loginInformation ? <Outlet /> : <Navigate to="/"/> }
    </>
  )
}

export default PrivateRouter