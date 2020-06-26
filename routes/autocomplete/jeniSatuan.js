const express = require('express');
const router = express.Router();
const controller = require('../../controller/autocomplete/jeniSatuan');

router.get('/', controller.getAll);
router.get('/:search', controller.getOne);

module.exports = router;