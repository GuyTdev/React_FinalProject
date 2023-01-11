import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../../firebase-config'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  RegisterForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({email:"",password:"",password_validate:""})

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user,[name]: value})
    }
    const handleSignUp = (e) =>{
        e.preventDefault();
        if(user.email&& user.password && user.password_validate){
            if(validateEmailPattern(user.email)){
                if(user.password && user.password_validate === user.password){
                    const authentication = auth;
                    createUserWithEmailAndPassword(authentication, user.email, user.password)
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
                    });
                }
                else{
                    toast.error(" validate password not match")
                }
            }else{
                toast.error("please enter a valid email pattern")
            }
            }else{
                toast.error("please fill missing fields")
            }

        }
    const validateEmailPattern = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
    return (
        <div>
            
            <div className="heading-container">
                <h3>
                    Register
                </h3>
            </div>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSignUp}
        >
            <TextField name="email" type={"email"} required label="Enter the Email" variant="outlined" onChange={handleChange}/><br/>
            <TextField name="password" type= {"password"} required label="Enter the Password" variant="outlined" onChange={handleChange}/><br/>
            <TextField name="password_validate" type= {"password"} required label="Repeat the Password" variant="outlined" onChange={handleChange}/><br/>
            <Button variant="contained" type='submit'>Register</Button><br/>
              Already have an account?<Link to='/login'>Click to Login</Link>
            <ToastContainer/>
        </Box>
        </div>
    );
}
export default RegisterForm;