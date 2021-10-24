const knex = require("../db/connection");

async function list(is_showing) {
  return knex("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if(is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movieId) {
  return knex("movies")
    .where({ movie_id: movieId })
    .first();
}

module.exports = {
  list,
  read,
};