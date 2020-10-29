const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "Todo"
    }]
})

module.exports = mongoose.model('Categories', CategorySchema);

