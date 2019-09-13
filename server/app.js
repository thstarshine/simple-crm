const path = require('path');
const AutoLoad = require('fastify-autoload');
const Swagger = require('fastify-swagger');
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
            const { Customer, CustomerNote } = fastify.sequelize.models;
            // define relations
            CustomerNote.belongsTo(Customer, { foreignKey: 'customerId' });
            Customer.hasMany(CustomerNote, { foreignKey: 'customerId' });
            // Sync all models that aren't already in the database
            // fastify.sequelize.sync()
            // Force sync all models
            fastify.sequelize.sync({ force: true }).then(() => {
                Customer.create({
                    name: '123',
                });
                CustomerNote.create({
                    customerId: 1,
                    description: '123s note',
                });
            });
        });

    fastify.register(Swagger, {
        exposeRoute: true,
        routePrefix: '/documentation',
        swagger: {
            info: {
                title: 'Test swagger',
                description: 'testing the fastify swagger api',
                version: '0.1.0',
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [{ name: 'user', description: 'User related end-points' }],
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header',
                },
            },
        },
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

    fastify.ready(() => {
        fastify.swagger();
    });

    // Make sure to call next when done
    next();
};
