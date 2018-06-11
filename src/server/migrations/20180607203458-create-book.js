'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { // eslint-disable-line arrow-body-style
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      isbn: {
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      numberOfPages: {
        type: Sequelize.INTEGER,
        field: 'number_of_pages'
      },
      imageUrl: {
        type: Sequelize.STRING,
        field: 'image_url'
      },
      edition: {
        type: Sequelize.STRING
      },
      abstract: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publicationDate: {
        type: Sequelize.DATE,
        field: 'publication_date'
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
    return queryInterface.dropTable('Books');
  }
};
