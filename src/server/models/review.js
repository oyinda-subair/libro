'use strict';

export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    ratings: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.TEXT
    }
  }, {
    underscored: true,
    indexes: [{ fields: ['ratings'] }]
  });
  Review.associate = (models) => {
    // associations can be defined here
    Review.belongsTo(models.Book, {
      foreignKey: 'bookId'
    });
    Review.belongsTo(models.Member, {
      foreignKey: 'memberId'
    })
  };
  return Review;
};
