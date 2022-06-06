import React, {useEffect, useState} from "react"
import axios from "axios";
import {recipesAPI} from "../../App/axious";
import {CardGroup, Col, Row} from "react-bootstrap"

import RecipeCard from "./Components/RecipeCard/RecipeCard";

const amountPlaceHolderRecipes = 10

export default function RecipesDashboard() {

    const [recipes, setRecipes] = useState([])
    const [isRecipesLoaded, setIsRecipesLoaded] = useState(false)

    useEffect(() => {
        axios.get(recipesAPI, {})
            .then((response) => {
                setRecipes(response.data)
                setIsRecipesLoaded(true)
            }).catch(function (error) {
                //todo: set up client alert
                console.log(error.message)
            }
        )
    }, [])

    return (
        <Row xs={1} md={2} lg={4} className={"g-3"}>
            {isRecipesLoaded ?
                recipes.map((recipe) => {
                    return <Col><RecipeCard recipe={recipe}/></Col>
                }) : [...Array(amountPlaceHolderRecipes)].map(() => {
                    return <Col><RecipeCard/></Col>
                })}
        </Row>
    )
}