import { Card, CardMedia, Typography, Button, Link, Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useLoaderData, Link as ReactLink } from 'react-router-dom';

export function loader({ params }) {
    let movie = fetch(`http://localhost:3001/movie/browse/${params.movie_id}`).then((res) => res.json());
    let rating = fetch(`http://localhost:3001/movie/browse/${params.movie_id}/rating`).then((res) => res.json());

    return Promise.all([movie, rating]);
}

export function MovieCard() {
    const all_data = useLoaderData();
    const data = all_data[0];
    const rating = all_data[1];

    let img_col = null;
    if (data.image != null) {
        img_col = (
            <Grid2 xs={12} sm={3}>
                <Card>
                    <CardMedia src={data.image} component="img"></CardMedia>
                </Card>
            </Grid2>
        );
    }

    console.log(data);

    return (
        <Card variant="outlined">
            <Grid2 container margin={1}>
                <Grid2 xs={12} sm={data.image === null ? 12 : 9}>
                    <Container>
                        <Grid2 container>
                            <Grid2 xs={12} md={6}>
                                <Typography variant="h2">{data.name}</Typography>
                            </Grid2>
                            <Grid2 xs={12} md={6}>
                                <Container sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                    <Typography variant="h5">{`Average rating: ${rating}/10`}</Typography>
                                </Container>
                            </Grid2>
                        </Grid2>
                    </Container>
                    <Container>
                        <Typography variant="subtitle2">{`Released: ${data.release}`}</Typography>
                        <Typography variant="body1">{data.description}</Typography>
                        <Typography variant="h6">
                            {data.director === null ? '' : `Directed by ${data.director}`}
                        </Typography>
                        <Link component={ReactLink} to={`/reviews/${data.id}`}>
                            <Button variant="outlined" sx={{ marginY: 3 }}>
                                Check out reviews
                            </Button>
                        </Link>
                    </Container>
                </Grid2>
                {img_col}
            </Grid2>
        </Card>
    );
}
