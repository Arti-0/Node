const knex = require('knex')(require('../utils/knexfile')['development']);

module.exports = {
  createContent: async (userId, date, title, description) => {
    return await knex('contents').insert({ user_id: userId, date, title, description }).returning('*');
  },
  updateContent: async (userId, contentId, title, description) => {
    return await knex('contents').where({ id: contentId, user_id: userId }).update({ title, description }).returning('*');
  },
  deleteContent: async (userId, contentId) => {
    return await knex('contents').where({ id: contentId, user_id: userId }).del();
  },
  getAllContent: async () => {
    return await knex.select().from('contents');
  },
  getContentByUserId: async (userId) => {
    return await knex('contents').where({ user_id: userId }).select();
  }
};
