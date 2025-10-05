const express = require('express');
const router = express.Router();
const taskController  = require('../Controllers/taskController');

router.post('/addtask',taskController.addTask)

router.get('/getalltask',taskController.getTask )
router.delete('/deletetask',taskController.deleteTask )
router.put('/updatetask',taskController.updateTask )

module.exports = router;