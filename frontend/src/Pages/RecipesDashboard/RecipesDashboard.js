import React, {useEffect, useState} from "react"
import axios from "axios";
import {recipesAPI} from "../../App/axious";
import {CardGroup, Col, Row} from "react-bootstrap"

import RecipeCard from "./Components/RecipeCard/RecipeCard";

const amountPlaceHolderRecipes = 10

export default function RecipesDashboard() {

    const [recipesResponse, setRecipesResponse] = useState()
    const [isRecipesLoaded, setIsRecipesLoaded] = useState(false)

    useEffect(() => {
        axios.get(recipesAPI, {})
            .then((response) => {
                setRecipesResponse(response)
                setIsRecipesLoaded(true)
            }).catch(function (error) {
                //todo: set up client alert
                console.log(error.message)
            }
        )
    }, [])

    return (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className={"g-3"}>
            {isRecipesLoaded ?
                recipesResponse.data.map((recipe) => {
                    return <Col><RecipeCard recipe={recipe}/></Col>
                }) : [...Array(amountPlaceHolderRecipes)].map(() => {
                    return <Col><RecipeCard/></Col>
                })}
        </Row>
    )
}