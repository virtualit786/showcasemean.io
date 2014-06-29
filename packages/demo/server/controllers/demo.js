'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
 _ = require('lodash/dist/lodash.underscore'),
 Q = require('q');

//    _ = require('lodash');
//    Item = mongoose.model('Item'),


//To keep the imlementation simple, I am using the same controller for cart and items operations

var items = [];
var cart = {id:1};
cart.items = [];

function initItems() {

    console.log('****************initItems()*******************');
    console.log('Cart = '+ JSON.stringify(cart));
    console.log('Items = '+JSON.stringify(items));
    console.log('****************initItems()*******************');

    if(items.length > 0) return;

//    cart.items = [];

    items.push({id: 1, item: 'I1', image: 'http://placehold.it/800x600', value: 2});
    items.push({id: 2, item: 'I2', image: 'http://placehold.it/800x600', value: 2});
    items.push({id: 3, item: 'I3', image: 'http://placehold.it/800x600', value: 2});
    items.push({id: 4, item: 'I4', image: 'http://placehold.it/800x600', value: 2});
    items.push({id: 5, item: 'I5', image: 'http://placehold.it/800x600', value: 2});
    items.push({id: 6, item: 'I6', image: 'http://placehold.it/800x600', value: 2});

    console.log('****************Initializing initItems()*******************');
    console.log(JSON.stringify(cart));
    console.log(JSON.stringify(items));
    console.log('****************Initialized initItems()*******************');

}

exports.all = function(req, res, next) {
    initItems();
    res.jsonp(items);
};

exports.addToCart = function (req, res, next) {
    console.log('req.params.itemId = ' + req.params.itemId);
    console.log(JSON.stringify(items));

    var itemId = req.params.itemId;
    var itemFound;

    items.forEach(function (item) {
        if (item.id == itemId){
            itemFound = item;
            console.log('ItemFound = '+JSON.stringify(itemFound));
        }
    });

    if(!_.isUndefined(itemFound)){
        cart.items.push(itemFound);
    }

    res.jsonp(cart);

};

exports.getCart = function (req, res, next) {
    res.jsonp(cart);

};

function checkoutCart(cart) {
            var cartTotalValue = 0;

    var deferred = Q.defer();

//            if (cart.items.length > 0) {
//
                _.each(cart.items, function(item) {
                    cartTotalValue += item.value;
                });

                if (cartTotalValue  >= 10) {
                    deferred.resolve(cartTotalValue);
                } else if (cartTotalValue  < 10) {
                    deferred.reject(new Error( 'Current Total Cart value '+cartTotalValue+' is less than 10'));
                }
//
//            } else {
//                deferred.reject(cart);
//            }

    return deferred.promise;
}

exports.checkoutCart = function (req, res, next) {

    var cartTotalValue = 0;

    _.each(cart.items, function(item) {
        cartTotalValue += item.value;
    });

    if (cartTotalValue  >= 10) {
        res.jsonp({cartTotalValue: cartTotalValue});
    } else if (cartTotalValue  < 10) {
        deferred.reject(new Error( 'Current Total Cart value '+cartTotalValue+' is less than 10'));
    }



};