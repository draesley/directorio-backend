var express = require('express');
var app = express();
var Actividad = require('../models/actividad');
var verificaToken = require('../middlewares/authentication');

app.get('/', (req, res) => {

    var index = req.query.index || 0;
    var index2 = Number(index);

    Actividad.find({})
        .sort({ nombre: 1 })
        .populate('directorio')
        .populate('localidad')
        .skip(index2)
        .limit(10)
        .exec((err, actividades) => {

            if (err) {
                return res.status(500).json({
                    mensaje: 'Error al buscar actividades en la base de datos'
                });
            };

            Actividad.paginate({}, {}, function(err, result) {
                res.status(200).json({
                    actividades: actividades,
                    total: result.total
                })
            });
        });
});

app.get('/:id', (req, res) => {

    var id = req.params.id;

    Actividad.findById(id, {})
        .populate('localidad')
        .populate('directorio')
        .exec((err, actividad) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error al buscar actividad, comunicate con el servcio tecnico'
                });
            };

            res.status(201).json({
                ok: true,
                actividad: actividad
            });
        })
});

app.get('/actividades/:id', (req, res) => {

    var id = req.params.id;
    var query = { directorio: id };
    Actividad.find(query, {})
        .sort({ nombre: 1 })
        .populate('localidad')
        .populate('directorio')
        .exec((err, actividades) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error al buscar actividades, comunicate con el servcio tecnico'
                });
            };

            res.status(200).json({
                ok: true,
                actividades: actividades
            });
        });
});

app.post('/', verificaToken.verifyToken, (req, res) => {
    var body = req.body;
    var actividad = new Actividad({
        fechainicio: body.fechainicio,
        fechafin: body.fechafin,
        nombre: body.nombre,
        descripcion: body.descripcion,
        localidad: body.localidad,
        directorio: body.directorio

    });

    actividad.save((err, actividadguardado) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error al guardar actividad, comunicate con el servicio tecnico'
            });
        };

        res.status(201).json({
            actividad: actividadguardado
        });
    });
})

app.post('/directorio', verificaToken.verifyToken, (req, res) => {

    var id = req.body.id;
    var query = { directorio: id };

    Actividad.find(query, (err, actividad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error al buscar actividad, comunicate con el servcio tecnico'
            });
        };

        res.status(201).json({
            ok: true,
            actividad: actividad
        });
    });
});

app.put('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Actividad.findById(id, (err, actividadb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensanje: 'error al buscar actividad, comunicate con el servcio tecnico'
            });
        };

        if (!actividadb) {
            return res.status(400).json({
                ok: false,
                mesage: 'error actividad no existe',
                error: { message: 'Actividad con el ' + id + 'no existe' }
            })
        };

        actividadb.fechainicio = body.fechainicio,
            actividadb.fechafin = body.fechafin,
            actividadb.nombre = body.nombre,
            actividadb.descripcion = body.descripcion,
            actividadb.localidad = body.localidad,
            actividadb.directorio = body.directorio

        actividadb.save((err, actividadguardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update user',
                    error: err
                });
            };

            res.status(201).json({
                ok: true,
                actividad: actividadguardado
            });
        });

    });
});

app.delete('/:id', verificaToken.verifyToken, (req, res) => {

    var id = req.params.id;

    Actividad.findByIdAndRemove(id, (err, actividadeliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error al eliminar actividad',
                error: err
            })
        };

        if (!actividadeliminado) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error actividad no existe',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            actividad: actividadeliminado
        });
    });
});

module.exports = app;