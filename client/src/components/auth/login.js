import React, { useState,useEffect } from "react";
import "../style.css";
import { TextField, Button } from "@mui/material"
import { Login,setAuthData } from "../../redux/actions/auth-action"
import { useDispatch, useSelector } from "react-redux"
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory,Link } from "react-router-dom";


export default function LoginComponent() {

    const history=useHistory()
    const dispatch=useDispatch()

    const [inputValues, setInput] = useState({ email: '', password: '' })
    const [err, setErr] = useState({ email: '', password: '' })

    const login_err = useSelector(state => state.auth_value.login_err ? state.auth_value.login_err : '')
    const loader = useSelector(state => state.auth_value.loader ? state.auth_value.loader : false)
    const user_login = useSelector(state => state.auth_value.user_login ? state.auth_value.user_login : false)

    const token = localStorage.getItem("authData");

    useEffect(()=>{
        dispatch(setAuthData('login_err',''))
        if(token){
            history.push('/posts')
        }
        return()=>{
            dispatch(setAuthData('login_err',''))
        }
    },[user_login])

    const handleChange = (e) => {
        const { value, name } = e.target
        setInput({ ...inputValues, [name]: value })
        setErr({ ...err, [name]: '' })
    };

    const LoginFn = (e) => {
        e.preventDefault()
        if (!inputValues.email) {
            setErr({ ...err, email: 'error' })
        }
        else if (!inputValues.password) {
            setErr({ ...err, password: 'error' })
        }
        else {
            setErr({ email: '', password: '' })
            dispatch(Login(inputValues))
        }
    }
    return (
        <div className="App">
            <form className="form" onSubmit={LoginFn}>
                <div style={{ width: '100%', textAlign: 'center', fontWeight: '500' }}>WELCOME BACK</div>

                <TextField
                    error={err.email}
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    value={inputValues.email}
                    style={{ marginTop: '10px' }}
                    autoComplete='off'
                />
                <TextField
                    error={err.password}
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={inputValues.password}
                    style={{ marginTop: '10px' }}
                    autoComplete='off'
                />
                {
                    login_err ?
                        <div style={{ color: 'red' }}>
                            {login_err}
                        </div>
                        : null
                }

                {
                    loader ?
                        <div style={{width:'100%',textAlign:'center'}}>
                            <CircularProgress size={30} />
                        </div>
                        :
                        <>
                            <Button type="submit" color="primary" variant='contained' style={{ marginTop: '10px' }}>
                                Log in
                            </Button>
                            <span>Dont have an acount? <Link to='/signup'>SignUp</Link></span>
                        </>
                }

            </form>
        </div>
    );
}
