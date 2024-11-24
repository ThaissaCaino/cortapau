const multer = require("multer");
const upload = multer();

const DefaultController = require("../Controllers/DefaultController");
module.exports = (app) => {
  app.post("/login", DefaultController.login_post);
  app.get("/login", DefaultController.login_get);
  app.get("/logout", DefaultController.logout);
  app.get("/signup", DefaultController.signup_get);
  app.post("/signup", DefaultController.singup_post);
  app.get("/", DefaultController.home);

  app.get("*", DefaultController.auth);
  app.get("/perfil", DefaultController.edit_perfil);
  app.post("/perfil", upload.none(), DefaultController.update_perfil);

};
