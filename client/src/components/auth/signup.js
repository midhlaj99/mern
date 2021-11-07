import React, { useState, useEffect } from "react";
import "../style.css";
import { TextField, Button } from "@mui/material"
import { SignUp, setAuthData } from "../../redux/actions/auth-action"
import { useDispatch, useSelector } from "react-redux"
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory,Link } from "react-router-dom";

export default function SignupComponent() {

    const history = useHistory()
    const dispatch = useDispatch()

    const [inputValues, setInput] = useState({ email: '', password: '', name: '' })
    const [err, setErr] = useState({ email: '', password: '', name: '' })
    const token = localStorage.getItem("authData");

    const signup_err = useSelector(state => state.auth_value.signup_err ? state.auth_value.signup_err : '')
    const loader = useSelector(state => state.auth_value.loader ? state.auth_value.loader : false)
    const user_signup = useSelector(state => state.auth_value.user_signup ? state.auth_value.user_signup : false)

    useEffect(() => {
        dispatch(setAuthData('signup_err', ''))
        if (token) {
            history.push('/posts')
        }
        return()=>{
            dispatch(setAuthData('signup_err', ''))
        }
    }, [user_signup])

    const handleChange = (e) => {
        const { value, name } = e.target
        setInput({ ...inputValues, [name]: value })
        setErr({ ...err, [name]: '' })
    };

    const SignUpFn = (e) => {
        e.preventDefault()
        if (!inputValues.name) {
            setErr({ ...err, name: 'error' })
        }
        else if (!inputValues.email) {
            setErr({ ...err, email: 'error' })
        }
        else if (!inputValues.password) {
            setErr({ ...err, password: 'error' })
        }
        else {
            setErr({ email: '', password: '', name: '' })
            dispatch(SignUp(inputValues))
        }
    }
    return (
        <div className="App">
            <form className="form" onSubmit={SignUpFn}>
                <div style={{ width: '100%', textAlign: 'center', fontWeight: '500' }}>SignUp</div>
                <TextField
                    error={err.name}
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    type="text"
                    value={inputValues.name}
                    style={{ marginTop: '10px' }}
                />
                <TextField
                    error={err.email}
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    value={inputValues.email}
                    style={{ marginTop: '10px' }}
                />
                <TextField
                    error={err.password}
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={inputValues.password}
                    style={{ marginTop: '10px' }}

                />
                {
                    signup_err ?
                        <div style={{ color: 'red' }}>
                            {signup_err}
                        </div>
                        : null
                }

                {
                    loader ?
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <CircularProgress size={30} />
                        </div>
                        :
                        <>
                        <Button type="submit" color="primary" variant='contained' style={{ marginTop: '10px' }}>
                            SignUp
                        </Button>
                        <span>Already have an acount? <Link to='/'>Login</Link></span>
                        </>

                }


            </form>
        </div>
    );
}
