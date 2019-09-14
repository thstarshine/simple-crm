const Promise = require('bluebird');

module.exports = async function(fastify) {
    const { Customer, CustomerNote } = fastify.sequelize.models;
    fastify.get(
        '/customers',
        {
            schema: {
                response: {
                    200: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                phone: { type: 'string' },
                                email: { type: 'string' },
                                status: { type: 'string' },
                                createdAt: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        async function(request, reply) {
            const customers = await Customer.findAll({
                attributes: { exclude: ['address'] },
                where: {
                    deleted: false,
                },
                order: ['id'],
            });
            reply.send(customers);
        },
    );
    fastify.get(
        '/customer/:customerId',
        {
            schema: {
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            name: { type: 'string' },
                            phone: { type: 'string' },
                            address: { type: 'string' },
                            email: { type: 'string' },
                            status: { type: 'string' },
                            createdAt: { type: 'string' },
                            CustomerNotes: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer' },
                                        description: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        async function(request, reply) {
            const customer = await Customer.findOne({
                where: {
                    id: request.params.customerId,
                    deleted: false,
                },
                include: [
                    {
                        model: CustomerNote,
                    },
                ],
            });
            reply.send(customer);
        },
    );
    fastify.post(
        '/customer/:customerId',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            enum: ['prospective', 'current', 'non-active'],
                            nullable: true,
                        },
                        notes: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer', nullable: true },
                                    description: { type: 'string' },
                                    deleted: { type: 'boolean' },
                                },
                            },
                            nullable: true,
                        },
                    },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            message: { type: 'string' },
                        },
                    },
                },
            },
        },
        async function(request, reply) {
            const { body } = request;
            const { customerId } = request.params;
            const { status, notes } = body;
            if (status !== null) {
                // update status
                await Customer.update(
                    {
                        status,
                    },
                    {
                        where: {
                            id: customerId,
                        },
                    },
                );
            }
            if (notes.length) {
                // add, modify or delete notes
                await Promise.each(notes, async note => {
                    const { id: noteId, description, deleted } = note;
                    if (!noteId && deleted) {
                        // new one and deleted, skip
                        return;
                    }
                    if (!noteId) {
                        await CustomerNote.create({
                            description,
                            customerId,
                        });
                        return;
                    }
                    if (deleted) {
                        await CustomerNote.update({ deleted: true }, { where: { id: noteId } });
                        return;
                    }
                    await CustomerNote.update({ description }, { where: { id: noteId } });
                });
            }
            reply.send({});
        },
    );
};
