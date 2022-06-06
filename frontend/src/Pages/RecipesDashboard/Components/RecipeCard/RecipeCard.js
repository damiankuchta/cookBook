import React, {useState} from "react"
import {Card, Button} from "react-bootstrap";
import recipePlaceholder from "../../../../Static/recipePlaceholder.jpg"
import FoodCard from "../FoodCard/FoodCard";


export default function RecipeCard({recipe}) {

    const [isImgLoaded, setImgLoaded] = useState(false)

    const imgLoaded = () => {
        setImgLoaded(true)
    }

    return (
        <FoodCard>
            {isImgLoaded ?
                <Card.Img variant={'top'} src={recipe.recipePictureUrl} /> :
                <Card.Img variant={'top'} src={recipePlaceholder} onLoad={imgLoaded}/>
            }

            <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description.substring(0,100)}...</Card.Text>
                <Button variant={'primary'}>Go to recipe</Button>
            </Card.Body>
        </FoodCard>
    )
}