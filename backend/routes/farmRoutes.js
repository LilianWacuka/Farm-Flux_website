const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const { createFarm, getFarms, updateFarm } = require('../controllers/farmController');

const router = express.Router();
router.use(authMiddleware);

router.post('/', createFarm);
router.get('/', getFarms);
router.put('/:id', updateFarm);

module.exports = router;