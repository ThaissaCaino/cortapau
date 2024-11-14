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

    res.status(200).render('atenderchamado/index',{ title:"listar chamados", logado: req.session,chamados: chamados});
    //res.render("chamado/index.ejs");

  } catch (error) {
    next(error);
  }
};


exports.resolver = async (req, res, next) => {
  try {
    let query = {_id:ObjectID(req.params.id)};
    const chamado = await Chamados.findOne(query).lean();
    console.log(chamado)

    res.status(200).render('atenderchamado/edit',{ title:"listar chamados",chamado: chamado, logado: req.session});
  } catch (error) {
    next(error);
  }
};

exports.resolverrupdate = async (req, res, next) => {

  try {
    const id_chamado = req.params.id;
    const chamado = await Chamados.findOne({ _id: id_chamado}); 
    console.log('a');
    console.log(chamado);



    if (chamado) {
      let chamadodata = {
        obsatendimento: req.body.obsatendimento,
        statusatendimento: req.body.statusatendimento,
        dataatendimento: req.body.dataatendimento,
        encaminhado: req.body.encaminhado,
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
    res.redirect("../../atender");

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

    res.status(200).render('chamado/show',{chamado: chamado,  logado: req.session});
  } catch (error) {
    next(error);
  }
};

