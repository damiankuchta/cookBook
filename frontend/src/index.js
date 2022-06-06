import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesDashboard from "./Pages/RecipesDashboard/RecipesDashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css"
import Recipe from "./Pages/Recipe/Recipe";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path={''} element={<RecipesDashboard/>}/>
                <Route path={'/:id'} element={<Recipe/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
);

