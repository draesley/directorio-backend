var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tipolocalidadSchema = Schema({
    nombre: { type: String, required: [true, 'nombre es requerido'] }
});

module.exports = mongoose.model('Tipolocalidad', tipolocalidadSchema);