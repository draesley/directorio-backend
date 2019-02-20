var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var partidoSchema = Schema({
    nombre: { type: String, unique: true, required: [true, 'nombre es requerido'] },
    sigla: { type: String, required: [true, 'sigla es requerida'] },
    img: { type: String, required: false }
});
partidoSchema.plugin(uniqueValidator, { mensaje: '{PATH}nombre es requerido' });

module.exports = mongoose.model('Partido', partidoSchema);