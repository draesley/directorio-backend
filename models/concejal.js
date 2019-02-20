var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var concejalSchema = Schema({
    cedula: { type: String, unique: true, required: [true, 'Cedula es requerido'] },
    nombre: { type: String, unique: true, required: [true, 'Nombre es requerido'] },
    apellido: { type: String, unique: true, required: [true, 'Apellido es requerido'] },
    email: { type: String, unique: true, required: [true, 'Correo es requerido'] },
    img: { type: String, required: false }
});
concejalSchema.plugin(uniqueValidator, { mensaje: '{PATH}Correo es requerido' });
concejalSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Concejal', concejalSchema);