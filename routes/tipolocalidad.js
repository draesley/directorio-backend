var express = require('express');
var Tipolocalidad = require('../models/tipolocalidad');
var verificaToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Tipolocalidad.find({})
        .exec((err, tipolocalidad) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al buscar tipolocalidads'
                });
            }

            res.status(200).json({
                ok: true,
                tipolocalidad: tipolocalidad
            });
        })
});

app.post('/', verificaToken.verifyToken, (req, res) => {

    var body = req.body;
    var tipolocalidad = new Tipolocalidad({
        nombre: body.nombre
    });

    tipolocalidad.save((err, tipolocalidadSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error tipolocalidad no guardado'
            });
        };

        res.status(201).json({
            ok: true,
            tipolocalidad: tipolocalidadSave
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Tipolocalidad.findById(id, (err, tipolocalidad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar tipolocalidad'
            })
        };

        if (!tipolocalidad) {
            return res.status(400).json({
                ok: false,
                mesage: 'error tipolocalidad no existe',
                error: { message: 'tipolocalidad con' + id + 'no existe' }
            })
        };

        tipolocalidad.nombre = body.nombre;

        tipolocalidad.save((err, tipolocalidadsave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error al actualizar tipolocalidad',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                tipolocalidad: tipolocalidadsave
            });
        });
    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Tipolocalidad.findByIdAndRemove(id, (err, tipolocalidad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error al eliminar tipolocalidad',
                error: err
            })
        };

        if (!tipolocalidad) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error tipolocalidad no existe',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            tipolocalidad: tipolocalidad
        });
    });
});

module.exports = app;