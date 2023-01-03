const express = require('express')
const route = express.Router()
const userControlller = require("../controller/userController")
const departmentController = require("../controller/membercontroller")
const membercontroller = require("../controller/membercontroller")

const authorizeRoles  = require('../middleware/auth')

//login & signup
route.post("/register",userControlller.userRegister)
route.post("/login",userControlller.userLogin)

//member
route.post("/createMember",authorizeRoles.authentication,authorizeRoles.authorizeRoles("Admin"),membercontroller.createMember)
route.delete("/deleteMember",authorizeRoles.authentication,authorizeRoles.authorizeRoles("Admin"),membercontroller.deleteMember)

route.get("/usersAdmin",authorizeRoles.authentication,authorizeRoles.authorizeRoles("Admin"),departmentController.getAdmin)


module.exports = route
