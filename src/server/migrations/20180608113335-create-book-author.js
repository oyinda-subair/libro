'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { // eslint-disable-line arrow-body-style
    return queryInterface.createTable('BookAuthors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      authorId: {
        type: Sequelize.UUID,
        field: 'author_id',
        // onDelete: 'CASCADE',
        reference: {
          model: 'Author',
          key: 'id',
          as: 'authorId'
        },
        indexes: true
      },
      bookId: {
        type: Sequelize.UUID,
        field: 'book_id',
        // onDelete: 'CASCADE',
        reference: {
          model: 'Book',
          foreignKey: 'book_id',
          key: 'id',
          as: 'bookId'
        },
        indexes: true
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
    return queryInterface.dropTable('BookAuthors');
  }
};
