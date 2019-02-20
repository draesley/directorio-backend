var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var comunaSchema = Schema({
    nombre: { type: String, required: [true, 'Nombre  es requerido'] },
});

module.exports = mongoose.model('Comuna', comunaSchema);