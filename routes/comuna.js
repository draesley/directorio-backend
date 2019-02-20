var express = require('express');
var Comuna = require('../models/comuna');
var verificaToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Comuna.find({})
        .exec((err, comunas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db comunas'
                });
            }

            res.status(200).json({
                ok: true,
                comunas: comunas
            });
        })
});

app.post('/', verificaToken.verifyToken, (req, res) => {

    var body = req.body;
    var comuna = new Comuna({
        nombre: body.nombre,
    });

    comuna.save((err, comunaSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error comuna not comuna'
            });
        };

        res.status(201).json({
            ok: true,
            comuna: comunaSave
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Comuna.findById(id, (err, comuna) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search comuna'
            })
        };

        if (!comuna) {
            return res.status(400).json({
                ok: false,
                mesage: 'error comuna not existed',
                error: { message: 'comuna with' + id + 'not existed' }
            })
        };

        comuna.nombre = body.nombre;

        comuna.save((err, comunasave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update comuna',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                comuna: comunasave,
            });
        });
    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Comuna.findByIdAndRemove(id, (err, comuna) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove comuna',
                error: err
            })
        };

        if (!comuna) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error comuna whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            comuna: comuna
        });
    });
});

module.exports = app;