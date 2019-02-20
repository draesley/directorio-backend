var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var directorioSchema = Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
    direccion: { type: String, required: [true, 'direccion es requerido'] },
    fijo: { type: Number, required: false },
    movil: { type: Number, required: false },
    email: { type: String, required: false },
    localidad: { type: Schema.Types.ObjectId, ref: "Localidad" },
    concejal: { type: Schema.Types.ObjectId, ref: "Concejal" },
    partido: { type: Schema.Types.ObjectId, ref: "Partido" },
    img: { type: String, required: false }
});
directorioSchema.plugin(uniqueValidator, { mensaje: '{PATH}Correo es requerido' });
directorioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Directorio', directorioSchema);