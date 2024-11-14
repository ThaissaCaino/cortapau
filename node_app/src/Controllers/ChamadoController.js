const { ObjectID } = require("bson");
const dbo = require("../db/conn");

const {Chamados}  = require('../models/ChamadoModel');
const {ChamadoPessoas, ChamadoPessoasSchema}  = require('../models/ChamadoPessoasModel');
const {Usuarios, UsuarioSchema} = require("../models/UsuarioModel");

const path = require("path");



exports.index = async (req, res, next) => {
  try {

    let query = {};
    const chamados = await Chamados.find(query).lean();

    res.status(200).render('chamado/index',{ title:"listar chamados", logado: req.session,chamados: chamados});
    //res.render("chamado/index.ejs");

  } catch (error) {
    next(error);
  }
};


exports.new = async (req, res, next) => {
  try {
    const chamado =  new Chamados();
    res.status(200).render('chamado/new',{ chamado: chamado, title:"Novo Chamado", logado: req.session});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.save = async (req, res, next) => {
  try {
    let chamad = {
      local: req.body.local,
      tipo: req.body.tipo,
      obs: req.body.obs,
    };

    
    
    resultado = {}
    try {
      const chamado =  new Chamados(chamad);
      console.log('kkkk')

      const ss = await chamado.save();
      resultado = ss;
    } catch (error) {
      next(error);
    }
    res.redirect("../chamado");

    //res.status(200).render('chamado/show',{chamado: resultado});
  } 
  catch (error) {
    console.log('teste');
    console.log(error);
    console.log('teste');
    next(error);
  }
};


exports.edit = async (req, res, next) => {
  try {
    let query = {_id:ObjectID(req.params.id)};
    const chamado = await Chamados.findOne(query).lean();
    console.log(chamado)

    res.status(200).render('chamado/edit',{chamado: chamado, logado: req.session});
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {

  try {
    const id_chamado = req.params.id;
    const chamado = await Chamados.findOne({ _id: id_chamado}); 
    console.log('a');
    console.log(chamado);
    if (chamado) {
      let chamadodata = {
        local: req.body.local,
        tipo: req.body.tipo,
        titulo: req.body.titulo,
        obs: req.body.obs,
        data: req.body.data,
      };
      console.log('b');
      
      const updated = await Chamados.updateOne(
        { _id: ObjectID(id_chamado) },
        { $set: chamadodata}
      );
      console.log('c');
      console.log(updated);
      console.log('c');
    }
    res.redirect("../../chamado");

    //res.status(200).json(updated);
  } catch (error) {
    next(error);
    console.log(error);
  } 

};



exports.show = async (req, res, next) => {
  try {

    let resultado = {};
    //let query = {_id:ObjectID(req.params.id)};
    let query = {_id: req.params.id};
    const chamado = await Chamados.findOne(query).lean()
     .populate({path : 'chamadopessoas', populate:{path: 'usuario',model: Usuarios} })


    ;

console.log(chamado)
   // id_chamado: chamado._id
    const vinculados = await ChamadoPessoas.find({ id_chamado: chamado._id})
    resultado.idchamado = chamado._id;
    //resultado.vinculados = vinculados;
    resultado.chamado = chamado;
    //console.log(chamado);
    //res.status(200).json(resultado);

    res.status(200).render('chamado/show',{ title:"Novo Chamado", chamado: chamado,  logado: req.session});
  } catch (error) {
    next(error);
  }
};



exports.delete = async (req, res, next) => {
  let resultado={};
  try {
        const ch = await Chamados.findOneAndDelete({ _id: req.params.id}).then(function(result){
        resultado =result;
        console.log("Data deleted"); // Success
    }).catch(function(error){
        resultado = error;
        console.log(error); // Failure
    });
     
    res.redirect("../../chamado");
    //res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

exports.vincular = async (req, res, next) => {
  try {
    resultado = {}
    let query = {_id:ObjectID(req.params.id)};
    const chamado = await Chamados.findOne(query);
    let user = {local: chamado.local};
    const usuarios = await Usuarios.find(user).lean();

    usuarios.forEach(async (usuario) => {
      const chPe =  new ChamadoPessoas();
      chPe.id_chamado = chamado._id;
      chPe.id_usuario = usuario._id;

      const ss = await chPe.save();

      console.log("element")
      console.log("element")
      console.log(usuario)
      console.log("element")
      console.log("element")


    });
    resultado.chamado = chamado;
    resultado.usuarios = usuarios;

    res.status(200).json(resultado);

    //res.status(200).render('chamado/show',{chamado: chamado});
  } catch (error) {
    next(error);
  }
};



