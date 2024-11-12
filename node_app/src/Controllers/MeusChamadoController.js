const { ObjectID } = require("bson");
const dbo = require("../db/conn");

const {Chamados}  = require('../models/ChamadoModel');
const {ChamadoPessoas, ChamadoPessoasSchema}  = require('../models/ChamadoPessoasModel');
const {Usuarios, UsuarioSchema} = require("../models/UsuarioModel");

const path = require("path");


exports.index = async (req, res, next) => {
  try {

    let resultado = {};
    let query = {id_usuario: ObjectID(req.session.usuario_id)};

    //let query = {_id:ObjectID(req.params.id)};
    //let query = {_id: req.params.id};
    const chamado = await ChamadoPessoas.find(query).lean()
    .populate({path : 'chamado',model: Chamados }) ;
    //.populate({path : 'chamado', populate:{path: 'usuario',model: Usuarios} }) ;

    console.log(chamado)
    console.log(chamado[0].chamado)

    res.status(200).render('meuschamados/index',{chamados: chamado,  logado: req.session});
  } catch (error) {
    next(error);
  }
};


exports.show = async (req, res, next) => {
  try {

    let resultado = {};
    let query = {id_usuario:ObjectID(req.session.usuario_id)};

    //let query = {_id:ObjectID(req.params.id)};
    //let query = {_id: req.params.id};
    const chamado = await Chamados.findOne(query).lean()
     .populate({path : 'chamadopessoas', populate:{path: 'usuario',model: Usuarios} }) ;

    console.log(chamado)
   // id_chamado: chamado._id
    const vinculados = await ChamadoPessoas.find({ id_chamado: chamado._id})
    resultado.idchamado = chamado._id;
    //resultado.vinculados = vinculados;
    resultado.chamado = chamado;
    //console.log(chamado);
    //res.status(200).json(resultado);

    res.status(200).render('chamado/show',{chamado: chamado,  logado: req.session});
  } catch (error) {
    next(error);
  }
};