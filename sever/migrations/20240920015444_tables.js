/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return (
    knex.schema
      // Create users table
      .createTable('users', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('role').notNullable();
        table.boolean('active').defaultTo(true);
        table.string('photo');
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
          .timestamp('updated_at')
          .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      })

      // Create camps table
      .createTable('camps', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.double('lat').notNullable();
        table.double('lng').notNullable();
        table.string('address').notNullable();
        table.decimal('ratingsAverage', 3, 2);
        table.integer('ratingsQuantity');
        table.integer('maxGroupSize');
        table.decimal('price', 10, 2);
        table.string('difficulty');
        table.text('summary').notNullable();
        table.text('description').notNullable();
        table.string('imageCover');
        table.json('images');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
          .timestamp('updated_at')
          .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      })

      // Create reviews table
      .createTable('reviews', (table) => {
        table.string('id').primary();
        table.text('review');
        table.decimal('rating', 2, 1).notNullable().defaultTo(0);
        table
          .string('user_id')
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .string('camp_id')
          .references('id')
          .inTable('camps')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.integer('likes').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
          .timestamp('updated_at')
          .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      })

      // Create gears table
      .createTable('gears', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.enu('have', ['yes', 'no']).notNullable();
        table.string('category');
        table.json('usersid');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
          .timestamp('updated_at')
          .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      })
  );
}

export function down(knex) {
  return knex.schema
    .dropTable('gears')
    .dropTable('reviews')
    .dropTable('camps')
    .dropTable('users');
}
