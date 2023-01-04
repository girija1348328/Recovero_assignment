const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

const userRegister = async function(req,res){
   try{
    let data = req.body

    const result = await userModel.create(data)
    res.status(200).send({status:true,message:"register successfully"})
   }
   catch(error){
    res.status(500).send({status:false,message:error})
   }
}


const userLogin = async function(req,res){
    try {
        let userName = req.body.email;
        let password = req.body.password;

        let user = await userModel.findOne({ email: userName, password: password });
        if (!user) return res.status(400).send({ status: false, msg: "username or the password is not correct", });

        //after successfully creation of login jwt token will be created

        let token = jwt.sign(
            {
                userId: user._id.toString(),
                batch: "Radon",
                organisation: "FunctionUp",
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
            },
            "recovereo"
        );
        res.setHeader("x-access-token", token);
        res.status(200).send({ status: true, message: "Login successful", user: token, data: user });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }

}


module.exports = {userRegister,userLogin}