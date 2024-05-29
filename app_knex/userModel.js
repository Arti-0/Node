const knex = require('knex')(require('./knexfile')['development']);

module.exports = {
  getAllUsers: async () => {
    return await knex.select().from('users');
  },

  getUserById: async (id) => {
    return await knex('users').where({ id }).first();
  },

  getUserByEmail: async (email) => {
    return await knex('users').where({ email }).first();
  },

  createUser: async (email, password) => {
    await knex('users').insert({ email, password });
  },

  updateUser: async (id, newName, newEmail) => {
    return await knex('users').where({ id }).update({ name: newName, email: newEmail });
  },

  deleteUser: async (id) => {
    return await knex('users').where({ id }).del();
  }
};
