const multer = require("multer");
const upload = multer();

const AtenderChamadoController = require("../Controllers/AtenderChamadoController");
module.exports = (app) => {
  app.get("/atender", upload.none(), AtenderChamadoController.index);
  app.get("/atender/:id/resolver", upload.none(), AtenderChamadoController.resolver);
  app.post("/atender/:id/resolver", upload.none(), AtenderChamadoController.resolverrupdate);
  app.get("/atender/:id/show", upload.none(), AtenderChamadoController.show);
};