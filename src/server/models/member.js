'use strict';

import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      field: 'last_name'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {
    underscored: true,
    indexes: [{ fields: ['username', 'email', 'roles'] }],
    hooks: {
      beforeCreate: (member) => {
        const salt = bcrypt.genSaltSync();
        const user = member;
        user.password = bcrypt.hashSync(member.password, salt);
      }
    },
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password)
      }
    }
  });
  Member.associate = (models) => {
    // associations can be defined here

    Member.hasMany(models.Review, {
      foreignKey: 'memberId',
      as: 'reviews'
    });
  };
  return Member;
};
