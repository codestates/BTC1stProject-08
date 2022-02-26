const {
    DataTypes,
} = require('sequelize');

module.exports = (sequelize) => sequelize.define('Transactions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    txChain: {
        type: DataTypes.STRING,
    },
    txId: {
        type: DataTypes.STRING,
    },
    txByte: {
      type: DataTypes.STRING,
    },
    txTime: {
        type: DataTypes.DATE,
    },
    txEncod: {
      type: DataTypes.STRING,
    },
    txIndex: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'transactions',
    createdAt: false,
    updatedAt: false,
});