var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Integrante = require('../models/integrante');
var Usuario = require('../models/usuario');
var SEED = require('../config/config').SEED;

var app = express();

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: req.body.email })
        .exec((err, usuariodb) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error to find Usuario'
                });
            };

            if (!usuariodb) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Credential incorred'
                });
            };

            if (!bcrypt.compareSync(body.password, usuariodb.password)) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Credential incorred'
                });
            };

            //buscar contact
            Integrante.findOne({ usuario: usuariodb._id })
                .populate('directorio')
                .populate('role')
                .exec((err, integrantedb) => {
                    var token = jwt.sign({ usuario: usuariodb }, SEED, { expiresIn: 14400 });

                    res.status(200).json({
                        ok: true,
                        integrante: integrantedb,
                        token: token,
                        //menu: getMenu(usuariodb.role.nombre),
                    });
                });
        });
});

/* function getMenu(role) {
    var menu = [{
            title: 'Main',
            icon: 'mdi mdi-gauge',
            submenu: []
        },
        {
            title: 'administrator',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [

            ]
        }
    ]

    if (role === 'administrator') {
        menu[1].submenu.unshift({
            title: 'Attribute',
            url: '/pages/attribute'
        }, {
            title: 'Attribute Product',
            url: '/pages/attributeproduct'
        }, {
            title: 'Category',
            url: '/pages/category'
        }, {
            title: 'City',
            url: '/pages/city'
        }, {
            title: 'Contact',
            url: '/pages/contact'
        }, {
            title: 'Commune',
            url: '/pages/commune'
        }, {
            title: 'Directorio',
            url: '/pages/company'
        }, {
            title: 'Department',
            url: '/pages/department'
        }, {
            title: 'Line',
            url: '/pages/line'
        }, {
            title: 'Location',
            url: '/pages/location'
        }, {
            title: 'Product',
            url: '/pages/product'
        }, {
            title: 'product-company',
            url: '/pages/attribute-product-company'
        }, {
            title: 'Role',
            url: '/pages/role'
        }, {
            title: 'Service',
            url: '/pages/service'
        }, {
            title: 'Service-Directorio',
            url: '/pages/services-company'
        }, {
            title: 'SubLine',
            url: '/pages/subline'
        }, {
            title: 'Type-Location',
            url: '/pages/type-location'
        }, {
            title: 'Usuario',
            url: '/pages/usuario'
        })
    } else {
        menu[0].submenu.unshift({
            title: 'product-company',
            url: '/pages/attribute-product-company'
        })
    }

    return menu;
} */
module.exports = app;