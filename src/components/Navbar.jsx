import NavbarAfterLogin from "./NavbarAfterLogin"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from "react";

const Navbar = () => {
    const [loginInfo, setLoginInfo] = useState(false)

    return (
        <>
            {loginInfo || <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize:"1.4rem" }}>
                            Blog App
                        </Typography>
                        <Button style={{fontSize:"1.1rem"}} color="inherit">Login</Button>
                        <Button style={{fontSize:"1.1rem"}} color="inherit">Register</Button>
                    </Toolbar>
                </AppBar>
            </Box>}

            {loginInfo && <NavbarAfterLogin />}
        </>
    )
}

export default Navbar;