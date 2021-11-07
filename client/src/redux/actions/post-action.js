import axios from 'axios'
import * as api from "../../api.json"
import Swal from 'sweetalert2'

export const getPost = (token) => (dispatch) => {
    const head = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    }
    dispatch({ type: 'POST_ALL_REQUEST', payload: { loader: true } })
    axios.get(`${api.url}`, { headers: head })
        .then(res => {
            if (res.data.result) {
                dispatch({
                    type: 'POST_ALL_SUCCESS', payload: {
                        postAarray: res.data.posts,
                        loader: false
                    }
                })
            }
            else {
                dispatch({ type: 'POST_ALL_FAILED', payload: { loader: false } })
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Something went wrong!',
                })
            }
        })
        .catch(err => {
            dispatch({ type: 'POST_ALL_FAILED', payload: { loader: false } })
            if (err.response.status===401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please login again',
                    text: 'Token Expired',
                }).then(()=>{
                    localStorage.removeItem('authData')
                    window.location.reload()
                })
            }
        }
        )
}

export const CreatePost = (token,data, cb) => (dispatch) => {
    const head = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    }
    dispatch({ type: 'POST_ALL_REQUEST', payload: { create_loader: true } })
    axios.post(`${api.url}/createPost`, data, { headers: head })
        .then(res => {
            if (res.data.result) {
                dispatch({ type: 'POST_ALL_SUCCESS', payload: { create_loader: false } })
                cb()
            }
            else {
                dispatch({ type: 'POST_ALL_FAILED', payload: { create_loader: false } })
                Swal.fire({
                    icon: 'error',
                    text: res.data.message ? res.data.message : 'Something went wrong!',
                })
            }
        })
        .catch(err => {
            dispatch({ type: 'POST_ALL_FAILED', payload: { create_loader: false } })
            if (err.response.status===401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please login again',
                    text: 'Token Expired',
                }).then(()=>{
                    localStorage.removeItem('authData')
                    window.location.reload()
                })
            }
        }
        )
}

export const EditPost = (token,id, data, Cb) => (dispatch) => {
    const head = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    }
    dispatch({ type: 'POST_ALL_REQUEST', payload: { create_loader: true } })
    axios.post(`${api.url}/${id}`, data, { headers: head })
        .then(res => {
            if (res.data.result) {
                dispatch({ type: 'POST_ALL_SUCCESS', payload: { create_loader: false } })
                Cb()
            }
            else {
                dispatch({ type: 'POST_ALL_FAILED', payload: { create_loader: false } })
                Swal.fire({
                    icon: 'error',
                    text: res.data.message ? res.data.message : 'Something went wrong!',
                })
            }
        })
        .catch(err => {
            dispatch({ type: 'POST_ALL_FAILED', payload: { create_loader: false } })
            if (err.response.status===401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please login again',
                    text: 'Token Expired',
                }).then(()=>{
                    localStorage.removeItem('authData')
                    window.location.reload()
                })
            }
        }
        )
}

export const deletePost = (token,id, Cb) => (dispatch) => {
    const head = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    }
    dispatch({ type: 'POST_ALL_REQUEST', payload: { delete_loader: true } })
    axios.delete(`${api.url}/${id}`, { headers: head })
        .then(res => {
            if (res.data.result) {
                dispatch({ type: 'POST_ALL_SUCCESS', payload: { delete_loader: false } })
                Swal.fire({
                    icon: 'success',
                    text: res.data.message ? res.data.message : 'Deleted Successfully',
                })
                Cb()
            }
            else {
                dispatch({ type: 'POST_ALL_FAILED', payload: { delete_loader: false } })
                Swal.fire({
                    icon: 'error',
                    text: res.data.message ? res.data.message : 'Something went wrong!',
                })
            }
        })
        .catch(err => {
            dispatch({ type: 'POST_ALL_FAILED', payload: { delete_loader: false } })
            if (err.response.status===401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please login again',
                    text: 'Token Expired',
                }).then(()=>{
                    localStorage.removeItem('authData')
                    window.location.reload()
                })
                
            }
        }
        )
}