'use strict';

angular.module('mean.demo').factory('Demo', ['$resource', '$q',
    function ($resource, $q) {
        var itemResource = $resource('demo/items/:itemId', {
            itemId: '@itemId'
        }, {
        });

        var cartResource = $resource('demo/cart/:cartId/:itemId',
            {
                cartId: '@cartId',
                itemId: '@itemId'
            },
            {
                addToCart: {
                    method: 'PUT',
                    isArray: false
                },
                getCart: {
                    method: 'GET',
                    isArray: false
                },
                checkoutCart: {
                    method: 'PUT',
                    isArray: false
                }
            });

        function addItemToCart(cartId, itemId) {
            var deferred = $q.defer();

            cartResource.addToCart({cartId: cartId, itemId: itemId}, function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getAllItems() {
            var deferred = $q.defer();

            itemResource.query({}, function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }

        function getCart() {
            var deferred = $q.defer();

            cartResource.getCart({}, function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }

        function checkoutCart(cart) {

            var deferred = $q.defer();

            if (cart.items.length > 0) {
                cart.total = 0;

                _.each(cart.items, function (item) {
                    if(item.hasOwnProperty('value'))
                        cart.total += item.value;
                });

                if (cart.total >= 10) {

                    cartResource.checkoutCart({cartId: cart._id}, function success(response) {
                        deferred.resolve(cart.total);
                    }, function error(response) {
                        deferred.reject(response);
                    });

                } else if (cart.total < 10) {
                    deferred.reject(new Error('Total Cart value ' + cart.total + ' is less than 10'));
                }

            } else {
                deferred.reject(cart);
            }


            return deferred.promise;
        }

        return {
            getAllItems: getAllItems,
            addItemToCart: addItemToCart,
            getCart: getCart,
            checkoutCart: checkoutCart
        };

    }
]);