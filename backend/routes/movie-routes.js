import express from 'express';
import { addMovie, getAllMovies, getMovieById, deleteMovie } from '../controllers/movie-controller.js';

const movieRouter = express.Router();

movieRouter.post("/", addMovie);
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;