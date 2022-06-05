const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = express.Router(),
  path = require('path'),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  userController = require("./controllers/userController"),
  postController = require("./controllers/postController"),
  db = require("./models/index"),
  models = require("./models/index.js");

db.sequelize.sync();

const User = db.user;
const Post = db.post;

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

router.use(layouts);
router.use(express.static(__dirname + '/public'));

router.use(
  express.urlencoded({
    extended: false
  })
);

router.use(express.json());

router.get("/", homeController.index);

router.get("/posts", postController.index, postController.indexView);
router.get("/posts/new", postController.new);
router.post("/posts/create", postController.create, postController.redirectView);
router.get("/posts/:id/edit", postController.edit);
router.post("/posts/:id/update", postController.update, postController.redirectView);
router.get("/posts/:id", postController.show, postController.showView);
router.post("/posts/:id/delete", postController.delete, postController.redirectView);

router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.new);
router.post("/users/create", userController.create, userController.redirectView);
router.get("/users/:id/edit", userController.edit);
router.post("/users/:id/update", userController.update, userController.redirectView);
router.get("/users/:id", userController.show, userController.showView);
router.post("/users/:id/delete", userController.delete, userController.redirectView);



router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
        console.log(`Server running on port: ${app.get("port")}`);
});