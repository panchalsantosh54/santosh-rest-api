const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: String,
    email: String,
    city: String
}, {
    timeStamps: true
});

module.exports = mongoose.model('customers', CustomerSchema); 