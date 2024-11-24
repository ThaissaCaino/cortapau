const mongoose = require("../db/connM");
//const { Schema } = mongoose;
const Schema = mongoose.Schema;
//const {CompraItensSchema, CompraItens}  = require('./CompraItensSchema');

const { ChamadoPessoas,   ChamadoPessoasSchema }  = require('./ChamadoPessoasModel');

const ChamadoSchema = new Schema({
  local: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,

  },
  titulo: {
    type: String,
    required: false,
  },
  obs: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  data: {
    type: String,
    required: false,
  },



  obsatendimento: {
    type: String,
    required: false,
  },
  statusatendimento: {
    type: String,
    required: false,
  },
  dataatendimento: {
    type: String,
    required: false,
  },
  encaminhado: {
    type: String,
    required: false,
  },

   

  id_solicitante: {
    type: mongoose.Types.ObjectId,
    ref: "Usuario",
  },


});

ChamadoSchema.virtual('chamadopessoas', {
  ref: 'ChamadoPessoas', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'id_chamado', // is equal to foreignField
});


ChamadoSchema.set('toObject', { virtuals: true });

ChamadoSchema.set('toJSON', { virtuals: true })
https://mongoosejs.com/docs/timestamps.html
Chamados =  mongoose.model("Chamados",ChamadoSchema);

module.exports ={ Chamados,  ChamadoSchema } 
