const AuthorController = require("../controllers/author.controller");
module.exports = function (app) {
  app.get("/", AuthorController.index);
  app.get("/:id", AuthorController.getOneAuthor);
  app.post("/new", AuthorController.createAuthor);
  app.put("/edit/:id", AuthorController.updateAuthor);
  app.delete("/:id", AuthorController.deleteAuthor);
  
};
