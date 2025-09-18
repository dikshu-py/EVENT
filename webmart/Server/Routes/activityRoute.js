const express = require('express');
const router = express.Router();
const  activityConroller  = require('../Controllers/activityController');

router.post('/addactivity', activityConroller.addActivty);
router.get('/getactivity', activityConroller.getActivty);

module.exports = router;