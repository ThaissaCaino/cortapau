const dbo = require("../db/conn");
const { ObjectID } = require("bson");
const bcrypt = require("bcrypt");

const {Usuarios} = require("../models/UsuarioModel");

exports.index = async (req, res, next) => {
  try {
    let user = {};
    const usuarios = await Usuarios.find(user).lean();

    res.status(200).render('usuarios/index',{usuarios: usuarios,  logado: req.session});
    //res.render("login/index.ejs");

  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.new = async (req, res, next) => {
  try {
    res.status(200).render('usuarios/new',{ logado: req.session});
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.create = async (req, res, next) => {

  try {
    console.log("antes de criar");
    const hash = await bcrypt.hash(req.body.password, 8);

    let usuar = {
      nome: req.body.nome,
      password: hash,
      email: req.body.email,
      instituicao: req.body.instituicao,
      telefone: req.body.telefone,
      profissao: req.body.profissao,
      local: req.body.local ,
      tipousuario: req.body.tipousuario
    };
    
    resultado = {}
    try {
      const usuario =  new Usuarios(usuar);
      const ss = await usuario.save();
      resultado = ss;
      console.log("criado com sucesso");
    } catch (error) {
      next(error);
    }
    res.redirect("../usuarios");

    //res.status(200).render('usuarios',{usuario: resultado});
  } 
  catch (error) {
    console.log(error);
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    let query = {_id:ObjectID(req.params.id)};
    const usuario = await Usuarios.findOne(query).lean();

    res.status(200).render('usuarios/edit',{usuario: usuario,  logado: req.session});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.update = async (req, res, next) => {

  try {
    const id_usuario = req.params.id;
    const usuario = await Usuarios.findOne({ _id: id_usuario}); 
    const hash = await bcrypt.hash("123", 8);
     //       password: hash,

    if (usuario) {
      let usuar = {
        nome: req.body.nome,
        email: req.body.email,
        password: hash,
        instituicao: req.body.instituicao,
        telefone: req.body.telefone,
        profissao: req.body.profissao,
        local: req.body.local,
        tipousuario: req.body.tipousuario
      };
      
      const updated = await Usuarios.updateOne(
        { _id: ObjectID(id_usuario) },
        { $set: usuar}
      );

    }
    res.redirect("../../usuarios");

    //res.status(200).json(updated);
  } catch (error) {
    next(error);
    console.log(error);
  } 

};

exports.deletar = async (req, res, next) => {
  let resultado={};
  try {
      const ch = await Usuarios.findOneAndDelete({ _id: req.params.id}).then(function(result){
      resultado =result;
      console.log("Data deleted"); // Success
  }).catch(function(error){
      resultado = error;
      console.log(error); // Failure
  });
     
  res.redirect("../../usuarios");
  //res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.params.id);
    console.log(req.params.id);
    console.log(req.params.id);
    console.log(req.params.id);
    console.log(req.params.id);
    
    let query = {_id:ObjectID(req.params.id)};
    const usuario = await Usuarios.findOne(query);
    res.status(200).render('usuarios/show',{usuario: usuario,  logado: req.session});

    //res.status(200).json(usuario);
  } 
  catch (error) {
    next(error);
  }
};
