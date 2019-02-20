var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/directorio", { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log("se conecto a la base de datos");
});

var liderRoutes = require('./routes/lider');
var partidoRoutes = require('./routes/partido');
var loginRoutes = require('./routes/login');
var imgRoutes = require('./routes/img');
var uploadRoutes = require('./routes/upload');
var actividadRoutes = require('./routes/actividades');
var directorioRoutes = require('./routes/directorio');
var concejalRoutes = require('./routes/concejal');
var localidadRoutes = require('./routes/localidad');
var tipolocalidadRoutes = require('./routes/tipolocalidad');
var comunaRoutes = require('./routes/comuna');
var ciudadRoutes = require('./routes/ciudad');
var departamentoRoutes = require('./routes/departamento');
var integranteRoutes = require('./routes/integrante');
var roleRoutes = require('./routes/role');
var usuarioRoutes = require('./routes/usuario');
var appRoutes = require('./routes/app');

app.use('/lider', liderRoutes);
app.use('/partido', partidoRoutes);
app.use('/login', loginRoutes);
app.use('/img', imgRoutes);
app.use('/upload', uploadRoutes);
app.use('/actividad', actividadRoutes);
app.use('/directorio', directorioRoutes);
app.use('/concejal', concejalRoutes);
app.use('/localidad', localidadRoutes);
app.use('/tipolocalidad', tipolocalidadRoutes);
app.use('/comuna', comunaRoutes);
app.use('/ciudad', ciudadRoutes);
app.use('/departamento', departamentoRoutes);
app.use('/integrante', integranteRoutes);
app.use('/role', roleRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);

app.listen(3000, () => {
    console.log("server runing port 3000");
});