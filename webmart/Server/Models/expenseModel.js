const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    
    amount: {
        required: true,
        type: Number
    },
    category: {
        required: true,
        type: String
    }
    , subcategory: {
        type : String
    },
    check : String ,
    description : String
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense;