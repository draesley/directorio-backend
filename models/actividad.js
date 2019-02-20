var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var actividadesSchema = Schema({
    fechainicio: { type: Date, required: [true, 'fecha inicial es requerido'] },
    fechafin: { type: Date, required: [true, 'fecha final es requerido'] },
    nombre: { type: String, required: [true, 'nombre es requerido'] },
    descripcion: { type: String, required: [true, 'descripcion es requerido'] },
    localidad: { type: Schema.Types.ObjectId, ref: "Localidad" },
    directorio: { type: Schema.Types.ObjectId, ref: "Directorio" },
    img: { type: String, required: false }
});
actividadesSchema.plugin(uniqueValidator, { mensaje: '{PATH}Correo es requerido' });
actividadesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Actividad', actividadesSchema);