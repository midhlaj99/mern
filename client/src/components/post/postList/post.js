import React, { Fragment } from 'react'
import SinglePost from "./single-post"
import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from "@mui/material"

export default function Post({UpdatePost,DeletePost}) {

    const postAarray = useSelector(state => state.post_value.postAarray ? state.post_value.postAarray : [])
    const loader = useSelector(state => state.post_value.loader ? state.post_value.loader : false)

    return (
        <Fragment>
            <h1 style={{color:'white'}}>Posts</h1>
            {
                loader ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                        <CircularProgress />
                    </div>
                    :
                    <Grid container spacing={1} >
                        {
                            postAarray.length > 0 ?
                                postAarray.map((val, ky) => {
                                    return (
                                        <Grid key={ky} item xs={12} sm={6} md={4}>
                                            <SinglePost 
                                                post={val} 
                                                UpdatePost={(post)=>{UpdatePost(post)}}
                                                DeletePost={(id)=>{DeletePost(id)}}    
                                            />
                                        </Grid>

                                    )
                                })
                                :
                                <span style={{color:'white'}}>No posts addedd yet</span>
                        }
                    </Grid>
            }

        </Fragment>
    )
}
