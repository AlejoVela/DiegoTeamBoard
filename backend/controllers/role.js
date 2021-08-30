const Role = require('../models/role');
const mongoose = require('mongoose');

const createRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send('Error: There are empty fields');
  let existingRole = await Role.findOne({name: req.body.name});
  if(existingRole) return res.status(400).send("Error: Role already exist");

  let role = new Role({
    name: req.body.name,
    description: req.body.description,
  });

  let result = await role.save();
  if(!result) return res.status(400).send("Error: error to register role");
  return res.status(200).send({ result });
};
const listRole = async (req, res) => {
  let role = await Role.find();
  if(!role) return res.status(400).send("Error: There aren't roles register now");
  return res.status(200).send({ role })
};
const updateRole = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if(!validId) return res.status(400).send('Error: Invalid ID');

  if(!req.body._id || !req.body.description)
    return res.status(400).send("Error: There'r empty fields");
  let role = await Role.findByIdAndUpdate(req.body._id, {
    description: req.body.description,
  });

  if(!role) return res.status(400).send("Error: error to update role");
  return res.status(200).send({ role })
}

module.exports = { createRole, listRole, updateRole };