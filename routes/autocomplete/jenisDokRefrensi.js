const express = require('express');
const router = express.Router();
const controller = require('../../controller/autocomplete/jenisDokRefrensi');

router.get('/', controller.getAll);
router.get('/:search', controller.getOne);

module.exports = router;