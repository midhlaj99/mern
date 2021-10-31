import React, { useEffect, useState } from 'react'

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Grid, Typography } from "@mui/material"

import ManagePost from './components/post/create-post';
import Post from './components/post/postList/post';
import { makeStyles } from '@mui/styles';

import { getPost, CreatePost, EditPost, deletePost } from "./redux/actions/postAction/post-action"
import { useDispatch,useSelector } from 'react-redux'

import Swal from 'sweetalert2'
import LoadingOverlay from 'react-loading-overlay';

const useStyles = makeStyles({
  appBar: {
    borderRadius: 10,
    margin: '30px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'black',
  }

})


function App() {

  const classes = useStyles();
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({ title: '', message: '', selectedFile: '' });
  const [err, setErr] = useState({});
  const [PostId, setPostId] = useState('');

  const loader = useSelector(state => state.post_value.delete_loader ? state.post_value.delete_loader : false)

  useEffect(() => {
    dispatch(getPost())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (PostId) {
      dispatch(EditPost(PostId, postData, Cb))
    }
    else {
      let err = {
        title: Validate(postData.title),
        message: Validate(postData.message),
        selectedFile: Validate(postData.selectedFile),
      }
      if (!err.title && !err.message && !err.selectedFile) {
        setErr({})
        dispatch(CreatePost(postData, Cb))
      }
      else {
        setErr(err)
      }
    }
  };

  const Cb = () => {
    setPostData({ title: '', message: '', selectedFile: '' });
    setErr({});
    setPostId('')
    dispatch(getPost())

  }
  const Clear = () => {
    setPostData({ title: '', message: '', selectedFile: '' });
    setPostId('')
    setErr({});
  };

  const HandleChange = (e) => {
    const { name, value } = e.target
    setPostData({ ...postData, [name]: value })
    setErr({ ...err, [name]: '' })

  }

  const Validate = (val) => {
    if (!val) {
      return "*Required"
    }
    return false
  }

  const CheckError = (val) => {
    return (
      <span style={{ color: 'red' }}>{val}</span>
    )
  }

  const HandleFile = (base64) => {
    setPostData({ ...postData, selectedFile: base64 })
  }

  const UpdatePost = (post) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPostId(post._id)
    setPostData({ title: post.title, message: post.message, selectedFile: post.selectedFile });
  }

  const DeletePost = (id) => {
    Swal.fire({
      icon: "warning",
      title: 'Do you want to delete the post?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(id, Cb))
      }
    })

  }

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position="static" color='inherit'>
        <Typography className={classes.heading} variant='h4' align='center' >
          Insta Post
        </Typography>
      </AppBar>

      <LoadingOverlay
        active={loader}
        spinner
        text='Deleting post,Please wait...'
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8}>
            <Post UpdatePost={UpdatePost} DeletePost={DeletePost} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ManagePost
              handleSubmit={handleSubmit}
              CheckError={CheckError}
              postData={postData}
              HandleChange={HandleChange}
              err={err}
              Clear={Clear}
              HandleFile={HandleFile}
              PostId={PostId}
            />
          </Grid>
        </Grid>
      </LoadingOverlay>
    </Container>
  );
}

export default App;
