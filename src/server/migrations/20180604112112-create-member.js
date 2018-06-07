/* eslint arrow-body-style: "off" */
/* eslint-env es6 */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Members', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false
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
          role: {
            type: Sequelize.ARRAY(Sequelize.STRING)
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Members');
  }
};
