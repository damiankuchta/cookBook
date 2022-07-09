import {DndProvider} from "react-dnd";
import {Provider, useSelector} from "react-redux";
import store from "../Store/store";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import {Container} from "react-bootstrap";
import RecipesDashboard from "../Pages/RecipesDashboard/RecipesDashboard";
import Recipe from "../Pages/Recipe/Recipe";
import Add from "../Pages/CUDRecipe/Add";
import Edit from "../Pages/CUDRecipe/Edit";
import React, {useCallback} from "react";
import {isMobile} from "react-device-detect";
import {TouchBackend} from "react-dnd-touch-backend";
import {HTML5Backend} from "react-dnd-html5-backend";
import Alert from "../Components/Alert/Alert";


export default function App() {

    const dndBackend = useCallback(() => {
        return isMobile ? TouchBackend : HTML5Backend
    }, [isMobile])

    return (
        <DndProvider backend={dndBackend()}>
            <Provider store={store}>
                <Router>
                    <NavBar/>
                    <Alert/>
                    <Container>
                        <Routes>
                            <Route path={''} element={<RecipesDashboard/>}/>
                            <Route path={'/:id'} element={<Recipe/>}/>
                            <Route path={'/add'} element={<Add/>}/>
                            <Route path={'/edit/:id'} element={<Edit/>}/>
                        </Routes>
                    </Container>
                </Router>
            </Provider>
        </DndProvider>)
}