const knex = require('knex')(require('../utils/knexfile')['development']);

module.exports = {
  createReaction: async (userId, contentId, comment, like) => {
    return await knex('reactions').insert({ user_id: userId, content_id: contentId, comment, like, date: new Date() }).returning('*');
  },
  deleteReaction: async (userId, reactionId) => {
    return await knex('reactions').where({ id: reactionId, user_id: userId }).del();
  },
  getAllReactions: async (contentId) => {
    return await knex('reactions').where({ content_id: contentId }).select();
  }
};