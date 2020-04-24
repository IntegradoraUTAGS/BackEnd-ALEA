const express = require('express');
const fileUpload = require('express-fileupload');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const app = express();

const Alert = require('../models/Alerts');


app.use(fileUpload());

app.put('/upload/:ruta/:id', (req, res) =>{
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name); //Path va a traer la extension del archivo.name

    if (!req.files) {
        return res.status(400).json({
            ok: false, 
            err:{
                message: 'No se a seleccionado ningun archivo'
            }
        })
    }

    // let validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
    // if (!validExtensions.includes(archivo.mimetype)) { //Funcion que checa que la extencion este en el array, mimetype va a lanzar el tipo de la extension del archivo
    //     return res.status(400).json({
    //         ok: false, 
    //         err: {
    //             message: 'Solo las extensiones <png, jpg, gif, jpeg> son validas'
    //         }
    //     });    
    // }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) =>{ //Es todo el path de la imagen
        if (err) {
            return res.status(500).json({
                ok: false, 
                err
            });
        }
    });
 
    switch(ruta){ //Es como un if, evaluara la variable, acttualizamos una collecion 
        case 'alert':
            archivoAlert(id, res, nombre)
        break;
        default: 
        return res.status(400).json({
            ok: false, 
            err: {
                message: 'Ruta no valida'
            }
        });
        break;
    }   

});

function archivoAlert(id, res, nombreArchivo){ //Actualizar el modelo usuario El hilo del usuario 
    Alert.findById(id, (err, ale)=>{
        if (err) {
            borrarArchivo(nombreArchivo, 'alert');
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!ale) {
            borrarArchivo(nombreArchivo, 'alert');
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Alerta no existe'
                }
            }); 
        }
        ale.img = nombreArchivo;

        ale.save((err, alerts)=>{
            if (err) {
                borrarArchivo(nombreArchivo, 'alert');
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true, 
                alerts
            });
        });

    });
}



function borrarArchivo(nombreArchivo, ruta){
    let pathArch = path.resolve(__dirname, `../../uploads/${ruta}/${nombreArchivo}`); //Resolvera la ruta donde se encuentra la imagen 
    if(fs.existsSync(pathArch)){
        fs.unlinkSync(pathArch);

    }
    console.log('Archivo borrado con exito');
}

module.exports = app;