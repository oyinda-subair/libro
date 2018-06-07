'use strict';

import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {
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
  };
  return Member;
};
