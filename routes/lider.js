var express = require('express');
var app = express();
var Lider = require('../models/lider');
var verificaToken = require('../middlewares/authentication');

app.get('/', (req, res) => {

    Lider.find({})
        .sort({ nombre: 1 })
        .exec((err, lideres) => {

            if (err) {
                return res.status(500).json({
                    mensaje: 'Error al buscar lideres en la base de datos'
                });
            };

            res.status(200).json({
                lideres: lideres,
            });
        });
});

app.get('/lideres/:id', (req, res) => {

    var id = req.params.id;
    var query = { directorio: id };
    Lider.find(query, {})
        .sort({ nombre: 1 })
        .exec((err, lideres) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error al buscar lideres, comunicate con el servcio tecnico'
                });
            };

            res.status(200).json({
                ok: true,
                lideres: lideres
            });
        });
});

app.post('/', verificaToken.verifyToken, (req, res) => {
    var body = req.body;
    var lider = new Lider({
        cedula: body.cedula,
        nombre: body.nombre,
        apellido: body.apellido,
        direccion: body.direccion,
        fijo: body.fijo,
        movil: body.movil,
        email: body.email,
    });

    lider.save((err, liderguardado) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error al guardar lider, comunicate con el servicio tecnico'
            });
        };

        res.status(201).json({
            lider: liderguardado
        });
    });
})

app.post('/email', verificaToken.verifyToken, (req, res) => {

    var email = req.body.email;
    var query = { email: email };

    Lider.find(query, (err, lider) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar lider, comunicate con el servcio tecnico'
            });
        };

        res.status(201).json({
            ok: true,
            lider: lider
        });
    });
});

app.post('/:id', (req, res) => {

    var id = req.body.id;
    var query = { id: id };

    Lider.find(query, (err, lider) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar lider, comunicate con el servcio tecnico'
            });
        };

        res.status(201).json({
            ok: true,
            lider: lider
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Lider.findById(id, (err, liderdb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensanje: 'error al buscar lider, comunicate con el servcio tecnico'
            });
        };

        if (!liderdb) {
            return res.status(400).json({
                ok: false,
                mesage: 'error lider no existe',
                error: { message: 'Lider con el ' + id + 'no existe' }
            })
        };

        liderdb.nombre = body.nombre;
        liderdb.apellido = body.apellido;
        liderdb.direccion = body.direccion;
        liderdb.fijo = body.fijo;
        liderdb.movil = body.movil;
        liderdb.email = body.email;

        liderdb.save((err, liderguardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update user',
                    error: err
                });
            };

            res.status(201).json({
                ok: true,
                lider: liderguardado
            });
        });

    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;

    Lider.findByIdAndRemove(id, (err, lidereliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error al eliminar lider',
                error: err
            })
        };

        if (!lidereliminado) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error lider no existe',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            lider: lidereliminado
        });
    });
});

module.exports = app;