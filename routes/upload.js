var express = require('express');
var fileupload = require('express-fileupload');
var fs = require('fs');

var app = express();
var Actividad = require('../models/actividad');
var Directorio = require('../models/directorio');
var Integrante = require('../models/integrante');
var Concejal = require('../models/concejal');
var Partido = require('../models/partido');
var Lider = require('../models/lider');

app.use(fileupload());

app.put('/:type/:id', (req, res) => {

    var type = req.params.type;
    var id = req.params.id;

    var types = ['actividad', 'directorio', 'integrante', 'concejal', 'usuario', 'partido', 'lider'];

    if (types.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            mesage: 'Types no valid'
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mesage: 'Not files'
        });
    }

    var file = req.files.img;
    var fileArray = file.name.split('.');
    var ext = fileArray[fileArray.length - 1];

    var extvalid = ['jpg', 'jpeg', 'png', 'gif'];

    if (extvalid.indexOf(ext) < 0) {
        return res.status(400).json({
            ok: false,
            mesage: 'file extension not valid'
        });
    }

    // renombrar file
    var filename = `${id}.${ext}`;

    // mover el file
    var path = `./uploads/${type}/${filename}`;

    file.mv(path, err => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mesage: 'error File to move '
            });
        }

        uploadByType(type, id, filename, res);
    });
});

function uploadByType(type, id, filename, res) {

    if (type === 'usuario') {
        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'usuario not existed'
                });
            }

            var oldpath = '../uploads/usuario/' + usuario.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            usuario.img = filename;
            usuario.save((err, usuarioUpdate) => {

                usuarioUpdate.password = ':)';
                return res.status(200).json({
                    ok: 'ok',
                    usuario: usuarioUpdate
                });
            });
        });
    };

    if (type === 'actividad') {
        Actividad.findById(id, (err, actividad) => {

            if (!actividad) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'actividad no existe'
                });
            }

            var oldpath = '../uploads/actividad/' + actividad.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            actividad.img = filename;
            actividad.save((err, actividadUpdate) => {


                return res.status(200).json({
                    ok: 'ok',
                    actividad: actividadUpdate
                });
            });
        });
    };

    if (type === 'directorio') {
        Directorio.findById(id, (err, directorio) => {

            if (!directorio) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'directorio not existed'
                });
            };

            var oldpath = '../uploads/directorio/' + directorio.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            directorio.img = filename;
            directorio.save((err, directorioupdate) => {

                return res.status(200).json({
                    ok: 'ok',
                    directorio: directorioupdate
                });
            });
        });
    };

    if (type === 'concejal') {
        Concejal.findById(id, (err, concejal) => {

            if (!concejal) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'concejal not existed'
                });
            };

            var oldpath = '../uploads/concejal/' + concejal.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            concejal.img = filename;
            concejal.save((err, concejalupdate) => {

                return res.status(200).json({
                    ok: 'ok',
                    concejal: concejalupdate
                });
            });
        });
    };

    if (type === 'integrante') {
        Integrante.findById(id, (err, integrante) => {

            if (!integrante) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'integrante not existed'
                });
            };

            var oldpath = '../uploads/integrante/' + integrante.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            integrante.img = filename;
            integrante.save((err, integranteupdate) => {

                return res.status(200).json({
                    ok: 'ok',
                    integrante: integranteupdate
                });
            });
        });
    };

    if (type === 'partido') {
        Partido.findById(id, (err, partido) => {

            if (!partido) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'partido not existed'
                });
            };

            var oldpath = '../uploads/partido/' + partido.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            partido.img = filename;
            partido.save((err, partidoupdate) => {

                return res.status(200).json({
                    ok: 'ok',
                    partido: partidoupdate
                });
            });
        });
    };

    if (type === 'lider') {
        Lider.findById(id, (err, lider) => {

            if (!lider) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'lider not existed'
                });
            };

            var oldpath = '../uploads/lider/' + lider.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            lider.img = filename;
            lider.save((err, lider) => {

                return res.status(200).json({
                    ok: 'ok',
                    lider: lider
                });
            });
        });
    };
}

module.exports = app;