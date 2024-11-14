const mongoose = require("../db/connM");
const { Schema } = mongoose;


let UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profissao: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true
  },
  instituicao:{
    type: String,
    required:true
  },
  telefone:{
    type: String,
    required:true
  },
  local: {
    type: String,
    required: true,
  },
  tipousuario:{
    type: String,
    required: true,
  }
});
//compr: [{ type: Schema.Types.ObjectId, ref: "Compras" }],
//https://dev.to/oluseyeo/how-to-create-relationships-with-mongoose-and-node-js-11c8


UsuarioSchema.set('toObject', { virtuals: true });
UsuarioSchema.set('toJSON', { virtuals: true })
Usuarios= mongoose.model("Usuario", UsuarioSchema );



module.exports = {  Usuarios,   UsuarioSchema   }