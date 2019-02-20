var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var usuarioSchema = Schema({
    email: { type: String, unique: true, required: [true, 'Correo es requerido'] },
    password: { type: String, required: [true, 'password es requerido'] },
    img: { type: String, required: false }
});
usuarioSchema.plugin(uniqueValidator, { mensaje: '{PATH}Correo es requerido' });
usuarioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Usuario', usuarioSchema);