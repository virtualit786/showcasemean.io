'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Cart Schema
 */
var CartSchema = new Schema({
    items: [{
        type: Schema.ObjectId,
        ref: 'Item'
    }]
});

/**
 * Statics
 */
CartSchema.statics.load = function(cb) {
    this.find().populate('items').exec(cb);
};

CartSchema.statics.loadSingle = function(cartId, cb) {
    this.findById(cartId).populate('items').exec(cb);
};

mongoose.model('Cart', CartSchema);
