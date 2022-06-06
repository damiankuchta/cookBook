import React from 'react'
import {Card} from "react-bootstrap";
import "./FoodCard.css"

export default function FoodCard({children}) {
    return (
        <Card className={'food-card'}>
            {children}
        </Card>
    )
}