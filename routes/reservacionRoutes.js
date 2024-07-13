const express = require("express");
const router = express.Router();
const reservacionController = require('../controllers/reservacionController')

router.post('/reservacion', reservacionController.crearResevacion);

module.exports = router;