import React from "react"
import recipePlaceholder from "../../../../Static/recipePlaceholder.jpg"
import {Card, Placeholder} from "react-bootstrap";
import FoodCard from "../FoodCard/FoodCard";

export default function PlaceholderCard() {
    return (
        <FoodCard>
            <Card.Img variant="top" src={recipePlaceholder}/>
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6}/>
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
                    <Placeholder xs={6}/> <Placeholder xs={8}/>
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6}/>
            </Card.Body>
        </FoodCard>
    )
}