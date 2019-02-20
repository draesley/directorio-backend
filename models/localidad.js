var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var localidadSchema = Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
    ciudad: { type: Schema.Types.ObjectId, ref: "Ciudad" },
    comuna: { type: Schema.Types.ObjectId, ref: "Comuna" },
    tipolocalidad: { type: Schema.Types.ObjectId, ref: "Tipolocalidad" }
});

localidadSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Localidad', localidadSchema);