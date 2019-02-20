var express = require('express');
var Ciudad = require('../models/ciudad');
var verificaToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Ciudad.find({})
        .populate('departamento')
        .exec((err, ciudades) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al buscar ciudades'
                });
            }

            res.status(200).json({
                ok: true,
                ciudades: ciudades,
                departamento: ciudades.departamento
            });
        })
});

app.post('/', verificaToken.verifyToken, (req, res) => {

    var body = req.body;
    var ciudad = new Ciudad({
        nombre: body.nombre,
        departamento: body.departamento
    });

    ciudad.save((err, ciudadSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not ciudad'
            });
        };

        res.status(201).json({
            ok: true,
            ciudad: ciudadSave
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Ciudad.findById(id, (err, ciudad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search ciudad'
            })
        };

        if (!ciudad) {
            return res.status(400).json({
                ok: false,
                mesage: 'error ciudad not existed',
                error: { message: 'ciudad with' + id + 'not existed' }
            })
        };

        ciudad.nombre = body.nombre;
        ciudad.departamento = body.departamento;

        ciudad.save((err, ciudadsave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update ciudad',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                ciudad: ciudadsave,
                departamento: ciudad.departamento
            });
        });
    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Ciudad.findByIdAndRemove(id, (err, ciudad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove ciudad',
                error: err
            })
        };

        if (!ciudad) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error ciudad whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            ciudad: ciudad
        });
    });
});

module.exports = app;