const knex = require('knex')(require('../utils/knexfile.js')['development']);

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
  },
  deleteAllFromUser: async (userId) => {
    await knex.transaction(async trx => {
      await trx('reactions').where({ user_id: userId }).del();
      await trx('contents').where({ user_id: userId }).del();
      await trx('auth').where({ user_id: userId }).del();
      await trx('users').where({ id: userId }).del();
    });
  }
};
