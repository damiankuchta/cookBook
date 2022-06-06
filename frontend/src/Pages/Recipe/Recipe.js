import React, {useEffect, useState} from "react"
import axios from "axios";
import Image from "react-bootstrap/Image"
import {useParams} from "react-router-dom";
import {recipeAPI} from "../../App/axious";
import {Col, Container, Row} from "react-bootstrap";
import ImageWithPlaceholder from "../../Components/ImageWithPlaceholder/ImageWithPlaceholder";
import Ingredients from "./Components/Ingredients/Ingredients";
import Description from "./Components/Description/Description";
import HowToMake from "./Components/howToMake/howToMake";

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
            <Row className={'d-flex justify-content-center'}>
                <Col md={'auto'}>
                    <ImageWithPlaceholder
                        element={<Image src={useRecipe?.recipePictureUrl} rounded={true} className={'w-100'}/>}/>
                    <Ingredients ingredients={useRecipe?.ingredientsIDS} isRecipeLoaded={isRecipeLoaded}/>
                </Col>

                <Col >
                    <Description title={useRecipe?.title} description={useRecipe?.description}
                                 isRecipeLoaded={isRecipeLoaded}/>
                    <HowToMake howToMake={useRecipe?.howToMake} isRecipeLoaded={isRecipeLoaded}/>
                </Col>

            </Row>

        </Container>
    )
}