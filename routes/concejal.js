var express = require('express');
var app = express();
var Concejal = require('../models/concejal');
var verificaToken = require('../middlewares/authentication');

app.get('/', (req, res) => {

    var index = req.query.index || 0;
    var index2 = Number(index);

    Concejal.find({})
        .sort({ nombre: 1 })
        .skip(index2)
        .limit(5)
        .exec((err, concejales) => {

            if (err) {
                return res.status(500).json({
                    mensaje: 'Error al buscar concejales en la base de datos'
                });
            };

            Concejal.paginate({}, {}, function(err, result) {
                res.status(200).json({
                    concejales: concejales,
                    total: result.total
                })
            });
        });
});

app.post('/', verificaToken.verifyToken, (req, res) => {
    var body = req.body;
    var concejal = new Concejal({
        cedula: body.cedula,
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email
    });

    concejal.save((err, concejalguardado) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error al guardar concejal, comunicate con el servicio tecnico'
            });
        };

        res.status(201).json({
            concejal: concejalguardado
        });
    });
})

app.post('/email', verificaToken.verifyToken, (req, res) => {

    var email = req.body.email;
    var query = { email: email };

    Concejal.find(query, (err, concejal) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar concejal, comunicate con el servcio tecnico'
            });
        };

        res.status(201).json({
            ok: true,
            concejal: concejal
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Concejal.findById(id, (err, concejaldb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensanje: 'error al buscar concejal, comunicate con el servcio tecnico'
            });
        };

        if (!concejaldb) {
            return res.status(400).json({
                ok: false,
                mesage: 'error concejal no existe',
                error: { message: 'Concejal con el ' + id + 'no existe' }
            })
        };

        concejaldb.cedula = body.cedula;
        concejaldb.nombre = body.nombre;
        concejaldb.apellido = body.apellido;
        concejaldb.email = body.email;

        concejaldb.save((err, concejalguardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update user',
                    error: err
                });
            };

            concejaldb.password = ':)';
            res.status(201).json({
                ok: true,
                concejal: concejalguardado
            });
        });

    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;

    Concejal.findByIdAndRemove(id, (err, concejaleliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error al eliminar concejal',
                error: err
            })
        };

        if (!concejaleliminado) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error concejal no existe',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            concejal: concejaleliminado
        });
    });
});

module.exports = app;