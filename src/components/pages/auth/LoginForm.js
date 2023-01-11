import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../../firebase-config'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles.css'


const  LoginForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({email:"",password:""})
    const authentication = auth;

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user,[name]: value})
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        if(user.email && user.password){
            signInWithEmailAndPassword(authentication, user.email, user.password)
            .then((response) => {
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                sessionStorage.setItem('userEmail', user.email)
                navigate('/dashboard')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorCode", errorCode)
                console.log("errorMessage", errorMessage)
                toast.error(errorCode);
            })
        }else{
            toast.error("please fill missing fields"); 
        }
    }

    return (
        <div>
            <div className="heading-container">
                <h3>
                    Login
                </h3>
            </div>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
        >
            <TextField name="email" type={"email"} required label="Enter the Email" variant="outlined" onChange={handleChange}/><br/>
            <TextField name="password" type={"password"} required label="Enter the Password" variant="outlined" onChange={handleChange}/><br/>
            <Button variant="contained" type={"submit"}>Login</Button><br/>
            Don't have an account yet?<Link to='/register'>Register</Link><br/>
            forgot your password?<Link to='/' >Click here</Link>
            <ToastContainer/>
            </Box>
            <Box className='instructions_box'>
                For checking app purposes use the following users:<br/>
                Login as "simple user" role with: <b>eli@gmail.com</b><br/>
                Login as "Admin" role user with: <b>admin@gmail.com</b><br/>
                password for both users will be: <b>123456</b><br/>
                *You may also register a new user as a "simple user" role 
            </Box>
        </div>
    );
}
export default LoginForm;