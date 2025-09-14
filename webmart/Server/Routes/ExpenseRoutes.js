const express = require('express');
const router = express.Router();
const expController  = require('../Controllers/expenseController');

router.post('/addexpense',expController.addExpense )

router.get('/getallexpense',expController.getAllExpense )
router.get('/getallexpensebysubcat',expController.getAllbysubCat )
module.exports = router;