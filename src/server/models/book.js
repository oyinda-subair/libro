'use strict';

export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    isbn: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING
    },
    numberOfPages: {
      type: DataTypes.INTEGER,
      field: 'number_of_pages'
    },
    imageUrl: {
      type: DataTypes.STRING,
      field: 'image_url'
    },
    edition: {
      type: DataTypes.STRING
    },
    abstract: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorId: {
      type: DataTypes.UUID,
      field: 'author_id',
      onDelete: 'CASCADE',
      reference: {
        model: 'Author',
        key: 'id'
      }
    },
    publicationDate: DataTypes.DATE,
    field: 'publication_date'
  }, {
    underscored: true,
    indexes: [{ fields: ['name', 'isbn'] }]
  });
  Book.associate = (models) => {
    // associations can be defined here
    Book.hasMany(models.Review, {
      foreignKey: 'bookId',
      as: 'reviews'
    });

    // Book.belongsToMany(models.Author, {
    //   as: 'authors',
    //   through: [models.BookAuthor],
    //   foreignKey: 'bookId',
    //   otherKey: 'authorId'
    // })

    // Book.belongsToMany(models.Genre, {
    //   as: 'genres',
    //   through: [models.BookGenre],
    //   foreignKey: 'bookId',
    //   otherKey: 'genreId'
    // })
  };
  return Book;
};
