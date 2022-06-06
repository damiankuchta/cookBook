import React, {useEffect, useState, Fragment} from "react"
import axios from "axios";
import Image from "react-bootstrap/Image"
import {useParams} from "react-router-dom";
import {ingredientApi, ingredientsApi, recipeAPI} from "../../App/axious";
import {Col, Container, ListGroup, ListGroupItem, Placeholder, Row} from "react-bootstrap";
import ImageWithPlaceholder from "../../Components/ImageWithPlaceholder/ImageWithPlaceholder";
import Ingredients from "./Components/Ingredients/Ingredients";
import Description from "./Components/Description/Description";
import Steps from "./Components/howToMake/howToMake";

export default function Recipe() {

    const [useRecipe, setRecipe] = useState()
    const [isRecipeLoaded, setIsRecipeLoaded] = useState(false)



    const {id} = useParams()

    useEffect(() => {
        axios.get(recipeAPI(id), {})
            .then((response) => {
                if (response.status === 200) {

                    setRecipe(response.data)
                    setIsRecipeLoaded(true)
                }
            })
            .catch((error) => {
                //todo set client alert
                console.log(error)
                setIsRecipeLoaded(false)
            })
    }, [])

    return (
        <Container>
            <Row>
                <Col md={"auto"}>
                    <ImageWithPlaceholder element={<Image src={useRecipe?.recipePictureUrl} rounded={true}/>}/>
                    <Ingredients ingredients={useRecipe?.ingredientsIDS} isRecipeLoaded={isRecipeLoaded}/>
                </Col>

                <Col md={5}>
                    <Description title={useRecipe?.title} description={useRecipe?.description} isLoaded={isRecipeLoaded}/>
                    <Steps howToMake={useRecipe?.howToMake} isLoaded={isRecipeLoaded}/>
                </Col>

            </Row>

        </Container>
    )
}