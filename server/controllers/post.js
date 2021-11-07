const Post = require('../models/post')

exports.getPosts = (req, res) => {
    const posts = Post.find().select("_id title message selectedFile creator tags").then((posts)=>{
        res.json({"result":true,posts})
    })
    .catch((err)=>{
        res.json({'error':err,"result":false})
    })
}

exports.createPost = (req, res) => {
    const body=req.body
    const newPost = new Post(body)
    newPost.save().then(()=>{
        res.json({"result":true,"message":'Post added successfully'})
    })
    .catch(err=>{
        res.json({"result":false,'error':err,"message":'Post Creation Failed'})
    })

}

exports.updatePost = (req,res)=>{

    const { id } = req.params;
    const { title, message, selectedFile, } = req.body;

    const updatedPostData = { title, message, selectedFile, _id: id };

    Post.findByIdAndUpdate(id,updatedPostData,{new:true}).then(()=>{
        res.json({"result":true,"message":'Post Updated Successfully'})
    }).catch((err)=>{
        res.json({ "error": err,"message":'Updation Failed',"result":false });
    })
}

exports.deletePost = (req,res)=>{
    const { id } = req.params;
    Post.findByIdAndRemove(id).then(()=>{
        res.json({"result":true,"message":'Post removed successfully'})
    }).catch((err)=>{
        res.json({ "error": err,"message":'Deletion Failed',"result":false });
    })
}

