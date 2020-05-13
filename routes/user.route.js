const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const userValidate = require('../validate/user.validate')
router.get("/", userController.index);

router.get('/:id/delete',userController.delete )

router.get('/:id/update',userController.update )

router.post('/:id/update', userController.postUpdate)

router.post('/create',userValidate.postCreate, userController.postCreate)

module.exports = router;