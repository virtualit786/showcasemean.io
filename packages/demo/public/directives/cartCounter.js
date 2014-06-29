/**
 * Created by farooqhameed on 6/29/14.
 */

angular.module('mean.demo').directive("cartCounter", [
    function () {
        return {
            restrict: 'E',
            cartItemsCount: 0,
            template: '<div> ' +
                '<h2> {{cartItemsCount}} Items in Cart </h2>' +
                '</div>'
            ,
            link: function (scope, element, attrs) {
                scope.$watch('cart.items', function (items) {
                    if(items){
                        scope.cartItemsCount = items.length;
                    }
                });
            }
        }
    }
]);
