'use strict';

export default (sequelize, DataTypes) => {
  const BookGenre = sequelize.define('BookGenre', {
    genreId: {
      type: DataTypes.UUID,
      field: 'genre_id'
    },
    bookId: DataTypes.UUID,
    field: 'book_id'
  }, {
    underscored: true,
    indexes: [{ fields: ['genreId', 'bookId'] }]
  });
  BookGenre.associate = (models) => {
    // associations can be defined here
  };
  return BookGenre;
};
