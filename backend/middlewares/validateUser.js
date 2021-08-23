const User = require('../models/User');
const mongoose = require('mongoose');

const user = async (req, res, next) => {
  let validId = mongoose.Types.ObjectId.isValid(req.user._id);
  if(validId) return res.status(400).send('Process Failed: Invalid Token');

  let user = await User.findById(req.user._id);

  if(!user) return res.status(400).send('Process Failed: User doesnt exist');
  next()
};

module.exports  = user;
