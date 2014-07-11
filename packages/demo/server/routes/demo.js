'use strict';

var demoController = require('../controllers/demo');

module.exports = function (Demo, app, auth, database) {

    app.get('/demo/example/anyone', function (req, res, next) {
        res.send('Anyone can access this');
    });

    //To keep the implementation simple, I am using the same controller demoController for cart and items operations
    app.route('/demo/items').get(demoController.all);

    app.route('/demo/cart/:cartId/:itemId').put(demoController.addToCart);
    app.route('/demo/cart').get(demoController.getCart);
    app.route('/demo/cart/:cartId').put(demoController.checkoutCart);

    app.get('/demo/example/auth', auth.requiresLogin, function (req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/demo/example/admin', auth.requiresAdmin, function (req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/demo/example/render', function (req, res, next) {
        Demo.render('index', {
            package: 'demo'
        }, function (err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
