import { PrismaClient } from '@prisma/client';

// create dummy data
async function movie_dummy() {
    const movies = [];

    let movie = prisma.movie.create({
        data: {
            name: 'Dune: Part Two',
            release: 2024,
            image: 'https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UY4096_.jpg',
            director: 'Denis Villeneuve',
            description:
                'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
        },
    });
    movies.push(movie);

    movie = prisma.movie.create({
        data: {
            name: 'Dune',
            release: 2021,
            image: 'https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UY2552_.jpg',
            director: 'Denis Villeneuve',
            description:
                "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
        },
    });
    movies.push(movie);

    movie = prisma.movie.create({
        data: {
            name: 'Rebel Moon - Part One: A Child of Fire',
            release: 2023,
        },
    });
    movies.push(movie);

    return Promise.all(movies);
}

async function review_dummy() {
    const reviews = [];

    let review = await prisma.review.create({
        data: {
            text: "This movie more than accomplished all of the promises it set out, absolutely mesmerizing experience. I loved the first movie and thought it would be an impossibly difficult task to surpass it, but Denis Villeneuve has once again proven himself as the most promising sci-fi director of this age. I find that this installment of the series picks up its pace quickly and reaches its peak near the end of the film. Contrary to the first film where most of the action was packed into the middle. Dune: Part Two displays a more relaxed tone from the start to the middle of the movie, however the mood shifts to match the occasion and finally leaves you somewhat distraught as the consequences of the character's choices surely lead to a path they cannot return from. The cinematography by Greig Fraser is once again fantastic the mixture of his naturalistic style and the sci-fi genre leads to a grounded universe while still retaining the wonderous and whimsical aspects of science fiction, each decision on how planets and characters are portrayed demonstrates the care and attention paid to how audiences interpret them, you understand the Harkonnen, the Emperor, the Fremen, the Bene Gesserit and the remnants of house Atreides in one look at the way they are shown. The score is once again sublime, Hans Zimmer once again proves himself as the definitive motion picture composer, his ability to craft larger-than-life scores with his ability to understand the differences between each character and culture present in this film is nothing short of perfection, recurring themes and motifs are present throughout the movie and paired with the visuals and the performances, which are also incredible, form a modern day masterpiece crafted meticulously by masters of their respective fields. Rebecca Ferguson, Timothée Chalamet, Javier Bardem, Austin Butler and Zendaya give wonderful performances, with the first three being standouts. Overall this movie deserves the universal praise it has received and might just interest those who didn't even enjoy the first installment of the series.",
            headline: 'Denis Villeneuve Promises and Delivers',
            author: 'guslopes-75373',
            rating: 10,
            movie_id: 1,
        },
    });
    reviews.push(review);

    review = await prisma.review.create({
        data: {
            text: 'Well, after reading some of the reviews I sort of braced for impact. But it was not as bad as I expacted. True, the acting is well... lets say errr... below par. But so was the acting in the first Starwars movies to be honest. The graphics where above par, way beyond to my surprise. Does this make up for the not-thrar-good acting? Nope. But it eases the pain. Do I care that it has a lot in common with the original, with Starwars? Hmmm... a bit, bit not so much that I bothered to be honest. This movie is good enough on its own. Give it a chance and watch it without your mind made up already. You might end up liking it.',
            headline: 'Well...',
            author: 'meelaleks',
            rating: 7,
            movie_id: 3,
        },
    });
    reviews.push(review);

    review = await prisma.review.create({
        data: {
            text: "I'm a long time fan of the dune universe. Have read all the books multiple times and of course I've seen Lynch's version. This version is a lot better. Excellent world building, visually stunning and full of star power. It moves slow, which on the plus side gives it the chance to go into detail, but on the negative side means by the end it's not even at the halfway point of the first book. So it ends at the moment the mythology is just picking up. Which made me leave the cinema wishing to see part two, which unfortunately they haven't even started filming. So IMHO the reviews giving this movie a 10 or calling it the movie of the year are overly positive. It's a visually stunning start to a potentially mind blowing universe, but mainly an introduction to that universe. Maybe when the story is finished (wouldn't surprise me if they need three movies for the first book) it will be mind blowing and perfect, but for now this movie is a great introduction to the duneverse. Good, but not great. Yet.",
            headline: 'Visually stunning but mostly about setting the stage',
            author: 'Byron-15',
            rating: 8,
            movie_id: 2,
        },
    });
    reviews.push(review);

    review = await prisma.review.create({
        data: {
            text: `This is the kind of movie that is impossible to do justice, just by talking about it! It is the kind of experience you had once.. but you never thought you would get again.. until this movie proves you WRONG!! 
            
            This movie takes the aspects of the first movie and improves upon them in almost every way possible, already writing itself into the books of greatest sequels of ALL TIME!! 
            
            Everything in this movie was TOP notch! Dennis Villeneauve proves why he is not only a master of Sci-Fi movies, but just filmmaking in general! This was a demonstration of power, in what you can achieve with filmmaking! 

            I beg you to watch this on the biggest and best screen you can find! This will be an experience that will stick with you forever! 

            I thought the real Blockbuster was dead.. but I was wrong! This is the cinematic experience i craved!

            Now I am gonna watch this movie again, and maybe again! Then I am gonna read the books!`,
            headline: 'Ladies and gentleman.. the PEAK of filmmaking!!',
            author: 'and_mikkelsen',
            rating: 10,
            movie_id: 1,
        },
    });
    reviews.push(review);

    review = await prisma.review.create({
        data: {
            text: `The biggest problem of the movie is the plot. It is just bad. And not just the main storyline which makes little sense and the villains are comedic, but almost every interaction ends up with the viewer asking "but, why?" or "how does it even make sense?".

            The assembly of heroes (what the movie is about) is also rushed as hell, and the motivation of the people to join is straight-up nonexistent in most of the cases and is simply skipped entirely.
            
            As for the villain who comes to find mysterious troubling rebels, apparently every single person knows who are the rebels and how to find them and shares that information to the first stranger they meet. It's not like they are even hiding.
            
            Next, combat and action scenes. Blasters that penetrate people in armor through, but can't penetrate a thin piece of wood. Remember when in the new Star Wars trilogy a red guard could strike Ray but was just making dumb random moves to simulate action? Well, it's absolutely the same here. Maximum drama, lots of slow motion, frequent switch of the scenes every few seconds and very little sense.
            
            The acting is ok, but it's difficult to judge the actors if they do good because the script tells them to follow an unnatural character arc in the first place. I'd say Sofia played Kora well, but Kora is just a poor character which is out of place in the very story she's central.
            
            It's not all bad. The picture is nice.
            
            I'd say it's the most disappointing Snyder's movie so far.`,
            headline: 'The rating is objective',
            author: 'Dimakovtun',
            rating: 5,
            movie_id: 3,
        },
    });
    reviews.push(review);
}

async function mock_db() {
    await movie_dummy();
    review_dummy();
}

const prisma = new PrismaClient();
mock_db();
