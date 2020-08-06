const router = require('express').Router();
const cors = require('cors');

const { getUser } = require('../controllers/users');

router.get('/me', getUser);

module.exports = router;
