var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var liderSchema = Schema({
    cedula: { type: Number, unique: true, required: [true, 'Cedula es requerido'] },
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
    apellido: { type: String, required: [true, 'Apellido es requerido'] },
    direccion: { type: String, required: [true, 'Direccion es requerido'] },
    fijo: { type: Number, required: false },
    movil: { type: Number, required: [true, "Movil es requerido"] },
    email: { type: String, required: [true, 'Correo es requerido'] },
    img: { type: String, required: false },
});
liderSchema.plugin(uniqueValidator, { mensaje: '{PATH}Cedula es requerido' });
liderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Lider', liderSchema);