const User = require("../models/user");
const Role = require("../models/role")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Error: There'r empty fields");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("Error: User already exist");

  let role = await Role.findOne({ name: "user" });
  if (!role) return res.status(400).send("Error: No role was assigned");

  let hash = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Error: Error to register User");
  try {
    let jwToken = user.generateJWT();
    return res.status(200).send({ jwToken });
  } catch (e) {
    return res.status(400).send("Error: Error to generate token");
  }
};
const createAdmin = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(400).send("Error: There'r empty fields");

  let validId = await mongoose.Types.ObjectId.isValid(req.body.roleId);
  if (!validId) return res.status(400).send("Error: Invalid Role ID");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("Error: User already exist");

  let hash = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Error: Error to register User");
  try {
    let jwToken = user.generateJWT();
    return res.status(200).send({ jwToken });
  } catch (e) {
    return res.status(400).send("Error: Error to generate token");
  }
};

const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Wrong email or password");

  if (!user.dbStatus) return res.status(400).send("Wrong email or password");

  let hash = await bcrypt.compare(req.body.password, user.password);
  if (!hash) return res.status(400).send("Wrong email or password");

  try {
    let jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login Error");
  }
};
const listUser = async (req, res) => {
  let users = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("roleId")
    .exec();
  if(!users || users.length === 0) return res.status(400).send('No search results');
  return res.status(200).send({ users });
};
const updateUser = async (req, res) => {
  if(!req.body._id || !req.body.name || !req.body.email || !req.body.roleId)
    return res.status(400).sebd("Error: There'r empty fields");
  let pass = "";

  if(req.body.password){
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    let userFind = await User.findOne({ email: req.body.email });
    pass = userFind.password;
  }

  let user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
  });

  if(!user) return res.status(400).send('Error updating user');
  return res.status(200).send({ user });
};
const deleteUser = async (req, res) => {
  if(!req.body._id) return res.status(400).send("Error: There are empty fields");
  let user = await User.findByIdAndUpdate(!req.body._id, {
    dbStatus: false,
  });
  if(!user) return res.status(400).send('Error: Error to delete user');
  return res.status(200).send({ user })
};

module.exports = {
  createUser,
  listUser,
  updateUser,
  deleteUser,
  login,
  createAdmin,
};
