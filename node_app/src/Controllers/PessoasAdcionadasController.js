const dbo = require("../db/conn");




const Compras = require("../models/CompraModel");
const Fornecedores = require("../models/FornecedorModel");
const {Produtos}  = require('../models/ProdutoModel');
exports.teste = (req, res, next) => {
  res.status(200).send("rota compra!");
};

exports.criar = async (req, res, next) => {
  let resultado = {};
  let salvar = true;

  try {
    let D = new Date();

    const fornecedor = await Fornecedores.findOne({ id: req.body.id_fornecedor }); 
    console.log(fornecedor);
    if (!fornecedor) {
      salvar = false;
      resultado.erro = { fornecedor: true };
    }

    if (req.body.data) {
      D = req.body.data;
    }

    let comprado = {
      id_fornecedor: fornecedor._id,
      data: D,
      status: req.body.sta,
    };
    
    if (req.body.itens.length) {
      for (let i = 0; i < req.body.itens.length; i++) {
        const item = req.body.itens[i];
        const produto = await Produtos.findOne({ nome: item.nome});

        if (produto) {
          let dados = {
            id_produto: produto._id,
            valor: item.valor,
            quantidade: item.quantidade,
          };

          comprado.itens ? comprado.itens.push(dados) : comprado.itens = [dados];
          /*
          if (comprado.itens) {
            comprado.itens.push(dados);
          } else {
            comprado.itens = [dados];
          }
          */
        } else {
          salvar = false;

          if (resultado.erro && resultado.erro.nome) {
            resultado.erro.nome.push(item.nome);
          } else {
            resultado.erro = { nome: [item.nome] };
          }
        }
      }
    } else {
      salvar = false;
      resultado.erro = { item: true };
    }
    
    if (salvar) {
        const product = new Compras(comprado);
      try {
        const ss = await product.save();
        resultado = ss;
      } catch (error) {
        next(error);
      }
          
    }
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};





async function estoque(itens) {
  const ObjectID = await require("mongodb").ObjectID;
  const dbConnect = await dbo.getDb();

  for (let i = 0; i < itens.length; i++) {
    const item = itens[i];

    const produto = await dbConnect
      .collection("Estoque")
      .find({ _id: ObjectID(item.id_produto) })
      .toArray();

    const quantidade = item.quantidade + produto[0].quantidade;

    await dbConnect.collection("Estoque").updateOne(
      { _id: ObjectID(item.id_produto) },
      {
        $set: {
          quantidade: quantidade,
        },
      }
    );
  }
}


exports.buscar = async (req, res, next) => {
  
  try {
    let X = {};

    if (req.body.dados) {
      if (req.body.dados.fornecedor) {
        X = { id_fornecedor: req.body.dados.fornecedor };
      }

      if (req.body.dados.id) {
          X = { _id: req.body.dados.id };
      }
    }

    const busca = await Compras.find(X)
      .populate('id_fornecedor', {nome:1 })
      .populate({ 
        path: 'itens',
        populate: {
          path: 'id_produto',
          model: 'Produtos',
          select: 'nome'
        },
      });

    res.status(200).json(busca);
  } catch (error) {
    next(error);
  } 
};

exports.editar = async (req, res, next) => {
  let resultado = {};
  let salvar = true;

  try {
    let fornecedor = false;
    const id_fornecedor = req.body.id_fornecedor;
    try {
      fornecedor = await Fornecedores.findOne({ _id: id_fornecedor }); 
    } catch (error) {
      salvar = false;
    }

    if (fornecedor) {

      let comprado = {
        id_fornecedor: fornecedor._id,
        data: req.body.data,
        status: req.body.sta,
      };

      
      if (req.body.itens.length) {
        for (let i = 0; i < req.body.itens.length; i++) {
          const item = req.body.itens[i];
          const produto = await Produtos.findOne({ nome: item.nome});

          if (produto) {
            let dados = {
              _id: item.id,
              id_produto: produto._id,
              valor: item.valor,
              quantidade: item.quantidade,
            };

            comprado.itens ? comprado.itens.push(dados) : comprado.itens = [dados];
          } else {
            salvar = false;

            if (resultado.erro && resultado.erro.nome) {
              resultado.erro.nome.push(item.nome);
            } else {
              resultado.erro = { nome: [item.nome] };
            }
          }
        }
      } else {
        salvar = false;
        resultado.erro = { item: true };
      }
      

      if (salvar) {
        try {
          const updated = await Compras.updateOne(
            { _id: req.body.id },
            {
              id_fornecedor: comprado.id_fornecedor,
              data: comprado.data,
              status: comprado.status,
              itens: comprado.itens,
            },
    
          );

          resultado.editado = true;
          resultado.rss = updated;
        } catch (error) {
          console.log(error);
          resultado.erro = { id: true };
        }
      }

    }
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
    console.log(error);
  } 

};

exports.deletar = async (req, res, next) => {
  let resultado = {};

  try {
    const dbConnect = await dbo.getDb();
    const ObjectID = await require("mongodb").ObjectID;

    await dbConnect
      .collection("Compras")
      .deleteOne({ _id: ObjectID(req.body.id) });

    resultado.deletado = true;
  } catch (error) {
    console.log(error);
  } finally {
    res.status(200).json(resultado);
  }
};
