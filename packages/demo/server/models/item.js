'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Item Schema     items.push({id: 1, item: 'I1', image: 'http://placehold.it/800x600', value: 2});
 */
var ItemSchema = new Schema({
    title: {
        type: String,
        required: false,
        trim: true
    },
    imageUrl: {
        type: String,
        required: false,
        trim: true
    },
    value: {
        type: Number,
        required: false
    }
});
/**
 * Statics
 */

ItemSchema.statics.loadSingle = function(id, cb) {
    this.findById(id).exec(cb);
};

mongoose.model('Item', ItemSchema);
