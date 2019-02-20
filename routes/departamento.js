var express = require('express');
var Departamento = require('../models/departamento');
var verifyToken = require('../middlewares/authentication');

var app = express();

app.get('/', (req, res) => {

    Departamento.find({})
        .exec((err, departamentos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al buscar departamentos'
                });
            }

            res.status(200).json({
                ok: true,
                departamentos: departamentos
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var departamento = new Departamento({
        nombre: body.nombre
    });

    departamento.save((err, departamentoSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error departamento no guardado'
            });
        };

        res.status(201).json({
            ok: true,
            departamento: departamentoSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Departamento.findById(id, (err, departamento) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar departamento'
            })
        };

        if (!departamento) {
            return res.status(400).json({
                ok: false,
                mesage: 'error departamento no existe',
                error: { message: 'departamento con' + id + 'no existe' }
            })
        };

        departamento.nombre = body.nombre;

        departamento.save((err, departamentosave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update departamento',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                departamento: departamentosave
            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Departamento.findByIdAndRemove(id, (err, departamento) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove departamento',
                error: err
            })
        };

        if (!departamento) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error departamento whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            departamento: departamento
        });
    });
});

module.exports = app;