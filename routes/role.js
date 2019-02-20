var express = require('express');
var Role = require('../models/role');
var verificaToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Role.find({})
        .exec((err, roles) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al buscar roles'
                });
            }

            res.status(200).json({
                ok: true,
                roles: roles
            });
        })
});

app.post('/', verificaToken.verifyToken, (req, res) => {

    var body = req.body;
    var role = new Role({
        nombre: body.nombre
    });

    role.save((err, roleguardado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not save'
            });
        };

        res.status(201).json({
            ok: true,
            role: roleguardado
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Role.findById(id, (err, role) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search role'
            })
        };

        if (!role) {
            return res.status(400).json({
                ok: false,
                mesage: 'error role not existed',
                error: { message: 'role with' + id + 'not existed' }
            })
        };

        role.nombre = body.nombre;

        role.save((err, roleguardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update role',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                role: roleguardado
            });
        });
    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Role.findByIdAndRemove(id, (err, role) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove role',
                error: err
            })
        };

        if (!role) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error role whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            role: role
        });
    });
});

module.exports = app;