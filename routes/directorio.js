var express = require('express');
var app = express();
var Directorio = require('../models/directorio');
var verificaToken = require('../middlewares/authentication');

app.get('/', (req, res) => {

    var index = req.query.index || 0;
    var index2 = Number(index);

    Directorio.find({})
        .sort({ nombre: 1 })
        .populate('localidad')
        .populate('concejal')
        .populate('partido')
        .skip(index2)
        .limit(5)
        .exec((err, directorios) => {

            if (err) {
                return res.status(500).json({
                    mensaje: 'Error al buscar directorios en la base de datos'
                });
            };

            Directorio.paginate({}, {}, function(err, result) {
                res.status(200).json({
                    directorios: directorios,
                    total: result.total
                })
            });
        });
});

app.post('/', verificaToken.verifyToken, (req, res) => {
    var body = req.body;
    var directorio = new Directorio({
        nombre: body.nombre,
        direccion: body.direccion,
        partido: body.partido,
        fijo: body.fijo,
        movil: body.movil,
        email: body.email,
        localidad: body.localidad,
        concejal: body.concejal
    });

    directorio.save((err, directorioguardado) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error al guardar directorio, comunicate con el servicio tecnico'
            });
        };

        res.status(201).json({
            directorio: directorioguardado
        });
    });
})

app.post('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.body.id;
    var query = { id: id };

    Directorio.findById(query, (err, directorio) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar directorio, comunicate con el servcio tecnico'
            });
        };

        res.status(201).json({
            ok: true,
            directorio: directorio
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Directorio.findById(id, (err, directoriodb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensanje: 'error al buscar directorio, comunicate con el servcio tecnico'
            });
        };

        if (!directoriodb) {
            return res.status(400).json({
                ok: false,
                mesage: 'error directorio no existe',
                error: { message: 'Directorio con el ' + id + 'no existe' }
            })
        };

        directoriodb.nombre = body.nombre;
        directoriodb.direccion = body.direccion;
        directoriodb.fijo = body.fijo;
        directoriodb.movil = body.movil;
        directoriodb.email = body.email;
        directoriodb.localidad = body.localidad;
        directoriodb.partido = body.partido;
        directoriodb.concejal = body.concejal;

        directoriodb.save((err, directorioguardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update user',
                    error: err
                });
            };

            res.status(201).json({
                ok: true,
                directorio: directorioguardado
            });
        });

    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;

    Directorio.findByIdAndRemove(id, (err, directorioeliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error al eliminar directorio',
                error: err
            })
        };

        if (!directorioeliminado) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error directorio no existe',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            directorio: directorioeliminado
        });
    });
});

module.exports = app;