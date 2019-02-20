var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ciudadSchema = Schema({
    nombre: { type: String, required: [true, 'Nombre es required'] },
    departamento: { type: Schema.Types.ObjectId, ref: "Departamento" }
});

module.exports = mongoose.model('Ciudad', ciudadSchema);