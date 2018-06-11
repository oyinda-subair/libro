'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { // eslint-disable-line arrow-body-style
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      ratings: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      bookId: {
        type: Sequelize.UUID,
        field: 'book_id',
        reference: {
          model: 'Book',
          key: 'id',
          as: 'bookId'
        }
      },
      memberId: {
        type: Sequelize.UUID,
        field: 'member_id',
        reference: {
          model: 'Member',
          key: 'id',
          as: 'memberId'
        }
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
    return queryInterface.dropTable('Reviews');
  }
};
