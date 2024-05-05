import {
    Typography,
    Card,
    CardHeader,
    Paper,
    Container,
    CardMedia,
    CardContent,
    Link,
    Button,
    TextField,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';
import { useLoaderData, Link as ReactLink } from 'react-router-dom';

export function loader() {
    return fetch('http://localhost:3001/movie/browse').then((res) => res.json());
}

export function query_loader({ params }) {
    return fetch(`http://localhost:3001/movie/browse/query?name=${params.movie_name}`).then((res) => res.json());
}

export function Movies() {
    const [textContent, setTextContent] = useState('');
    const data = useLoaderData();
    const tiles_container = [];

    console.log(data);

    for (let movie of data) {
        tiles_container.push(
            <Grid2 xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
                <MovieCard name={movie.name} image={movie.image} id={movie.id}></MovieCard>
            </Grid2>,
        );
    }

    return (
        <Card variant="outlined">
            <Grid2 container margin={1}>
                <Grid2 xs={12} md={6}>
                    <Typography variant="h3">Browse Movies</Typography>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <Container sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <Link component={ReactLink} to={`/movies/search/${textContent}`} sx={{ display: 'flex' }}>
                            <Button variant="contained">Search</Button>
                        </Link>
                        <TextField
                            label="Search title"
                            variant="outlined"
                            onChange={(event) => {
                                setTextContent(event.target.value);
                            }}
                        ></TextField>
                    </Container>
                </Grid2>
            </Grid2>
            <Grid2 container>{tiles_container}</Grid2>
        </Card>
    );
}

function MovieCard(props) {
    console.log(props.image);

    return (
        <Card sx={{ margin: 1, display: 'flex', justifyContent: 'space-between', flexDirection: 'column-reverse' }}>
            <Link component={ReactLink} to={`/movies/${props.id}`}>
                <CardMedia
                    image={props.image === null ? '/error-image-generic.png' : props.image}
                    component="img"
                ></CardMedia>
                <CardContent>
                    <Typography variant="h5">{props.name}</Typography>
                </CardContent>
            </Link>
        </Card>
    );
}
