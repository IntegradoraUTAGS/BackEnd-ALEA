const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');

const storegeMulterConfig = multer.diskStorage({
    destination: 'server/public/uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname)) //file.originalname
    }
});
const multerConfig = multer({
    storage: storegeMulterConfig,
    dest: 'server/public/uploads',
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        const fileType = /pdf|doc/;
        const mimetype = fileType.test(file.mimetype);
        const extensionName = fileType.test(path.extname(file.originalname).toLocaleLowerCase())
        if (mimetype && extensionName) {
            return cb(null, true);
        }
        cb('Cannot read this file type')
    }
}).single('file');

const { mongoose } = require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middleswares
app.use(morgan('dev'));
app.use(express.json())
app.use(cors({ origin: 'http://172.17.1.7:4200' }));
app.use(multerConfig);

//Routes
app.use('/users', require('./routes/users.routes'));
app.use('/alerts', require('./routes/alert.routes'));
app.use('/comments', require('./routes/comments.routes'));
app.use('/carreras', require('./routes/carrera.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, () => {
    console.log("Server On Port ", app.get('port'))
});