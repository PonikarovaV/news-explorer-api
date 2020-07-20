const router = require('express').Router();
const cors = require('cors');

const { getUser } = require('../controllers/users');

const corsOptions = {
  origin: true,
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true,
};

router.get('/me', cors(corsOptions), getUser);

module.exports = router;
