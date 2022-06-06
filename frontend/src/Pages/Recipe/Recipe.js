import React, {useEffect, useState, Fragment} from "react"
import axios from "axios";
import Image from "react-bootstrap/Image"
import {useParams} from "react-router-dom";
import {ingredientApi, ingredientsApi, recipeAPI} from "../../App/axious";
import {Card, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import ImageWithPlaceholder from "../RecipesDashboard/Components/ImageWithPlaceholder/ImageWithPlaceholder";

export default function Recipe() {

    const [useRecipe, setRecipe] = useState()
    const [useIngredientsID, setIngredientsID] = useState([])
    const [useIngredients, setIngredients] = useState([])
    const [useIsIngredientsLoaded, setIsIngredientsLoaded] = useState(false)
    const [isRecipeLoaded, setIsRecipeLoaded] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        axios.get(recipeAPI(id), {})
            .then((response) => {
                setRecipe(response.data)
                setIsRecipeLoaded(true)
            })
            .catch((error) => {
                //todo set client alert
                console.log(error)
            })
    }, [])

    //Get ids of ingredients
    //todo: change when making backend
    useEffect(() => {
        if (isRecipeLoaded) {
            let ingredients = []
            useRecipe.ingredientsIDS.split(" ").map(ingredient => {
                ingredients.push(parseInt(ingredient))
            })
            setIngredientsID(ingredients)
            setIsIngredientsLoaded(true)
        }
    }, [isRecipeLoaded, setIngredientsID, useRecipe])

    //Get ids of ingredients
    //todo: change when making backend
    useEffect(() => {
        useIngredientsID.forEach((id) => {
            axios.get(ingredientApi(id), {})
                .then((response) => {
                    setIngredients((ingredients) => {
                        return [...ingredients, response.data]
                    })
                }).catch((error) => {
                console.log(error)
            })

        })

    }, [useIsIngredientsLoaded])

    return (
        <Container>
            {isRecipeLoaded ?
                <Row>
                    <Col md={"auto"}>
                        <ImageWithPlaceholder>
                            <Image src={useRecipe.recipePictureUrl} rounded={true}/>
                        </ImageWithPlaceholder>

                        <ListGroup className={"mt-3"}>
                            {useIngredients.map((ingredient) => {
                                return <ListGroupItem>
                                    {ingredient.productName} {ingredient.amount}{ingredient.units}
                                </ListGroupItem>
                            })}
                        </ListGroup>


                    </Col>

                    <Col md={5}>
                        <h2>{useRecipe.title}</h2>
                        <p>{useRecipe.description}</p>
                    </Col>

                </Row>
                :
                <Fragment>

                </Fragment>

            }

        </Container>
    )
}