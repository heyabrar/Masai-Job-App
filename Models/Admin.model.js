const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    name: String,
    position: String,
    contract: String,
    location: String
});

const AdminModel = mongoose.model('AdminSide', AdminSchema);

module.exports = {
    AdminModel
};