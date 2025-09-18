const task = require('../Models/taskModel');

exports.addTask = async (req, res) => {
    try {
        console.log(req.body)
        const { title, status ,description } = req.body;
        const newTask = await task.create({title,status ,  description })
        res.status(201).json({
            success: true,
            message: 'Activity added successfully',
            data: newTask
        });



    } catch (err) {
        res.status(400).json({ success: false, message: `Error in Adding Activity ${err}`, error: err })
    }

}
exports.getTask = async (req, res) => {
    try {
        const days = 30;
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const tasks = await task.find(
            { createdAt: { $gte: fromDate } },
            { title : 1 , status :1 ,description: 1, createdAt: 1 } // projection → return only these fields
        )
            .sort({ createdAt: -1 }) // recent first
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
            count: tasks.length,
            data: grouped
        });



    } catch (err) {
        res.status(400).json({ success: false, message: `Error in Getting Activity ${err}`, error: err })
    }

}