const multer = require("multer");
const upload = multer();

const FornecedorController = require("../Controllers/CompraControllerMongose");
module.exports = (app) => {
  app.get("/compra/mongose/teste", upload.none(), FornecedorController.teste);
  app.post("/compra/mongose/criar", upload.none(), FornecedorController.criar);
  app.post("/compra/mongose/buscar",upload.none(),FornecedorController.buscar);
  app.post("/compra/mongose/editar",upload.none(),FornecedorController.editar);
  app.delete("/compra/mongose/deletar",upload.none(),FornecedorController.deletar);
};
