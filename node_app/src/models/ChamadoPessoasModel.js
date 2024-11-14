const mongoose = require("../db/connM");
//const { Schema } = mongoose;
const Schema = mongoose.Schema;

const {ChamadoSchema,Chamados}  = require('./ChamadoModel');
const {UsuarioSchema,Usuarios}  = require('./UsuarioModel');

const ChamadoPessoasSchema = new Schema({
  id_chamado: {
    type: mongoose.Types.ObjectId,
    ref: "Chamados",
  },
  id_usuario: {
    type: mongoose.Types.ObjectId,
    ref: "Usuarios",
  }

});

ChamadoPessoasSchema.virtual('usuario', {
  ref: 'Usuarios', //The Model to use
  localField: 'id_usuario', //Find in Model, where localField 
  foreignField: '_id', // is equal to foreignField
});


ChamadoPessoasSchema.virtual('chamado', {
  ref: 'Chamados', //The Model to use
  localField: 'id_chamado', //Find in Model, where localField 
  foreignField: '_id', // is equal to foreignField
});


ChamadoPessoas = mongoose.model("ChamadoPessoas", ChamadoPessoasSchema,'chamadopessoas'),

module.exports = {  ChamadoPessoas,   ChamadoPessoasSchema   }
