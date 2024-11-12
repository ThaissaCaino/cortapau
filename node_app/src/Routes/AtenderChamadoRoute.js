const multer = require("multer");
const upload = multer();

const AtenderChamadoController = require("../Controllers/AtenderChamadoController");
module.exports = (app) => {
  app.get("/atender", upload.none(), AtenderChamadoController.index);
  app.get("/atender/:id/edit", upload.none(), AtenderChamadoController.edit);
  app.post("/atender/:id/edit", upload.none(), AtenderChamadoController.update);
  app.get("/atender/:id/show", upload.none(), AtenderChamadoController.show);
};