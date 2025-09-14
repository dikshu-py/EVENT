const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
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