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
import CUDRecipe from "./Pages/CUDRecipe/CUDRecipe";
import {HTML5Backend} from 'react-dnd-html5-backend'
import { TouchBackend } from "react-dnd-touch-backend";
import {DndProvider} from 'react-dnd'
import {isMobile} from 'react-device-detect';

const root = ReactDOM.createRoot(document.getElementById('root'));

const dndBackend = isMobile ? TouchBackend : HTML5Backend

root.render(
    <React.StrictMode>
        <DndProvider backend={dndBackend}>
            <Router>
                <Routes>
                    <Route path={''} element={<RecipesDashboard/>}/>
                    <Route path={'/:id'} element={<Recipe/>}/>
                    <Route path={'/add'} element={<CUDRecipe/>}/>
                </Routes>
            </Router>
        </DndProvider>
    </React.StrictMode>
);

