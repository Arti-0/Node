const knex = require('knex')(require('./knexfile')['development']);

module.exports = {
  createAuth: async (userId, date) => {
    const [auth] = await knex('auth').insert({ user_id: userId, date }).returning('*');
    return auth;
  },

  deleteAuth: async (authId) => {
    return await knex('auth').where({ authId: authId }).del();
  }
};
