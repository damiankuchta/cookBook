import React from "react"
import {Card, Button} from "react-bootstrap";

export default function RecipeCard({recipe}) {
    return (
        <Card>
            <Card.Img variant={'top'} src={recipe.recipePictureUrl}/>
            <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <Button variant={'primary'}>Go to recipe</Button>
            </Card.Body>
        </Card>
    )
}