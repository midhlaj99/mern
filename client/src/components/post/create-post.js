import { TextField, Button, Typography, Grid } from "@mui/material"
import FileBase from 'react-file-base64';
import "../style.css"
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux'

export default function ManagePost({ handleSubmit, CheckError, postData, HandleChange, err, Clear, HandleFile,PostId }) {

    const loader = useSelector(state => state.post_value.create_loader ? state.post_value.create_loader : false)

    return (
        <div className='form_wrapper'>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h6" align='center' >
                    {
                        PostId ? "Update Post" : "Create Post"
                    }
                    
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            variant="outlined"
                            label="Title"
                            fullWidth
                            value={postData.title}
                            size='small'
                            onChange={HandleChange}
                        />
                        {CheckError(err.title)}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="message"
                            variant="outlined"
                            label="Message"
                            fullWidth
                            multiline
                            rows={4}
                            value={postData.message}
                            size='small'
                            onChange={HandleChange}
                        />
                        {CheckError(err.message)}
                    </Grid>
                    <Grid item xs={12}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => HandleFile(base64)}
                        />
                        {CheckError(err.selectedFile)}
                    </Grid>
                    {
                        loader ?
                            <Grid item xs={12} textAlign='center'>
                                <CircularProgress size={30} />
                            </Grid>
                            :
                            <>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" size="small" type="submit" fullWidth>Submit</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="secondary" size="small" onClick={Clear} fullWidth>Clear</Button>
                                </Grid>
                            </>
                    }

                </Grid>


            </form>
        </div>
    )
}
