var express = require('express');
var bcrypt = require('bcrypt');
var app = express();
var Usuario = require('../models/usuario');
var Integrante = require('../models/integrante');
var verificaToken = require('../middlewares/authentication');

app.get('/', (req, res) => {

    Usuario.find({})
        .sort({ email: 1 })
        .exec((err, usuarios) => {

            if (err) {
                return res.status(500).json({
                    mensaje: 'Error al buscar usuarios en la base de datos'
                });
            };

            res.status(200).json({
                usuarios: usuarios,
            });
        });
});

app.post('/', verificaToken.verifyToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save((err, usuarioguardado) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error al guardar usuario, comunicate con el servicio tecnico'
            });
        };

        res.status(201).json({
            usuario: usuarioguardado
        });
    });
})

app.post('/email', verificaToken.verifyToken, (req, res) => {

    var email = req.body.email;
    var query = { email: email };

    Usuario.find(query, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar usuario, comunicate con el servcio tecnico'
            });
        };

        res.status(201).json({
            ok: true,
            usuario: usuario
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuariodb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensanje: 'error al buscar usuario, comunicate con el servcio tecnico'
            });
        };

        if (!usuariodb) {
            return res.status(400).json({
                ok: false,
                mesage: 'error usuario no existe',
                error: { message: 'Usuario con el ' + id + 'no existe' }
            })
        };

        usuariodb.email = body.email;
        usuariodb.password = bcrypt.hashSync(body.password, 10);

        usuariodb.save((err, usuarioguardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update user',
                    error: err
                });
            };

            usuariodb.password = ':)';
            res.status(201).json({
                ok: true,
                usuario: usuarioguardado
            });
        });

    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioeliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error al eliminar usuario',
                error: err
            })
        };

        if (!usuarioeliminado) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error usuario no existe',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            usuario: usuarioeliminado
        });
    });
});

module.exports = app;