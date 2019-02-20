var express = require('express');
var Partido = require('../models/partido');
var verificaToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Partido.find({})
        .sort({ nombre: 1 })
        .exec((err, partidos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db partidos'
                });
            }

            res.status(200).json({
                ok: true,
                partidos: partidos
            });
        })
});

app.post('/', verificaToken.verifyToken, (req, res) => {

    var body = req.body;
    var partido = new Partido({
        nombre: body.nombre,
        sigla: body.sigla
    });

    partido.save((err, partidoSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error partido not partido'
            });
        };

        res.status(201).json({
            ok: true,
            partido: partidoSave
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Partido.findById(id, (err, partido) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search partido'
            })
        };

        if (!partido) {
            return res.status(400).json({
                ok: false,
                mesage: 'error partido not existed',
                error: { message: 'partido with' + id + 'not existed' }
            })
        };

        partido.nombre = body.nombre;
        partido.sigla = body.sigla;

        partido.save((err, partidosave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update partido',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                partido: partidosave,
            });
        });
    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Partido.findByIdAndRemove(id, (err, partido) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove partido',
                error: err
            })
        };

        if (!partido) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error partido whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            partido: partido
        });
    });
});

module.exports = app;