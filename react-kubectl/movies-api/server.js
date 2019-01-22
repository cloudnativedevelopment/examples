const express = require("express");
const app = express();
const data = {
  movies: require("./data/movie.json"),
  shows: require("./data/shows.json")
};

app.listen(3000, () => {
  app.get("/movies", (req, res, next) => {
    res.json(data.movies);
  });

  app.get("/shows", (req, res, next) => {
    res.json(data.shows);
  });

  console.log("Server running on port 3000.");
});