'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { // eslint-disable-line arrow-body-style
    return queryInterface.createTable('BookGenres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      genreId: {
        type: Sequelize.UUID,
        field: 'genre_id',
        onDelete: 'CASCADE',
        reference: {
          model: 'Genre',
          key: 'id'
        }
      },
      bookId: {
        type: Sequelize.UUID,
        field: 'book_id',
        onDelete: 'CASCADE',
        reference: {
          model: 'Book',
          key: 'id'
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
    return queryInterface.dropTable('BookGenres');
  }
};
