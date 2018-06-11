'use strict';

export default (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    indexes: [{ fields: ['name'] }]
  });
  Genre.associate = (models) => {
    // associations can be defined here
    // Genre.belongsToMany(models.Book, {
    //   as: 'books',
    //   through: [models.BookAuthor],
    //   foreignKey: 'genreId',
    //   otherKey: 'bookId'
    // })
  };
  return Genre;
};
