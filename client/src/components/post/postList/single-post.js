import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function SinglePost({ post,UpdatePost,DeletePost }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={post.selectedFile}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions>
                <div style={{width:'100%',display:'flex',justifyContent:'end'}}>
                    <DeleteIcon 
                        color='info' 
                        style={{cursor:'pointer',marginRight:'15px'}}
                        onClick={()=>{DeletePost(post._id)}}
                    />
                    <EditIcon 
                        color='info' 
                        style={{cursor:'pointer'}}
                        onClick={()=>{UpdatePost(post)}}
                    />
                </div>
                
            </CardActions>
        </Card>
    )
}
