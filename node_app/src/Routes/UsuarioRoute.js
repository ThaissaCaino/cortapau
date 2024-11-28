const multer = require("multer");
const upload = multer();

const UsuarioController = require("../Controllers/UsuarioController");
module.exports = (app) => {
  app.get("/usuarios", upload.none(), UsuarioController.index);
  app.get("/usuarios/new", upload.none(), UsuarioController.new);
  app.post("/usuarios/new", upload.none(), UsuarioController.create);
  app.get("/usuarios/:id/edit", upload.none(), UsuarioController.edit);
  app.post("/usuarios/:id/edit", upload.none(), UsuarioController.update);
  app.get("/usuarios/:id/delete", upload.none(), UsuarioController.deletar);
  app.get("/usuarios/:id/show", upload.none(), UsuarioController.show);
};
