const userModel = require("../model/userModel")
const memberModel = require("../model/memberModel")
const jwt = require('jsonwebtoken')


const createMember = async function (req, res) {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'recovereo')
        const userId = await userModel.findById({ _id: decoded.userId })

        if (userId.role != "Admin") return res.status(403).send({ status: false, message: "you are not authorized" })
        const data = req.body
        const result = await memberModel.create(data)
        res.status(200).send({ status: true, message: "member added", data: result })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}


const deleteMember = async function (req, res) {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'recovereo')
        const userId = await userModel.findById({ _id: decoded.userId })

        if (userId.role != "Admin") return res.status(403).send({ status: false, message: "you are not authorized" })
        const userid = req.params.id

        let resp = await memberModel.findOneAndDelete({ id: userid })
        res.status(200).send({ status: true, message: "deleted successfully" })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error })

    }

}


const getAdmin = async function (req, res) {
    const token = req.headers['x-access-token']
    let users;
    try {
        const decoded = jwt.verify(token, 'recovereo')
        const userId = await userModel.findById({ _id: decoded.userId })

        if (userId.role != "Admin") return res.status(403).send({ status: false, message: "you are not authorized" })

        users = await memberModel.find();

        return res.status(200).json({ status: 'successful', message: 'users fetched successfully', data: users })
    } catch (e) {
        return res.status(500).json({ status: 'error occured', message: 'internal server error', data: {} });
    }


};

module.exports = { getAdmin, createMember, deleteMember }