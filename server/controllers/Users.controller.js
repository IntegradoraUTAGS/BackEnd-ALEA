const user = require('../models/Users');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

const userController = {};

// /GET all users

userController.getUsers = async (req, res) =>{
   const users =  await user.find();
   res.json(users);
} 
// /GET only one user
userController.getUser = async (req , res) =>{
    const getUs = await user.findById(req.params.id);
    res.json(getUs);
}
// /POST new user
userController.createUser = async (req, res) => {
    const newUser = new user(req.body);
    await newUser.save();
    res.json({
        status: "User saved"
    });
}
// /PUT update user
userController.editUser = async (req, res) =>{
    const {id} = req.params;
    const oneUser = {
        nombre: req.params.nombre,
        apellido: req.params.apellido,
        email: req.params.email,
        password: req.params.password, 
        role: req.params.role
       
    };
    await user.findByIdAndUpdate(id, {$set: oneUser}, {new:true} );
    res.json({
        status: "User Updated"
    })
}

// /DELETE user
userController.deleteUser = async (req, res) =>{
    await user.findByIdAndRemove(req.params.id);
    res.json({
        status: "User Deleted"
    })
}
 
module.exports = userController;