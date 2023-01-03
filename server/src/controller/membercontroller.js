const userModel = require("../model/userModel")
const memberModel = require("../model/memberModel")


const createMember = async function(req,res){

    try{
        const data = req.body

        const result = await memberModel.create(data)
        res.status(200).send({status:true,message:"member added",data:result})
    }
    catch(error){
        res.status(500).send({status:false,message:error})
    }
}

const deleteMember = async function(req,res){
    try{
    const userId = req.params.userId


     await memberModel.findByIdAndDelete({id:userId})

    res.status(200).send({status:true,message:"deleted successfully"})
    }
    catch(error){
        res.status(500).send({status:false,message:error})

    }

}





const getAdmin =async function(req, res)  {
    let users;
    try {
        users = await userModel.find({});
    } catch (e) {
        return res.status(500).json({status: 'error occured',message: 'internal server error',data: {}});
    }

    return res.status(200).json({status: 'successful',message: 'users fetched successfully',data:{users: users}})
};

module.exports = {getAdmin,createMember,deleteMember}