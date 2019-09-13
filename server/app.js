const path = require('path');
const AutoLoad = require('fastify-autoload');
const Sequelize = require('./sequelize');
const config = require('./config');
const models = require('./models');

module.exports = function(fastify, opts, next) {
    // init db connection and models
    fastify
        .register(Sequelize, {
            dialect: 'mariadb',
            dialectOptions: {
                connectTimeout: 1000,
            },
            database: config.database,
            username: config.username,
            password: config.password,
            models,
        })
        .after(() => {
            const { Customer } = fastify.sequelize.models;
            // Sync all models that aren't already in the database
            // fastify.sequelize.sync()
            // Force sync all models
            fastify.sequelize.sync({ force: true }).then(() => {
                Customer.create({
                    name: '123',
                });
            });
        });

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

    // Make sure to call next when done
    next();
};
