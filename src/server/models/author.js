'use strict';

export default (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: DataTypes.STRING
  }, {
    underscored: true
  });
  Author.associate = (models) => {
    // associations can be defined here
  };
  return Author;
};
