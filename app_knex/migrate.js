const knex = require('knex')(require('./knexfile')['development']);

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
      const hasUserIdColumn = await knex.schema.hasColumn('auth', 'user_id');
      if (!hasUserIdColumn) {
        await knex.schema.table('auth', table => {
          table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        });
        console.log('La colonne "user_id" a été ajoutée à la table "auth".');
      } else {
        console.log('La table "auth" existe déjà avec la colonne "user_id".');
      }
    }
  } catch (error) {
    console.error('Erreur lors de la création des tables :', error);
  } finally {
    await knex.destroy();
  }
}

createTables();
