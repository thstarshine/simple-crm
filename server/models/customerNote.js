const Sequelize = require('sequelize');

const { Model } = Sequelize;

module.exports = sequelize => {
    class CustomerNote extends Model {}
    CustomerNote.init(
        {
            customerId: {
                type: Sequelize.INTEGER,

                references: {
                    model: sequelize.models.Customer,
                    key: 'id',
                },
            },
            description: Sequelize.TEXT,
            deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        },
        { sequelize },
    );
};
