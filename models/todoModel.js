const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: String,
    completed: Boolean,
    cat: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categories"
    }
})

module.exports = mongoose.model('Todo', TodoSchema);

