'use strict';

angular.module('mean.demo').controller('DemoController', ['$scope', 'Global', 'Demo',
    function($scope, Global, Demo) {

        $scope.cart = {};
        $scope.cart.items = [];
        $scope.items = [];

        $scope.init = function () {

            Demo.getAllItems().then (function (response) {
                $scope.items = response;

                Demo.getCart().then (function (response) {
                    $scope.cart = response;
                }, function (error) {
                    alert(JSON.stringify (error) );
                });

            }, function (error) {
                alert(JSON.stringify (error) );
            });


        };

        $scope.global = Global;
        $scope.package = {
            name: 'demo'
        };
        
        $scope.addToCartClicked = function (itemId) {

            Demo.addItemToCart($scope.cart._id, itemId).then(function (response) {

                $scope.cart = response;

            }, function (error) {
                alert('Error ' + JSON.stringify(error));
            });

        };

        $scope.checkOutCartClicked = function (itemId) {

            Demo.checkoutCart($scope.cart).then (function (response) {
                alert('Total Cart value = ' + ( response)) ;
            }, function (error) {
                alert(error.message) ;
            });


        };

    }
]);