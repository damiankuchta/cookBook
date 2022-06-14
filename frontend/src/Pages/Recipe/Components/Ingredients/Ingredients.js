import React from "react"
import {ListGroup, Placeholder} from "react-bootstrap";

export default function Ingredients({isRecipeLoaded, ingredients = []}) {
    return (
        <ListGroup className={"mt-3"} variant={'flush'}>
            {isRecipeLoaded ?
                ingredients?.length !== 0 ?
                    ingredients.map((ingredient, i) => {
                        return (
                            <ListGroup.Item as={'li'} >
                                {ingredient.product} {ingredient.amount}{ingredient.units}
                            </ListGroup.Item>
                        )
                    })
                    :
                    <ListGroup.Item >Ingredients: No data</ListGroup.Item>
                :
                [...Array(12)].map((i) => {
                    return (
                        <ListGroup.Item as={"li"}>
                            <Placeholder animation="glow">
                                <Placeholder className={'w-75'}/>
                                <Placeholder className={'w-100'}/>
                                <Placeholder className={'w-25'}/>
                            </Placeholder>
                        </ListGroup.Item>)
                })
            }
        </ListGroup>

    )
}