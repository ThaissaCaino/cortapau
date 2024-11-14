const multer = require("multer");
const upload = multer();

const MeusChamadoController = require("../Controllers/MeusChamadoController");
module.exports = (app) => {
  app.get("/meuschamados", upload.none(), MeusChamadoController.index);
  
  //app.delete("/compra/mongose/deletar",upload.none(),FornecedorController.deletar);
};