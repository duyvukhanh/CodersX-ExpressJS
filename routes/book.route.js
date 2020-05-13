const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller')


router.get("/", bookController.index);

router.get('/:id/delete', bookController.delete)

router.get('/:id/update', bookController.update)
    
router.post('/:id/update', bookController.postUpdate)

router.post('/create', bookController.postCreate)

module.exports = router;