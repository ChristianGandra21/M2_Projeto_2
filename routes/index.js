const express = require('express');
const router = express.Router();

const jogadoresRoutes = require('./jogadores');
router.use('/jogadores', jogadoresRoutes);

module.exports = router;
