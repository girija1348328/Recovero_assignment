const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
// const mongoose = require("mongoose")



const authentication = async function (req, res, next) {
    try {
      let token = req.headers["x-api-key"] || req.headers["x-Api-key"];
     
      if (!token) return res.status(401).send({ status: false, message: "Missing authentication token in request" });
         decoded = jwt.verify(token, "recovereo")
  
         if (decoded) {
            let user; 
            try {
                user = await userModel.findOne({_id: decoded.userId});
                
            } catch (e) {
                return res.status(500).json({
                    status: 'error occured',
                    message: 'internal server error',
                    data: {}
                });
            }
    
            if (!user) {
                return res.status(404).json({
                    status: 'bad request',
                    message: 'no such user',
                    data: {}
                });
            }
    
            req.user = user;
            console.log(user)
            next();
        } else {
            return res.status(400).json({
                status: 'bad request',
                message: 'invalid token',
                data: {}
            });
        }
        
  
    } catch (error) {
      if (error.message == 'invalid token') return res.status(400).send({ status: false, message: "invalid token" });
      if (error.message == "jwt expired") return res.status(400).send({ status: false, message: "please login one more time, token is expired" });
      if (error.message == "invalid signature") return res.status(401).send({ status: false, message: "invalid signature" });
  
      return res.status(500).send({ status: false, message: error.message });
    }
  };


function authorizeRoles (...roles) {
    return (req, res, next) => {
        if (roles.includes(req.user.role)){
            next();
        } else {
            return res.status(403).json({
                status: 'bad request',
                message: 'you are not authorized to access this resource',
                data: {}
            });
        }
    };
};

module.exports = {authentication,authorizeRoles}
