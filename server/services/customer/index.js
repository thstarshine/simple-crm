module.exports = async function(fastify) {
    fastify.get('/', async function(request, reply) {
        reply.send('list cutomers');
    });
    fastify.get('/:customerId', async function(request, reply) {
        reply.send('get specific customer detail');
    });
    fastify.post('/:customerId', async function(request, reply) {
        reply.send('modify customer data');
    });
};

module.exports.autoPrefix = '/customer';
