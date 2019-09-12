const path = require('path');
const AutoLoad = require('fastify-autoload');
const Sequelize = require('./sequelize');
const config = require('./config');

module.exports = function(fastify, opts, next) {
    // Place here your custom code!

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: {
            ...opts,
        },
    });

    // This loads all plugins defined in services
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'services'),
        options: {
            ...opts,
        },
    });

    fastify
        .register(Sequelize, {
            instance: 'sequelize', // the name of fastify plugin instance.
            autoConnect: true, // auto authentication and test connection on first run

            // other sequelize config goes here
            dialect: 'mariadb',
            dialectOptions: {
                connectTimeout: 1000,
            },
            database: config.database,
            username: config.username,
            password: config.password,
        })
        .ready();

    // Make sure to call next when done
    next();
};
