const knex = require('knex')(require('../utils/knexfile')['development']);

async function createTables() {
  try {
    const userTableExists = await knex.schema.hasTable('users');
    if (!userTableExists) {
      await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
      });
      console.log('La table "users" a été créée avec succès.');
    } else {
      console.log('La table "users" existe déjà.');
    }

    const authTableExists = await knex.schema.hasTable('auth');
    if (!authTableExists) {
      await knex.schema.createTable('auth', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.timestamp('date');
      });
      console.log('La table "auth" a été créée avec succès.');
    } else {
      console.log('La table "auth" existe déjà.');
    }

    const contentTableExists = await knex.schema.hasTable('contents');
    if (!contentTableExists) {
      await knex.schema.createTable('contents', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.timestamp('date').notNullable();
      });
      console.log('La table "contents" a été créée avec succès.');
    } else {
      console.log('La table "contents" existe déjà.');
    }

    const reactionTableExists = await knex.schema.hasTable('reactions');
    if (!reactionTableExists) {
      await knex.schema.createTable('reactions', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('content_id').unsigned().notNullable().references('id').inTable('contents').onDelete('CASCADE');
        table.string('comment');
        table.boolean('like').defaultTo(false);
        table.timestamp('date').notNullable();
      });
      console.log('La table "reactions" a été créée avec succès.');
    } else {
      console.log('La table "reactions" existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création des tables :', error);
  } finally {
    await knex.destroy();
  }
}

createTables();
