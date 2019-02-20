var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var integranteSchema = Schema({
    cedula: { type: Number, unique: true, required: [true, 'Cedula es requerido'] },
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
    apellido: { type: String, required: [true, 'Apellido es requerido'] },
    direccion: { type: String, required: [true, 'Direccion es requerido'] },
    fijo: { type: Number, required: false },
    movil: { type: Number, required: [true, "Movil es requerido"] },
    email: { type: String, required: [true, 'Correo es requerido'] },
    fecha: { type: Date, required: [true, 'Fecha es requerida'] },
    extracto: { type: Number, required: [true, "Extracto es requerido"] },
    img: { type: String, required: false },
    empleado: { type: String, required: [true, "Estado requerido"] },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    localidad: { type: Schema.Types.ObjectId, ref: 'Localidad' },
    directorio: { type: Schema.Types.ObjectId, ref: 'Directorio' },
    lider: { type: Schema.Types.ObjectId, ref: 'Lider' },
});
integranteSchema.plugin(uniqueValidator, { mensaje: '{PATH}Cedula es requerido' });
integranteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Integrante', integranteSchema);