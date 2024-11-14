const multer = require("multer");
const upload = multer();

const ChamadoController = require("../Controllers/ChamadoController");
module.exports = (app) => {
  app.get("/chamado", upload.none(), ChamadoController.index);
  app.get("/chamado/new", upload.none(), ChamadoController.new);
  app.post("/chamado/new", upload.none(), ChamadoController.save);
  app.get("/chamado/:id/edit", upload.none(), ChamadoController.edit);
  app.post("/chamado/:id/edit", upload.none(), ChamadoController.update);
  app.get("/chamado/:id/show", upload.none(), ChamadoController.show);
  app.get("/chamado/:id/delete", upload.none(), ChamadoController.delete);
  app.get("/chamado/:id/vincular", upload.none(), ChamadoController.vincular);
  //app.delete("/compra/mongose/deletar",upload.none(),FornecedorController.deletar);
};