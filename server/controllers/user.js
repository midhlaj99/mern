const User = require('../models/user')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.authVerifyMiddelware = (req,res,next)=>{
    try{
        let token=req.headers.authorization.split(" ")[1]
        if(!token){
            return res.status(401).json({result:false,message:'Unauthorized request'})
        }
    
        jwt.verify(token,process.env.JWT_KEY, function(err, decoded) {
            if (err) {
                return res.status(401).json({result:false,message:'Unauthorized request'})
            }
            req.userId=decoded.id
        });
    }
    catch{
        return res.status(401).json({result:false,message:'Unauthorized request'})
    }
    next()
}


exports.userSignIn = (req, res) => {
    let { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.json({
                error: err,
                message: "User doesn't exist",
                result:false
            })
        }

        let checkPassword = bcrypt.compare(password, user.password, ((err, result) => {
            if (err) {
                res.json({
                    error: err,
                    message: "Invalid credentials",
                    result:false
                })
            }
            let token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, { expiresIn: '1m' })
            res.json({ token, result: true, user: user })
        }))
    })
}

exports.userSignUp = async (req, res) => {
    let { email, password, name } = req.body

    let existing = await User.findOne({ email })

    if (existing) {
        return res.json({
            message: "User already exist", result: false
        })
    }

    let hashedPassword=await bcrypt.hash(password, 12);

    let result =await User.create({ email: email, password: hashedPassword, name: name })
    let token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_KEY, { expiresIn: '1h' })
    
    res.json({ token, result: true, user: result })

}



 