const DefaultRoute = require("./DefaultRoute");
const UsuarioRoute = require("./UsuarioRoute");
// const AcionamentoRoute = require("./AcionamentoRoute");
// const DisponibilidadeRoute = require("./DisponibilidadeRoute");
// const PessoasAdcionadasRoute = require("./PessoasAdcionadasRoute");
const ChamadoRoute = require("./ChamadoRoute");
const AtenderChamadoRoute = require("./AtenderChamadoRoute");
const MeusChamadoRoute = require("./MeusChamadosRoute");


module.exports = (app) => {
  DefaultRoute(app);
  UsuarioRoute(app);
  MeusChamadoRoute(app);
  ChamadoRoute(app);
  AtenderChamadoRoute(app);
  // AcionamentoRoute(app);
  // DisponibilidadeRoute(app);
  // PessoasAdcionadasRoute(app);
};
