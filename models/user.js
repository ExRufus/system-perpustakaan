const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

'use strict';
const {
  Model
} = require('sequelize');
const SECRETTOKEN = require("../libs/secret");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role"
      })
    }

     /**
     * function for encrypt password
     * @param {password} password 
     * @returns 
     */
     static #encript = (password) => bcrypt.hashSync(password, 10);

     /**
      * function fo registration
      * @param { email, password} 
      * @returns 
      */
     static registration = async ({  email, password }) => {
       const passwordHash = this.#encript(password);
       return await this.create({
          email, password : passwordHash, role_id: 2
       });
     }
 
     static checkPassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);

     static generateTokenV2 = async ({id, email}) => {
      const payload = {
        id: id,
        username: email
      }
      return jwt.sign(payload, SECRETTOKEN)
     }

     static authenticateToken = async ({email, password}) => {
      try {
        const user = await this.findOne ({
          where: { email}
        });
  
        if (!user) return Promise.reject("User tidak terdaftar");
          
        const isPasswordValid = this.checkPassword(password, user.password);
        if (!isPasswordValid) return Promise.reject("Password tidak sesuai!;")
        
        return Promise.resolve(user)
      } catch (error) {
        return Promise.reject(error)
      }
     
    }
   }
  
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};