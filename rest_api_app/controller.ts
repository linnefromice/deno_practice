// Interface
interface Movie {
    id: number;
    title: string;
    rating: number;
}

// data
let movies: Array<Movie> = [
    {
        id: 1,
        title: "Iron Man",
        rating: 10,
    },
    {
        id: 2,
        title: "Incredible Hulk",
        rating: 8
    },
    {
        id: 3,
        title: "Iron Man 2",
        rating: 9
    },
    {
        id: 4,
        title: "Thor",
        rating: 8
    },
    {
        id: 5,
        title: "Captain America: The First Avenger",
        rating: 9
    }
];

// api
const getMovies = ({ response }: { response: any }) => {
    response.body = movies;
};

const getMovie = ({ params, response } : {
    params: { id: string },
    response: any,
}) => {
    const movie = movies.filter((movie) => movie.id.toString() == params.id)[0];
    console.log(movie);
    if (movie) {
        response.status = 200;
        response.body = movie;
    } else {
        response.status = 404;
        response.body = { message: "404 Not found" };
    }
};
const createMovie = async ({
    request,
    response,
} : {
    request: any,
    response: any,
}) => {
    const body = await request.body();
    const movie: Movie = body.value;
    movies.push(movie);
    response.body = { success: true, data: movie };
    response.status = 201;
};

const updateMovie = async ({
    params,
    request,
    response,
} : {
    params: { id: string },
    request: any,
    response: any,
}) => {
    const movie = movies.filter((movie) => movie.id.toString() == params.id)[0];
    if (movie) {
        const body = await request.body();
        movie.title = body.value.title;
        movie.rating = body.value.rating;
        response.body = {
            success: true,
            data: movies,
        };
    } else {
        response.status = 404;
        response.body = {
            success: false,
            message: "Movie not found",
        };
    }
};

export { getMovies, getMovie, createMovie, updateMovie };
