const bcrypt = require("bcrypt");
const {Usuarios} = require("../models/UsuarioModel");

const { ObjectID } = require("bson");

const axios = require("axios");
const path = require("path");
const dbo = require("../db/conn");
const { index } = require("./UsuarioController");
const { title } = require("process");

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});


exports.auth = async (req, res, next) => {
  try {

    reqSenha = "a";
    reqEmail = "a";
    const check = await Usuarios.findOne({email: reqEmail});

    if(check){
      if(check.password){
        const isPasswordMatch = await bcrypt.compare(reqSenha, check.password);
        if(isPasswordMatch){
          req.session.logado = true;
          req.session.usuario_id = check._id;
          req.session.usuario_tipo = check.tipousuario;
          req.session.usuario_nome = check.nome;    
        }
      }
    }

    if(req.session.logado){
      res.logado = req.session;
      console.log(req.session);
      next();
    }
    else{
      //next();
      res.redirect("/node/login");

    }

    //res.status(200).render('chamado/index',{chamados: chamados});
    //res.render("chamado/index.ejs");

  } catch (error) {
    next(error);
  }
};


exports.logout = (req, res, next) => {
  req.session.logado = false;
  //res.render('index' , { title: 'About Page', layout: './layouts/base' });
  res.redirect("./");

 };


exports.home = (req, res, next) => {

 if(req.session.logado){
  res.render('indexlogado' , { logado: req.session, title: 'Home Page', layout: './layouts/base' });

  //res.redirect("./chamado");

 }else{
  res.render('index' , { title: 'About Page', layout: './layouts/base' });  
 }
};



exports.login_get =(req, res, next)=> {
  res.render("login/login.ejs" , { title: 'About Page', layout: './layouts/base' });
};



exports.login_post = async (req, res, next)=>{
  try{
    let reqSenha = req.body.password;
    let reqEmail = req.body.email;
    const check = await Usuarios.findOne({email: reqEmail});

    if(check){
      if(check.password){
        const isPasswordMatch = await bcrypt.compare(reqSenha, check.password);
        if(isPasswordMatch){
          req.session.logado = true;
          req.session.usuario_id = check._id;
          req.session.usuario_tipo = check.tipousuario;
          req.session.usuario_nome = check.nome;
          
          res.redirect("./");
        }
      } 
    }
    res.redirect("./login");

  } catch (error) {
    next(error);
  }
};


exports.signup_get = (req, res, next) =>{
  res.render("login/signup.ejs", { title: 'About Page', layout: './layouts/base' });
};

exports.singup_post = async (req, res, next)=>{
  try{
        const hash = await bcrypt.hash(req.body.password, 8);
     //       password: hash,
    const data = {
    nome: req.body.username,
    password: hash,
    email: req.body.email,
    telefone: req.body.telefone,
    instituicao: req.body.instituicao,
    profissao: req.body.profissao,
    local: req.body.local,
    tipousuario: 'atendente'
    }

    const existingUser = await Usuarios.findOne({nome: data.nome});
    console.log(data)
    console.log(existingUser);
    if(existingUser)
    {
      res.send("Usuário já existe. Escolha um outro nome.");
    }
    else {
      // hash the password using bcrypt
      // const salRounds=10;
      // const hashedPassword = await bcrypt.hash(data.password,salRounds);

      // data.password = hashedPassword; 

      //const userdata = await Usuarios.insertMany(data);

      const user = new Usuarios(data);
      try {
        const ss = await user.save();
      } catch (error) {
        next(error);
      }

    }
    res.redirect('/node');
  } catch (error) {
    next(error);
  }
};

exports.edit_perfil = async (req, res, next) => {
  try {
    let query = {_id:ObjectID(req.session.usuario_id)};
    const usuario = await Usuarios.findOne(query).lean();

    res.status(200).render('login/perfil',{ logado: req.session,usuario: usuario});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.update_perfil = async (req, res, next) => {

  try {
    const id_usuario = req.session.usuario_id;
    console.log(req.body);
    console.log(id_usuario);
    const usuario = await Usuarios.findOne({ _id: id_usuario}); 
    const hash = await bcrypt.hash(req.body.password, 8);
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
    res.redirect("/node");

    //res.status(200).json(updated);
  } catch (error) {
    next(error);
    console.log(error);
  } 

};