const express = require('express');
const controller = require('./controllers');
const router = express.Router();

router.post('/api/call-id', controller.saveCallId);
router.get('/api/call-id/:id', controller.getCallId);

module.exports = router;
