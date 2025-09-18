const expense = require('../Models/expenseModel');
const SubCategory = require('../Models/subCategory');


exports.addExpense = async (req, res) => {
    try {
        const {  amount, category, subcategory, check, description } = req.body;

        // Save to DB (await required)
        const newExpense = await expense.create({
          
            amount,
            category,
            subcategory,
            check,
            description

        });

        
        res.status(201).json({
            success: true,
            message: 'Expense added successfully',
            data: newExpense
        });

    } catch (err) {
       
        res.status(400).json({
            success: false,
            message: `Error in Adding Expense: ${err.message}`
        });
    }
};

exports.getAllExpense = async (req, res) => {
    try {
        const allExpenselist = await expense.find().sort({ createdAt: -1 })
        grouped = {}
        allExpenselist.forEach(exp => {
            const date = new Date(exp.createdAt);
           const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            if (!grouped[key]) {
                grouped[key] = [];
            }

            grouped[key].push(exp);
        });
        res.status(200).json({
            success: true,
            message: "All Expense Fetched Sucessfully (BY Month )",
            count: grouped.length,
            data: grouped
        })

    } catch (err) {
        console.error('Error adding expense:', err.message);
        res.status(400).json({
            success: false,
            message: `Error in Fetching All Expense: ${err.message}`
        });
    }
}

exports.getAllbysubCat = async (req, res) => {
    try {
        const allexpense = await expense.find().sort({ createdAt: -1 })
        var grouped = {}
        // grouping all Expenses by Sub Cat
        
        allexpense.forEach((res) => {
            if (res.category == "Friend") {
                const key = res.subcategory
                if (!grouped[key]) {
                    grouped[key] = []
                }
                grouped[key].push(res)

            }

        })
        
        res.status(201).json({success : true, message : "Fetched All by SubCat Success" , data : grouped ,count: grouped.length})



    } catch (err) {
        res.status(400).json({ success: false, message: `Error in Getting By SubCat Wise ${err}`, error: err })
    }
}
