const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

router.get('/', controller.index);
router.post('/', controller.store);
router.post('/edit/:id', controller.update);
router.post('/delete/:id', controller.destroy);
router.get('/user/:user_id', controller.byUser);

module.exports = router;
