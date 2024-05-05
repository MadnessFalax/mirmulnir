import express from 'express';
import { Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

class Movie {
    constructor(
        name,
        release,
        image = null,
        director = null,
        description = null,
    ) {
        this.name = name;
        this.release = release;
        this.image = image;
        this.director = director;
        this.description = description;
    }
}

const id_regex = RegExp('^[0-9]+$');

const name_regex = RegExp("^[a-zA-Z'0-9 ,-:!?]+$");

const release_regex = RegExp('^[0-9]{4}$');

const director_regex = RegExp('^[a-zA-Z. ]+$');

// done
router.get('/browse', async (req, res) => {
    try {
        const movies = await prisma.movie.findMany();
        res.status(200).json(movies);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(e);
    }
});

// done
router.get('/browse/query', async (req, res) => {
    try {
        const req_name = req.query.name;
        const req_release = req.query.release;
        // query by image is not implemented as it doesn't seem any useful
        const req_image = req.query.image;
        const req_director = req.query.director;
        const req_description = req.query.description;

        let query = {};

        if (req_name) {
            if (!name_regex.test(req_name)) {
                res.status(400).json('Invalid name form');
                return;
            } else {
                query.name = {};
                query.name.contains = req_name;
            }
        }

        if (req_release) {
            if (!release_regex.test(req_release)) {
                res.status(400).json('Invalid release year form');
                return;
            } else {
                query.release = parseInt(req_release);
            }
        }

        if (req_director) {
            if (!director_regex.test(req_director)) {
                res.status(400).json('Invalid director name form');
                return;
            } else {
                query.director = {};
                query.director.contains = req_director;
            }
        }

        if (req_description) {
            query.description = {};
            query.description.contains = req_description;
        }

        const movies = await prisma.movie.findMany({
            where: query,
        });
        res.status(200).json(movies);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(e);
    }
});

router.get('/browse/:id/rating', async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                movie_id: parseInt(req.params.id),
            },
        });

        if (reviews) {
            let sum = 0;
            let count = 0;
            for (let review of reviews) {
                count += 1;
                sum += review.rating;
            }

            if (count == 0) {
                res.status(200).json(0);
            } else {
                res.status(200).json(sum / count);
            }
        } else {
            res.status(400).json('Review Not Found');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Database Error' });
    }
});

// done
router.get('/browse/:id', async (req, res) => {
    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(400).json('Movie Not Found');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Database Error' });
    }
});

// done
router.get('/browse/:id/reviews', async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                movie_id: parseInt(req.params.id),
            },
        });

        if (reviews) {
            res.status(200).json(reviews);
        } else {
            res.status(400).json('Review Not Found');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Database Error' });
    }
});

// done
router.get('/create', async (req, res) => {
    /*  tested on: 
    localhost:3000/movie/create?name=Dune&release=2021&image=https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UY2552_.jpg&director=Denis Villeneuve&description=A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future. 
    localhost:3000/movie/create?name=Rebel Moon - Part One: A Child of Fire&release=2023
*/
    try {
        const req_name = req.query.name;
        const req_release = req.query.release;
        const req_image = req.query.image;
        const req_director = req.query.director;
        const req_description = req.query.description;

        if (req_name) {
            if (!name_regex.test(req_name)) {
                res.status(400).json('Invalid name form');
                return;
            }
        } else {
            res.status(400).json('Missing mandatory query');
            return;
        }

        if (req_release) {
            if (!release_regex.test(req_release)) {
                res.status(400).json('Invalid release year form');
                return;
            }
        } else {
            res.status(400).json('Missing mandatory query');
            return;
        }

        if (req_director) {
            if (!director_regex.test(req_director)) {
                res.status(400).json('Invalid director name form');
                return;
            }
        }

        let movie = new Movie(
            req_name,
            parseInt(req_release),
            req_image,
            req_director,
            req_description,
        );

        movie = await prisma.movie.create({
            data: {
                name: movie.name,
                release: movie.release,
                image: movie.image,
                director: movie.director,
                description: movie.description,
            },
        });
        res.status(200).json(['Movie inserted succesfully', movie]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Database Error' });
    }
});

// done
router.get('/delete/:id', async (req, res) => {
    /* deletes related reviews aswell */
    try {
        let req_id = req.params.id;

        if (!id_regex.test(req_id)) {
            res.status(400).json('Invalid id form');
            return;
        }

        if (
            (await prisma.movie.findUnique({
                where: {
                    id: parseInt(req_id),
                },
            })) == undefined
        ) {
            res.status(404).json("Movie doesn't exist");
            return;
        }

        await prisma.movie.delete({
            where: {
                id: parseInt(req_id),
            },
        });
        res.status(200).json('Movie deleted succesfully');
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Database Error' });
    }
});

router.get('/update/:id', async (req, res) => {
    try {
        const req_id = req.params.id;
        const req_name = req.query.name;
        const req_release = req.query.release;
        const req_image = req.query.image;
        const req_director = req.query.director;
        const req_description = req.query.description;

        const name_change = !(req_name === undefined);
        const release_change = !(req_release === undefined);
        const image_change = !(req_image === undefined);
        const director_change = !(req_director === undefined);
        const description_change = !(req_description === undefined);

        if (req_id) {
            if (!id_regex.test(req_id)) {
                res.status(400).json('Invalid id form');
                return;
            }
        } else {
            res.status(400).json('Missing mandatory query');
            return;
        }

        if (req_name) {
            if (!name_regex.test(req_name)) {
                res.status(400).json('Invalid name form');
                return;
            }
        }

        if (req_release) {
            if (!release_regex.test(req_release)) {
                res.status(400).json('Invalid release year form');
                return;
            }
        }

        if (req_director) {
            if (!director_regex.test(req_director)) {
                res.status(400).json('Invalid director name form');
                return;
            }
        }

        let tmp_movie = {};

        if (
            (tmp_movie = await prisma.movie.findUnique({
                where: {
                    id: parseInt(req_id),
                },
            })) == undefined
        ) {
            res.status(404).json("Movie doesn't exist");
            return;
        }

        if (name_change) {
            tmp_movie.name = req_name;
        }
        if (release_change) {
            tmp_movie.release = praseInt(req_release);
        }
        if (image_change) {
            tmp_movie.image = req_image;
        }
        if (director_change) {
            tmp_movie.director = req_director;
        }
        if (description_change) {
            tmp_movie.description = req_description;
        }

        tmp_movie = await prisma.movie.update({
            where: {
                id: parseInt(req_id),
            },
            data: tmp_movie,
        });
        res.status(200).json(['Movie updated succesfully', tmp_movie]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Database Error' });
    }
});

export { router };
