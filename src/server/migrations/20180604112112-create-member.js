'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { // eslint-disable-line arrow-body-style
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => { // eslint-disable-line arrow-body-style
        return queryInterface.createTable('Members', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'first_name'
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'last_name'
          },
          username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
              isEmail: true,
              nonEmpty: true
            }
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              nonEmpty: true
            }
          },
          roles: {
            type: Sequelize.ARRAY(Sequelize.STRING)
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
      });
  },
  down: (queryInterface, Sequelize) => { // eslint-disable-line arrow-body-style
    return queryInterface.dropTable('Members');
  }
};
