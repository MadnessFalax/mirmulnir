import React, { useState } from 'react';
import { Button, TextField, Card, Typography, Container } from '@mui/material';

function ReviewForm({ movieId, onReviewSubmitted }) {
    const [headline, setHeadline] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reviewData = {
            text,
            headline,
            author,
            rating: parseInt(rating, 10),
            movie_id: movieId,
        };
        console.log(JSON.stringify(reviewData));
        try {
            const response = await fetch('http://localhost:3001/review/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Review submitted successfully');
                onReviewSubmitted();
                setAuthor('');
                setText('');
                setRating('');
                setHeadline('');
            } else {
                alert(`Failed to submit review: ${result.error}`);
            }
        } catch (error) {
            console.error('Failed to submit review', error);
            alert('Failed to submit review, please try again later.');
        }
    };

    return (
        <Card sx={{ margin: 2, padding: 2 }}>
            <Typography variant="h5">Submit a review</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Headline"
                    variant="outlined"
                    fullWidth
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Review Text"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Author"
                    variant="outlined"
                    fullWidth
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Rating (0-10)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                    inputProps={{ min: 0, max: 10 }}
                    sx={{ mt: 2 }}
                />
                <Container sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit Review
                    </Button>
                </Container>
            </form>
        </Card>
    );
}

export default ReviewForm;
