'use strict';

angular.module('mean.demo').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('Demo homepage', {
            url: '/demo/example',
            templateUrl: 'demo/views/index.html'
        });
    }
]);
