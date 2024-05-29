const knex = require('knex')(require('../utils/knexfile')['development']);

module.exports = {
  createAuth: async (userId, date) => {
    const [auth] = await knex('auth').insert({ user_id: userId, date }).returning('*');
    return auth;
  },
  deleteAuth: async (id) => {
    return await knex('auth').where({ id }).del();
  },
  getAuth: async (id) => {
    return await knex('auth').where({ id }).first();
  }
};
