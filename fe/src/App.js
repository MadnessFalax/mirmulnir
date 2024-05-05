import React from 'react';
import { Outlet, Link as ReactLink } from 'react-router-dom';
import { Toolbar, Link, Typography, AppBar, Container } from '@mui/material';

function App() {
    return (
        <Container>
            <Link component={ReactLink} to="/">
                <Typography variant="h1" textAlign={'center'} sx={{ margin: 1 }}>
                    Movie Database
                </Typography>
            </Link>
            <AppBar position="static">
                <Toolbar>
                    <Link component={ReactLink} to="/" sx={{ color: '#FFFFFF', marginX: 1 }}>
                        <Typography>Home</Typography>
                    </Link>
                    <Link component={ReactLink} to="/movies" sx={{ color: '#FFFFFF', marginX: 1 }}>
                        <Typography>Movies</Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Container>
    );
}

export default App;
