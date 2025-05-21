const Task = require('../models/task');
const User = require('../models/user');

exports.index = async (req, res) => {
  const tasks = await Task.findAll();
  const users = await User.findAll();
  res.render('tasks/index', { tasks, users });
};

exports.store = async (req, res) => {
  await Task.create(req.body);
  res.redirect('/tasks');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Task.update(id, req.body);
  res.redirect('/tasks');
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Task.delete(id);
  res.redirect('/tasks');
};

exports.byUser = async (req, res) => {
  const { user_id } = req.params;
  const tasks = await Task.findByUser(user_id);
  res.json(tasks);
};
