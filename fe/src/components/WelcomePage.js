import { Card, CardMedia, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export function WelcomePage() {
    return (
        <Card variant="outlined">
            <Typography variant="h2" sx={{ textAlign: 'center' }}>
                Welcome
            </Typography>
            <Typography variant="body1" sx={{ margin: 5, textAlign: 'center' }}>
                Explore a diverse collection of movies across genres and styles. Dive into reviews, share your thoughts,
                and connect with fellow movie enthusiasts.
            </Typography>
            <Typography variant="h5" sx={{ margin: 5 }}>
                Our team:
            </Typography>
            <Grid2 container>
                <Grid2 xs={12} sm={6}>
                    <Card sx={{ marginX: 5, marginTop: 5 }}>
                        <CardMedia src="/profile-placeholder.jpg" component="img"></CardMedia>
                        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 5 }}>
                            Name placeholder
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', marginY: 3 }}>
                            Info placeholder
                        </Typography>
                    </Card>
                </Grid2>
                <Grid2 xs={12} sm={6}>
                    <Card sx={{ marginX: 5, marginTop: 5 }}>
                        <CardMedia src="/profile-placeholder.jpg" component="img"></CardMedia>
                        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 5 }}>
                            Name placeholder
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', marginY: 3 }}>
                            Info placeholder
                        </Typography>
                    </Card>
                </Grid2>
            </Grid2>
        </Card>
    );
}
