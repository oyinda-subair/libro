'use strict';

export default (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define('BookAuthor', {
    authorId: {
      type: DataTypes.UUID,
      field: 'author_id',
      allowNull: false,
      reference: {
        model: 'Author',
        key: 'id'
      }
    },
    bookId: {
      type: DataTypes.UUID,
      field: 'book_id',
      allowNull: false,
      reference: {
        model: 'Book',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    indexes: [{ fields: ['authorId', 'bookId'] }]
  });
  BookAuthor.associate = (models) => {
    // associations can be defined here
    BookAuthor.belongsTo(models.Book, {
      foreignKey: 'bookId'
    });

    BookAuthor.belongsTo(models.Author, {
      foreignKey: 'authorId'
    })
  };
  return BookAuthor;
};
