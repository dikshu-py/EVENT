const mongoose = require('mongoose');

const subCatSchema = new mongoose.Schema({
    name : String ,
    amount : Number,
    mode : String 

},{timestamps:true})
const SubCategory = mongoose.model('SubCategory', subCatSchema);

module.exports = SubCategory;