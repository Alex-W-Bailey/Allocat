const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api/v1', apiRoutes);

module.exports = router;
