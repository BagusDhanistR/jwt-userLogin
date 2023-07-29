'use strict';
const {
  Model
} = require('sequelize');
const {hashedPass} = require("../helper/hashPass")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        notNull: {
          msg: 'Nama tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Nama tidak boleh kosong'
        },
        len: {
          args: [4, 50],
          msg: "Nama tidak boleh lebih dari 50 huruf dan kurang dari 40 huruf"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        notNull: {
          msg: 'Password tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Password tidak boleh kosong'
        },
        len: {
          args: [4, 30],
          msg: "Password tidak boleh lebih dari 30 huruf dan kurang dari 4 huruf"
        }
      }
    },
    email: {
      allowNull: false,
      notEmpty: true,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Email tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Email tidak boleh kosong'
        },
        isEmail: {
          msg: "Format Email tidak sesuai"
        },
        len: {
          args: [4, 50],
          msg: "Email tidak boleh lebih dari 50 huruf dan kurang dari 4 huruf"
        },
        isUnique: function (value, next) {
          User.findOne({where: {email: value}})
          .then((user) => {
            if(user == null) return next()
            else return next("Email sudah terdaftar")
          }).catch((err) => {
            return next()
          });
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (user, options) => {
        user.password = hashedPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};