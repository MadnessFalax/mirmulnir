import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Typography } from '@mui/material';
import { WelcomePage } from './components/WelcomePage.js';
import { Movies, loader as moviesLoader, query_loader as moviesQueryLoader } from './components/Movies.js';
import { Reviews, loader as reviewsLoader } from './components/Reviews.js';
import { MovieCard, loader as movieCardLoader } from './components/MovieCard.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <WelcomePage></WelcomePage>,
            },
            {
                path: '/movies',
                loader: moviesLoader,
                element: <Movies></Movies>,
            },
            {
                path: '/movies/search/:movie_name',
                element: <Movies></Movies>,
                loader: moviesQueryLoader,
            },
            {
                path: '/movies/:movie_id',
                element: <MovieCard></MovieCard>,
                loader: movieCardLoader,
            },
            {
                path: '/reviews/:movie_id',
                loader: reviewsLoader,
                element: <Reviews></Reviews>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
