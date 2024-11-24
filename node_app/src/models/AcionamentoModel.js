const mongoose = require("../db/connM");
//const { Schema } = mongoose;
const Schema = mongoose.Schema;

const {CompraItensSchema, CompraItens}  = require('./CompraItensSchema');


const ComprasSchema = new Schema({
  id_fornecedora: {
    type: String,
    required: false,
  },
  id_fornecedor: {
    type: mongoose.Types.ObjectId,
    ref: "Fornecedor",
  },
  data: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  itens: {
    type: [CompraItensSchema],
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

ComprasSchema.pre('find', function(next) {
  console.log("busca");
  next();
});


ComprasSchema.pre('save', function(next) {
  console.log("salvou");
  next();
});

ComprasSchema.post('update', function(next) {
  console.log("Atualizou");
  next();
});


ComprasSchema.post('findOneAndUpdate', { document: true, query: true }, function() {
  this.set({ updatedAt: new Date() });
  console.log("findOneAndUpdate um");

});

ComprasSchema.post('updateOne', { document: true, query: true }, function() {
  this.set({ updatedAt: new Date() });
  console.log("Atualizou um");
  console.log(new Date());
  
  //console.log(this);
});

https://mongoosejs.com/docs/timestamps.html
module.exports = mongoose.model("Compras", ComprasSchema);
