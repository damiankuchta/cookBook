import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesDashboard from "./Pages/RecipesDashboard/RecipesDashboard";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <RecipesDashboard/>
    </React.StrictMode>
);

