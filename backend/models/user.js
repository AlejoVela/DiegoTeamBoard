const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: 'role' },
  date: { type: Date, default: Date.now() },
  dbStatus: { type: Boolean, default: true },
});

userSchema.methods.generateJWT = function () {
  return jwt.sign({
    _id: this._id,
    name: this.name,
    roleId: this.roleId,
    iat: moment().unix(),
  },
    process.env.SECRET_KEYWORD
  );
};

const user = mongoose.model( 'user', userSchema );
module.exports = user;