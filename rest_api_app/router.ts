import { Router } from "https://deno.land/x/oak/mod.ts";
import {
    getMovies
} from './controller.ts';

const router = new Router();

router
    .get("/movies", getMovies);

export default router;