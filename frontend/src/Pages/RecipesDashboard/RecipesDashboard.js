import React, {useEffect, useState} from "react"
import axios from "axios";
import {Card} from "react-bootstrap";
import {recipesAPI} from "../../App/axious";
import RecipeCard from "./Components/RecipeCard/RecipeCard";

export default function RecipesDashboard() {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        axios.get(recipesAPI, {})
            .then(function (response) {
                setRecipes(response.data)
            }).catch(function (error) {
                console.log(error)
            }
        )
    }, [])

    return (
        recipes.map((recipe) => {
            return <RecipeCard recipe={recipe}/>
        })
    )
}