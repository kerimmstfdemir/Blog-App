import NavbarAfterLogin from "./NavbarAfterLogin"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

const Navbar = () => {
    const { loginInformation } = useSelector((state) => state.loginInfos)
    const navigate = useNavigate()

    return (
        <>
            {loginInformation || <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar className="d-flex justify-content-between">
                        <div className="d-flex align-items-center" style={{gap:"0.5rem", cursor:"pointer"}} onClick={()=>navigate("/")}>
                            <SpeakerNotesIcon style={{fontSize:"2rem"}}/>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize:"1.4rem" }}>
                            Blog App
                            </Typography>
                        </div>
                        <div>
                        <Button style={{fontSize:"1.1rem"}} color="inherit" onClick={() => navigate("/login")}>Login</Button>
                        <Button style={{fontSize:"1.1rem"}} color="inherit" onClick={() => navigate("/register")}>Register</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>}

            {loginInformation && <NavbarAfterLogin />}
        </>
    )
}

export default Navbar;