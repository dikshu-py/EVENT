const task = require('../Models/taskModel');

exports.addTask = async (req, res) => {
    try {
        console.log(req.body)
        const { title, status, description } = req.body;
        const newTask = await task.create({ title, status, description })
        res.status(201).json({
            success: true,
            message: 'Activity added successfully',
            data: newTask
        });



    } catch (err) {
        res.status(400).json({ success: false, message: `Error in Adding Activity ${err}`, error: err })
    }

}
exports.deleteTask = async (req, res) => {
    try {
        console.log(req.body, "body")
        const { id } = req.body;
        const newTask = await task.findByIdAndDelete({ _id: id })
        res.status(201).json({
            success: true,
            message: 'Task Deleted successfully',
            data: newTask
        });



    } catch (err) {
        res.status(400).json({ success: false, message: `Error in Deleted Activity ${err}`, error: err })
    }

}
exports.updateTask = async (req, res) => {
    try {
        console.log(req.body, "body")
        const { tasks } = req.body;
        const newTask = await task.findByIdAndUpdate(tasks._id, tasks, {
            new: true,           // return the updated document
            runValidators: true, // validate the schema
        })
        res.status(201).json({
            success: true,
            message: 'Task Updated successfully',
            data: newTask
        });



    } catch (err) {
        res.status(400).json({ success: false, message: `Error in Updating Task ${err}`, error: err })
    }

}
exports.getTask = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;       // Current page
        const limit = parseInt(req.query.limit) || 8;     // Items per page
        const search = req.query.search || '';
        const order = req.query.order == "Newest" ? -1 : 1; // to set the order of data Latest or Oldest
        const days = 30;
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const query = {
            title: { $regex: search, $options: 'i' },
            createdAt: { $gte: fromDate }
        };
        const c = await task.countDocuments(query);
        console.log(c)
        const tasks = await task.find(
            query,
            { title: 1, status: 1, description: 1, createdAt: 1 } // projection → return only these fields
        ).skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: order }); // recent first

        const grouped = {}
        tasks.forEach(exp => {
            const date = new Date(exp.createdAt);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            if (!grouped[key]) {
                grouped[key] = [];
            }

            grouped[key].push(exp);
        });

        res.status(201).json({
            success: true,
            message: 'Activity Data Fetch successfully',
            count: c,
            data: tasks
        });



    } catch (err) {
        res.status(400).json({ success: false, message: `Error in Getting Activity ${err}`, error: err })
    }

}