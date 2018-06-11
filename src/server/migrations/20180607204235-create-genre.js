'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { // eslint-disable-line arrow-body-style
    return queryInterface.createTable('Genres', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => { // eslint-disable-line arrow-body-style
    return queryInterface.dropTable('Genres');
  }
};
