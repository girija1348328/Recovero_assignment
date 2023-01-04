const express = require('express')
const route = express.Router()
const userControlller = require("../controller/userController")
const departmentController = require("../controller/membercontroller")
const membercontroller = require("../controller/membercontroller")



//login & signup
route.post("/register",userControlller.userRegister)
route.post("/login",userControlller.userLogin)

//member
route.post("/createMember",membercontroller.createMember)
route.delete("/deleteMember/:id",membercontroller.deleteMember)

route.get("/usersAdmin",departmentController.getAdmin)


module.exports = route
