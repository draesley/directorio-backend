var express = require('express');
var Integrante = require('../models/integrante');
var Actividad = require('../models/actividad');

var app = express();

app.get('/integrante/:index', (req, res, nex) => {

    var search = req.params.index;
    var regex = new RegExp(search, 'i');

    Integrante.find({ nombre: regex }, (err, integrantes) => {

        res.status(200).json({
            ok: true,
            integrantes: integrantes
        })
    });
});

app.get('/actividad/:index', (req, res, nex) => {

    var search = req.params.index;
    var regex = new RegExp(search, 'i');

    Actividad.find({ nombre: regex }, (err, actividades) => {

        res.status(200).json({
            ok: true,
            actividades: actividades
        })
    });
});

/* app.get('/category?:index?:id', (req, res, nex) => {

    var search = req.params.index;
    var id = req.params.id;
    var subline = new RegExp(id);
    var regex = new RegExp(search, 'i');

    Product.find({ name: regex, subline: { $gte: subline } }, (err, products) => {
        res.status(200).json({
            ok: true,
            products: products
        })
    });


}); */

module.exports = app;