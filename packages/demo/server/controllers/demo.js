'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    async = require('async'),
    Item = mongoose.model('Item'),
    Cart = mongoose.model('Cart');


//To keep the implementation simple, I am using the same controller for cart and items operations

function initItems(res) {

    async.parallel([
        function (callback) {
            createItems('I1', 'http://placehold.it/800x600', 1, callback);
        },
        function (callback) {

            createItems('I2', 'http://placehold.it/800x600', 2, callback);
        },
        function (callback) {

            createItems('I3', 'http://placehold.it/800x600', 3, callback);
        },
        function (callback) {

            createItems('I4', 'http://placehold.it/800x600', 4, callback);
        },
        function (callback) {

            createItems('I5', 'http://placehold.it/800x600', 5, callback);
        },
        function (callback) {

            createItems('I6', 'http://placehold.it/800x600', 6, callback);
        }
    ], function (err, results) {
        console.log('Series completion block  from async.parallel with error = ' + err + '  and results = ' + results + '-');

        Item.find().exec(function (err, loadedItems) {
            if (err) {
                return res.jsonp(500, {
                    error: 'Cannot fetch items'
                });
            }
            res.jsonp(loadedItems);

        });

    });

}

function createItems(title, imageUrl, value, callback) {
    var item = new Item();
    item.title = title;
    item.value = value;
    item.imageUrl = imageUrl;

    item.save(function (err) {
        if (err) {
            var error = {error: 'Cannot save the item', msg: err};
        } else {
            console.log('Item saved ' + JSON.stringify(item));
        }
        callback();
    });
};


exports.all = function (req, res, next) {

    Item.find().exec(function (err, loadedItems) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot fetch items'
            });
        }
        if (loadedItems && loadedItems.length < 1) {
            initItems(res);
        } else {
            res.jsonp(loadedItems);
        }
    });

};

exports.addToCart = function (req, res, next) {

    var itemId = req.params.itemId;
    var cartId = req.params.cartId;

    Item.loadSingle(itemId, function (err, item) {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load item ' + itemId));

        Cart.loadSingle(cartId, function (err, cart) {
            if (err) return next(err);
            if (!cart) return next(new Error('Failed to load Cart ' + cartId));

            cart.items.push(item);
            cart.save(function (err) {
                if (err) {
                    return res.jsonp(500, {
                        error: 'Cannot update the cart'
                    });
                }
                res.jsonp(cart);
            });
        });
    });
};

exports.getCart = function (req, res, next) {

    Cart.load(function (err, loadedCart) {

        if (err)
            return next(err);

        if (!loadedCart || loadedCart.length < 1) {

            var localCart = new Cart();
            localCart.save(function (err) {
                if (err) {
                    var error = {error: 'Cannot create the cart', msg: err};
                    res.jsonp(new Error('Failed in creating the cart'));
                } else {
                    res.jsonp(localCart);
                }
            });
        } else {
            res.jsonp(loadedCart[0]);
        }
    });
};

exports.checkoutCart = function (req, res, next) {

    var cartTotalValue = 0;
    var cartId = req.params.cartId;


    Cart.loadSingle(cartId, function (err, cart) {
        if (err) return next(err);
        if (!cart) return next(new Error('Failed to load Cart ' + cartId));

        _.each(cart.items, function (item) {
            cartTotalValue += item.value;
        });

        res.jsonp({cartTotalValue: cartTotalValue});

    });
};