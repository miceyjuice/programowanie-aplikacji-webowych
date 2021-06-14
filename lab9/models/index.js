const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;
db.products = require('./product.model');
db.products = require('./category.model');

module.exports = db;