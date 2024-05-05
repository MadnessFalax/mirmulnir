import express from 'express';
import { Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

class Review {
    constructor(text, headline, rating, movie_id, author = '') {
        this.text = text;
        this.headline = headline;
        this.rating = rating;
        this.movie_id = movie_id;
        this.author = author;
    }
}

const id_regex = RegExp('^[0-9]+$');

const headline_regex = RegExp("^[a-zA-Z'0-9 ,-:!?]+$");

const author_regex = RegExp('^[a-zA-Z. 0-9-_]+$');

const rating_regex = RegExp('^[0-9]{1}$|^10$');

// done
router.get('/browse', async (req, res) => {
    try {
        const reviews = await prisma.review.findMany();
        res.status(200).json(reviews);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(e);
    }
});

// done
router.get('/browse/query', async (req, res) => {
    try {
        const req_text = req.query.text;
        const req_headline = req.query.headline;
        const req_author = req.query.author;
        const req_rating = req.query.rating;
        const req_movie_id = req.query.movie_id;

        let query = {};

        if (req_headline) {
            if (!headline_regex.test(req_headline)) {
                res.status(400).json('Invalid headline form');
                return;
            } else {
                query.headline = {};
                query.headline.contains = req_headline;
            }
        }

        if (req_author) {
            if (!author_regex.test(req_author)) {
                res.status(400).json('Invalid author form');
                return;
            } else {
                query.author = {};
                query.author.contains = req_author;
            }
        }

        if (req_rating) {
            if (!rating_regex.test(req_rating)) {
                res.status(400).json('Invalid rating form');
                return;
            } else {
                query.rating = parseInt(req_rating);
            }
        }

        if (req_movie_id) {
            if (!movie_id_regex.test(req_movie_id)) {
                res.status(400).json('Invalid movie_id form');
                return;
            } else {
                query.movie_id = parseInt(req_movie_id);
            }
        }

        if (req_text) {
            query.text = {};
            query.text.contains = req_text;
        }

        const reviews = await prisma.movie.findMany({
            where: query,
        });
        res.status(200).json(reviews);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(e);
    }
});

// done
router.get('/browse/:id', async (req, res) => {
    try {
        const review = await prisma.review.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (review) {
            res.status(200).json(review);
        } else {
            res.status(400).json('Review Not Found');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Database Error' });
    }
});

// done
router.post('/create', express.json(), async (req, res) => {
    try {
        const {
            text: req_text,
            headline: req_headline,
            author: req_author,
            rating: req_rating,
            movie_id: req_movie_id,
        } = req.body;
        console.log('funguje');

        if (!req_text) {
            res.status(400).json('Missing mandatory query');
            return;
        }

        if (req_headline) {
            if (!headline_regex.test(req_headline)) {
                res.status(400).json('Invalid headline form');
                return;
            }
        } else {
            res.status(400).json('Missing mandatory query');
            return;
        }

        if (req_author) {
            if (!author_regex.test(req_author)) {
                res.status(400).json('Invalid author form');
                return;
            }
        }

        if (req_rating) {
            if (!rating_regex.test(req_rating)) {
                res.status(400).json('Invalid rating form');
                return;
            }
        } else {
            res.status(400).json('Missing mandatory query');
            return;
        }

        if (req_movie_id) {
            if (!id_regex.test(req_movie_id)) {
                res.status(400).json('Invalid movie_id form');
                return;
            }
        } else {
            res.status(400).json('Missing mandatory query');
            return;
        }

        let review = new Review(
            req_text,
            req_headline,
            parseInt(req_rating),
            parseInt(req_movie_id),
            req_author,
        );
        review = await prisma.review.create({
            data: {
                text: review.text,
                headline: review.headline,
                author: review.author,
                rating: review.rating,
                movie_id: review.movie_id,
            },
        });
        res.status(200).json(['Review inserted succesfully', review]);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// done
router.get('/delete/:id', async (req, res) => {
    try {
        let req_id = parseInt(req.params.id);

        if (!id_regex.test(req_id)) {
            res.status(400).json('Invalid id form');
            return;
        }

        if (
            (await prisma.review.findUnique({
                where: {
                    id: parseInt(req_id),
                },
            })) == undefined
        ) {
            res.status(404).json("Review doesn't exist");
            return;
        }

        await prisma.review.delete({
            where: {
                id: parseInt(req_id),
            },
        });
        res.status(200).json('Review deleted succesfully');
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Database Error' });
    }
});

// done
router.get('/update/:id', async (req, res) => {
    try {
        const req_id = req.params.id;
        const req_text = req.query.text;
        const req_headline = req.query.headline;
        // author change is forbidden
        const req_author = req.query.author;
        const req_rating = req.query.rating;
        // movie_id change is forbidden
        const req_movie_id = req.query.movie_id;

        if (req_movie_id) {
            res.status(400).json('movie_id change is prohibited');
            return;
        }

        if (req_author) {
            res.status(400).json('author change is prohibited');
            return;
        }

        const text_change = !(req_text === undefined);
        const headline_change = !(req_headline === undefined);
        const rating_change = !(req_rating === undefined);

        if (req_id) {
            if (!id_regex.test(req_id)) {
                res.status(400).json('Invalid id form');
                return;
            }
        } else {
            res.status(400).json('Missing mandatory query');
            return;
        }

        if (req_headline) {
            if (!headline_regex.test(req_headline)) {
                res.status(400).json('Invalid headline form');
                return;
            }
        }

        if (req_rating) {
            if (!rating_regex.test(req_rating)) {
                res.status(400).json('Invalid rating form');
                return;
            }
        }

        let tmp_review = {};

        if (
            (tmp_review = await prisma.review.findUnique({
                where: {
                    id: parseInt(req_id),
                },
            })) == undefined
        ) {
            res.status(404).json("Review doesn't exist");
            return;
        }

        if (text_change) {
            tmp_review.text = req_text;
        }
        if (headline_change) {
            tmp_review.headline = req_headline;
        }
        if (rating_change) {
            tmp_review.rating = parseInt(req_rating);
        }

        tmp_review = await prisma.review.update({
            where: {
                id: parseInt(req_id),
            },
            data: tmp_review,
        });
        res.status(200).json(['Review updated succesfully', tmp_review]);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { router };
