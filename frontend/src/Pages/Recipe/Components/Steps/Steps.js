import React from "react"
import {ListGroup, Placeholder} from "react-bootstrap";

export default function Steps({steps = [], isRecipeLoaded}) {

    const renderSteps = () => {
        const recipeHasSteps = steps.length !== 0
        return (recipeHasSteps ? steps?.map((step) =>
                    (<ListGroup.Item as={'li'}>{step.step}</ListGroup.Item>))
                :
                <ListGroup.Item className={'fw-bolder'}>Recipe has no Steps</ListGroup.Item>
        )
    }

    const renderPlaceholders = () => ([...Array(14)].map(() =>
            (
                <Placeholder as={ListGroup.Item} animation="glow">
                    <Placeholder className={'w-75'}/>
                    <Placeholder className={'w-100'}/>
                    <Placeholder className={'w-25'}/>
                </Placeholder>

            ))
    )

    return (

        <ListGroup as={'ol'} variant={'flush'} numbered>
            {isRecipeLoaded ? renderSteps() : renderPlaceholders()}
        </ListGroup>


    )
}