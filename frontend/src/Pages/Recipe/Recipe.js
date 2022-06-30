import React, {useEffect, useState} from "react"
import axios from "axios";
import Image from "react-bootstrap/Image"
import {useNavigate, useParams} from "react-router-dom";
import {recipeAPI} from "../../App/axious";
import {Button, Col, Container, Row} from "react-bootstrap";
import Ingredients from "./Components/Ingredients/Ingredients";
import Description from "./Components/Description/Description";
import Steps from "./Components/Steps/Steps";

import recipePlaceholder from "../../Static/recipePlaceholder.jpg"

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

    return (
        <React.Fragment>
            <Row className={'d-flex justify-content-center'}>
                <div>
                    <Button variant={'warning'} onClick={editRecipe}>Edit</Button>
                    <Button variant={'danger'} onClick={deleteRecipe}>Delete</Button>
                </div>
                <Col md={'auto'}>
                    <Image src={useRecipe?.picture_file || recipePlaceholder} rounded={true} className={'w-100'}/>
                    <Ingredients ingredients={useRecipe?.ingredients} isRecipeLoaded={isRecipeLoaded}/>
                </Col>

                <Col>
                    <Description title={useRecipe?.title} description={useRecipe?.description}
                                 isRecipeLoaded={isRecipeLoaded}/>
                    <Steps steps={useRecipe?.steps} isRecipeLoaded={isRecipeLoaded}/>
                </Col>

            </Row>
        </React.Fragment>
    )
}