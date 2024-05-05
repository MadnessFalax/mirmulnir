import React, { useState } from 'react';
import { Typography, Card, Stack, Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useLoaderData } from 'react-router-dom';
import ReviewForm from './ReviewForm';

export function loader({ params }) {
    const reviews = fetch(`http://localhost:3001/movie/browse/${params.movie_id}/reviews`).then((res) => res.json());
    const movie = fetch(`http://localhost:3001/movie/browse/${params.movie_id}`).then((res) => res.json());
    return Promise.all([reviews, movie]);
}

export function Reviews(props) {
    const data = useLoaderData();
    const review_list = [];
    const [reviews, setReviews] = useState(data[0]);

    // Funkce pro načítání recenzí
    const fetchReviews = async () => {
        const response = await fetch(`http://localhost:3001/movie/browse/${data[1].id}/reviews`);
        const newData = await response.json();
        setReviews(newData);
    };
    console.log(data);

    for (let review of reviews) {
        review_list.push(<Review data={review}></Review>);
    }

    return (
        <Card variant="outlined">
            <Container sx={{ margin: 1 }}>
                <Typography variant="h3">{data[1].name}</Typography>
                <ReviewForm movieId={data[1].id} onReviewSubmitted={fetchReviews} />
                <Typography variant="h4">Movie Reviews</Typography>
                <Stack spacing={2} margin={1}>
                    {review_list.reverse()}
                </Stack>
            </Container>
        </Card>
    );
}

function Review(props) {
    return (
        <Card variant="outlined">
            <Grid2 container margin={2}>
                <Grid2 xs={12} sm={9}>
                    <Typography variant="h5">{props.data.headline}</Typography>
                </Grid2>
                <Grid2 xs={12} sm={3}>
                    <Container sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <Typography variant="h6">{`rating: ${props.data.rating}/10`}</Typography>
                    </Container>
                </Grid2>
            </Grid2>
            <Typography variant="body1" margin={2}>
                {props.data.text}
            </Typography>
            <Typography variant="h6" margin={2}>{`Author: ${props.data.author}`}</Typography>
        </Card>
    );
}
