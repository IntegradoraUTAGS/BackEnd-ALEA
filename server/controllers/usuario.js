
const user = require('../models/usuario');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

const usuarioController = {};

// /GET all users

usuarioController.getUsuarios = async (req, res) =>{
   const usuarios =  await usuario.find();
   res.json(usuarios);
} 
// /GET only one user and getUsu
usuarioController.getUsuario = async (req , res) =>{
    const getUsu = await usuario.findById(req.params.id);
    res.json(getUsu);
}
// /POST new user
usuarioController.createUsuario = async (req, res) => {
    const newUsuario = new usuario(req.body);
    await newUsuario.save();
    res.json({
        status: "Usuario guardado"
    });
}
// /PUT update user
usuarioController.editUsuario = async (req, res) =>{
    const {id} = req.params;
    const oneUsuario = {
        nombre: req.params.nombre,
        apellido_paterno: req.params.apellido_paterno,
        apellido_materno: req.params.apellido_materno,
        email: req.params.email,
        password: req.params.password, 
        confirmar_password: req.params.confirmar_password, 
        role: req.params.role,
        fecha: req.params.fecha
       
    };
    await usuario.findByIdAndUpdate(id, {$set: oneUsuario}, {new:true} );
    res.json({
        status: "Usuario Actualizado"
    })
}

// /DELETE user
usuarioController.deleteUsuario = async (req, res) =>{
    await usuario.findByIdAndRemove(req.params.id);
    res.json({
        status: "Usuario Eliminado"
    })
}
 
module.exports = usuarioController;