const mongoose = require('mongoose');

const schema = new mongoose.Schema({ /* properties */ });

module.exports = mongoose.model('schema', schema);