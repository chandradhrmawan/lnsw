const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');

router.get('/', controller.listHs.getAll);
router.get('/:search', controller.listHs.findList);
router.post('/', controller.listHs.post);
router.put('/:IdHsCodeKek', controller.listHs.update);

module.exports = router;