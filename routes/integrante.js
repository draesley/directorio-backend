var express = require('express');
var app = express();
var Integrante = require('../models/integrante');
var verificaToken = require('../middlewares/authentication');

app.get('/', (req, res) => {

    var index = req.query.index || 0;
    var index2 = Number(index);

    Integrante.find({})
        .sort({ nombre: 1 })
        .populate('usuario', 'email')
        .populate('role')
        .populate('localidad')
        .populate('directorio')
        .populate('lider')
        .skip(index2)
        .limit(20)
        .exec((err, integrantes) => {

            if (err) {
                return res.status(500).json({
                    mensaje: 'Error al buscar integrantes en la base de datos'
                });
            };

            Integrante.paginate({}, {}, function(err, result) {
                res.status(200).json({
                    integrantes: integrantes,
                    total: result.total
                })
            });
        });
});

app.get('/integrantes/:id', (req, res) => {

    var id = req.params.id;
    var query = { directorio: id };
    Integrante.find(query, {})
        .sort({ nombre: 1 })
        .exec((err, integrantes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error al buscar integrantes, comunicate con el servcio tecnico'
                });
            };

            res.status(200).json({
                ok: true,
                integrantes: integrantes
            });
        });
});

app.get('/lider/:id', (req, res) => {

    var id = req.params.id;
    var query = { lider: id };
    Integrante.find(query, {})
        .sort({ nombre: 1 })
        .exec((err, integrantes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error al buscar integrantes, comunicate con el servcio tecnico'
                });
            };

            res.status(200).json({
                ok: true,
                integrantes: integrantes
            });
        });
});

app.post('/', verificaToken.verifyToken, (req, res) => {
    var body = req.body;
    var integrante = new Integrante({
        cedula: body.cedula,
        nombre: body.nombre,
        apellido: body.apellido,
        direccion: body.direccion,
        fijo: body.fijo,
        movil: body.movil,
        email: body.email,
        extracto: body.extracto,
        empleado: body.empleado,
        fecha: body.fecha,
        role: body.role,
        usuario: body.usuario,
        localidad: body.localidad,
        directorio: body.directorio,
        lider: body.lider
    });

    integrante.save((err, integranteguardado) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error al guardar integrante, comunicate con el servicio tecnico'
            });
        };

        res.status(201).json({
            integrante: integranteguardado
        });
    });
})

app.post('/email', verificaToken.verifyToken, (req, res) => {

    var email = req.body.email;
    var query = { email: email };

    Integrante.find(query, (err, integrante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar integrante, comunicate con el servcio tecnico'
            });
        };

        res.status(201).json({
            ok: true,
            integrante: integrante
        });
    });
});

app.post('/:id', (req, res) => {

    var id = req.body.id;
    var query = { id: id };

    Integrante.find(query, (err, integrante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar integrante, comunicate con el servcio tecnico'
            });
        };

        res.status(201).json({
            ok: true,
            integrante: integrante
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Integrante.findById(id, (err, integrantedb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensanje: 'error al buscar integrante, comunicate con el servcio tecnico'
            });
        };

        if (!integrantedb) {
            return res.status(400).json({
                ok: false,
                mesage: 'error integrante no existe',
                error: { message: 'Integrante con el ' + id + 'no existe' }
            })
        };

        integrantedb.nombre = body.nombre;
        integrantedb.apellido = body.apellido;
        integrantedb.direccion = body.direccion;
        integrantedb.fijo = body.fijo;
        integrantedb.movil = body.movil;
        integrantedb.email = body.email;
        integrantedb.extracto = body.extracto;
        integrantedb.empleado = body.empleado;
        integrantedb.role = body.role;
        integrantedb.usuario = body.usuario;
        integrantedb.localidad = body.localidad;
        integrantedb.directorio = body.directorio;
        integrantedb.lider = body.lider;
        integrantedb.fecha = body.fecha;

        integrantedb.save((err, integranteguardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update user',
                    error: err
                });
            };

            res.status(201).json({
                ok: true,
                integrante: integranteguardado
            });
        });

    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;

    Integrante.findByIdAndRemove(id, (err, integranteeliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error al eliminar integrante',
                error: err
            })
        };

        if (!integranteeliminado) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error integrante no existe',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            integrante: integranteeliminado
        });
    });
});

module.exports = app;