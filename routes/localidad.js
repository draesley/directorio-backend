var express = require('express');
var Localidad = require('../models/localidad');
var verificaToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    var index = req.query.index || 0;
    var index2 = Number(index);

    Localidad.find({})
        .sort({ nombre: 1 })
        .populate('ciudad')
        .populate('comuna')
        .populate('tipolocalidad')
        .exec((err, localidades) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al buscar localidades'
                });
            };
            res.status(200).json({
                ok: true,
                localidades: localidades,
            });
        });
});

app.post('/', verificaToken.verifyToken, (req, res) => {

    var body = req.body;
    var localidad = new Localidad({
        nombre: body.nombre,
        ciudad: body.ciudad,
        comuna: body.comuna,
        tipolocalidad: body.tipolocalidad,
    });

    localidad.save((err, localidadGuardada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not localidad'
            });
        };

        res.status(201).json({
            ok: true,
            localidad: localidadGuardada
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Localidad.findById(id, (err, localidad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar localidad'
            })
        };

        if (!localidad) {
            return res.status(400).json({
                ok: false,
                mesage: 'error localidad no existe',
                error: { message: 'localidad with' + id + 'not existed' }
            })
        };

        localidad.nombre = body.nombre;
        localidad.ciudad = body.ciudad;
        localidad.comuna = body.comuna,
            localidad.tipolocalidad = body.tipolocalidad

        localidad.save((err, localidadeGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update localidad',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                localidad: localidadeGuardada,
                ciudad: localidad.ciudad,
                comuna: localidad.comuna,
                tipolocalidad: localidad.tipolocalidad
            });
        });
    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Localidad.findByIdAndRemove(id, (err, localidad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error al eliminar localidad',
                error: err
            })
        };

        if (!localidad) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error localidad con id no existe',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            localidad: localidad
        });
    });
});

module.exports = app;