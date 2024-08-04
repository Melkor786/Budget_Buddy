const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    category: {
        type: String,
        required:true,
    }
});

module.exports = mongoose.model('Bill', BillSchema);