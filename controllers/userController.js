const User = require('../models/user');

exports.create = async (req, res) => {
  const { name, email } = req.body;
  await User.create(name, email);
  res.redirect('/tasks');
};
