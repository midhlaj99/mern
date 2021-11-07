import axios from 'axios'
import * as api from "../../api.json"


export function setAuthData(name, value) {
    return {
        type: 'AUTH_SET_DATA',
        payload: { [name]: value },
    }
}


export const Login = (data) => (dispatch) => {
    const head = {
        Accept: 'application/json',
    }
    dispatch({ type: 'AUTH_ALL_REQUEST', payload: { loader: true } })
    axios.post(`${api.auth_url}/signin`,data, { headers: head })
        .then(res => {
            if (res.data.result) {
                localStorage.setItem('authData',res.data.token)
                dispatch({
                    type: 'AUTH_ALL_SUCCESS', payload: {
                        user_login:true,
                        loader:false
                    }
                })
            }
            else {
                dispatch({ type: 'AUTH_ALL_FAILED', payload: { 
                    loader: false,
                    login_err:res.data.message
                } })
       
            }
        })
        .catch(err => {
            dispatch({ type: 'AUTH_ALL_FAILED', payload: { loader: false } })
        }
        )
}

export const SignUp = (data) => (dispatch) => {
    const head = {
        Accept: 'application/json',
    }
    dispatch({ type: 'AUTH_ALL_REQUEST', payload: { loader: true } })
    axios.post(`${api.auth_url}/signup`,data, { headers: head })
        .then(res => {
            if (res.data.result) {
                localStorage.setItem('authData',res.data.token)
                dispatch({
                    type: 'AUTH_ALL_SUCCESS', payload: {
                        user_signup:true,
                        loader:false
                    }
                })
            }
            else {
                dispatch({ type: 'AUTH_ALL_FAILED', payload: { 
                    loader: false,
                    signup_err:res.data.message
                } })
       
            }
        })
        .catch(err => {
            dispatch({ type: 'AUTH_ALL_FAILED', payload: { loader: false } })
        }
        )
}
