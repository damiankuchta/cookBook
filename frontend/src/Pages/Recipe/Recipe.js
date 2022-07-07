import React, {useEffect, useState} from "react"
import axios from "axios";
import Image from "react-bootstrap/Image"
import {useNavigate, useParams} from "react-router-dom";
import {recipeAPI} from "../../App/axious";
import {Button, Card, Col, Row} from "react-bootstrap";
import Ingredients from "./Components/Ingredients/Ingredients";
import Description from "./Components/Description/Description";
import Steps from "./Components/Steps/Steps";

import recipePlaceholder from "../../Static/recipePlaceholder.jpg"
import "./Recipe.css"

export default function Recipe() {

    //todo: sort recipe steps and ingredients by indexes, just to make sure they are in correct order
    const [useRecipe, setRecipe] = useState()
    const [isRecipeLoaded, setIsRecipeLoaded] = useState(false)

    const navigate = useNavigate()

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

    const deleteRecipe = () => {
        axios.delete(recipeAPI(id), {})
            .then(response => {
                //todo: client info
                if (response.status === 204) {
                    navigate('/')
                }
            })
            .catch(error => {

                //todo: set client alert
                console.log(error)
            })
    }

    const editRecipe = () => {
        navigate('/edit/' + id)
    }

    console.log(useRecipe)

    const renderRecipeTypes = <Row>
        {useRecipe?.types?.split(", ").map(type => (
            <Col xs={4}><Card className={'d-flex align-items-center my-1'}>{type}</Card></Col>
        ))}
    </Row>

    return (
        <React.Fragment>
            <Row className={'d-flex justify-content-center'}>
                <Row>
                    <Col className={'my-3'} md={{offset: 8, span: 4}} lg={{offset: 9, span: 3}}>
                        <Button variant={'warning'} className={'mx-4'} onClick={editRecipe}>Edit</Button>
                        <Button variant={'danger'} onClick={deleteRecipe}>Delete</Button>
                    </Col>
                </Row>
                <Col md={6}>
                    <Image src={useRecipe?.picture_file || recipePlaceholder} rounded={true}
                           className={'recipe-image w-100'}/>
                    <Ingredients ingredients={useRecipe?.ingredients} isRecipeLoaded={isRecipeLoaded}/>
                </Col>

                <Col>
                    <Description title={useRecipe?.title} description={useRecipe?.description}
                                 isRecipeLoaded={isRecipeLoaded}/>
                    {renderRecipeTypes}
                    <Steps steps={useRecipe?.steps} isRecipeLoaded={isRecipeLoaded}/>
                </Col>

            </Row>
        </React.Fragment>
    )
}