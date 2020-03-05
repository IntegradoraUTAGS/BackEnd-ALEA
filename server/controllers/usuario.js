
const user = require('../models/usuario');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const nodemailer = require("nodemailer");

const emailMessage = `
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    
  </head>
  <body>

    <h1>¡Gracias por formar parte de Alertas acádemicas!<h1>
    <p>El último paso es verificar tu cuenta dando click en el siguiente botón</p>
    <button class="btn" style=" border: solid 1px black; border-raidus:25px; background-color:blue;">Verificar cuenta</button>

  </body>
</html>

`

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
    // send email
    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com',
        port: 465,
        secure: true, // use SSL
         auth: {
             user: 'testarv63@gmail.com',
             pass: 'password'
         }
     });
 // setup e-mail data with unicode symbols
 var mailOptions = {
     from: 'Test <testarv63@gmail.com>', // sender address
     to: 'mizraimeliab168@gmail.com', // list of receivers
     subject: 'Hello ✔', // Subject line
     html: emailMessage // html body
 };
 
 
 // send mail with defined transport object
 transporter.sendMail(mailOptions, function(error, info){
     if(error){
         return console.log(error);
     }
     console.log('Message sent: ' + info.response);
 });
// finish send email
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