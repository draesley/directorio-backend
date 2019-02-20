var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var roleSchema = Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
});

module.exports = mongoose.model('Role', roleSchema);