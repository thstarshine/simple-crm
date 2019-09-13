const Sequelize = require('sequelize');

const { Model } = Sequelize;

module.exports = sequelize => {
    class Customer extends Model {}
    Customer.init(
        {
            name: Sequelize.STRING,
            phone: Sequelize.STRING,
            address: Sequelize.STRING,
            email: {
                type: Sequelize.STRING,
                unique: true,
            },
            status: {
                type: Sequelize.ENUM('prospective', 'current', 'non-active'),
                allowNull: false,
                defaultValue: 'current',
            },
            deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        },
        { sequelize },
    );
};
