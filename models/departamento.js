var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var departamentoSchema = Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
});

module.exports = mongoose.model('Departamento', departamentoSchema);