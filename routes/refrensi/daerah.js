const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');

router.get('/', controller.daerah.getAll);
router.get('/:search', controller.daerah.findDaerah);
router.post('/', controller.daerah.post);
router.put('/:IdDaerah', controller.daerah.update);

module.exports = router;