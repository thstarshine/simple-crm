// modified from https://github.com/lyquocnam/fastify-sequelize
const fp = require('fastify-plugin');
const Sequelize = require('sequelize');

function plugin(fastify, options) {
    const instance = options.instance || 'sequelize';
    const autoConnect = options.autoConnect || true;
    const sequelize = new Sequelize(options.database, options.username, options.password, options);

    function decorate() {
        fastify.decorate(instance, sequelize);
        fastify.addHook('onClose', (fastifyInstance, done) => {
            sequelize
                .close()
                .then(done)
                .catch(done);
        });
    }

    if (autoConnect) {
        return sequelize.authenticate().then(decorate);
    }

    decorate();

    return Promise.resolve();
}

module.exports = fp(plugin);
