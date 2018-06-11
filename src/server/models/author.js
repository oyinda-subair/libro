'use strict';

export default (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    indexes: [{ fields: ['name'] }]
  });
  Author.associate = (models) => {
    // associations can be defined here

    // TODO fix belongsToMany
    // Author.belongsToMany(models.Book, {
    //   as: 'books',
    //   through: [models.BookAuthor],
    //   foreignKey: 'authorId',
    //   otherKey: 'bookId'
    // })
  };
  return Author;
};
