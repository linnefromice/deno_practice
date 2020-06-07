import { Router } from "https://deno.land/x/oak/mod.ts";
import {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
} from './controller.ts';

const router = new Router();

router
    .get("/movies", getMovies)
    .get("/movie/:id", getMovie)
    .post("/movies", createMovie)
    .put("/movie/:id", updateMovie);

export default router;