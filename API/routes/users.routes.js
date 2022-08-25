const usersRoutes = require('express').Router();
const Users = require('../controllers/users.controller');
const { validarToken } = require('../middlewares/auth')

// show
usersRoutes.get("/all", Users.findAll)

// list
usersRoutes.get("/show/:id", Users.findOne)

// login
usersRoutes.post("/login", Users.findOne2);

// create
usersRoutes.post("/create", Users.create)

// update
usersRoutes.put("/update", Users.update)

// updatePassword
usersRoutes.put("/password", Users.update2);

// delete
usersRoutes.delete("/delete/:id", Users.delete)

// validaToken
usersRoutes.get("/validatoken", validarToken, Users.validatoken);

module.exports = usersRoutes;