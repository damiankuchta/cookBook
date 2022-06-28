import React from "react"
import {ListGroup, Placeholder} from "react-bootstrap";

export default function Steps({steps = [], isRecipeLoaded}) {

    //todo: make steps in order.

    return (

        <ListGroup as={'ol'} variant={'flush'} numbered>
            {isRecipeLoaded ?
                steps.length !== 0 ?
                    steps?.map((step) => {
                        return <ListGroup.Item as={'li'}>{step.step}</ListGroup.Item>
                    })
                    :
                    <ListGroup.Item>Steps: No data</ListGroup.Item>

                :
                [...Array(14)].map(() => {
                    return (
                        <Placeholder as={ListGroup.Item} animation="glow">
                            <Placeholder className={'w-75'}/>
                            <Placeholder className={'w-100'}/>
                            <Placeholder className={'w-25'}/>
                        </Placeholder>

                    )
                })}
        </ListGroup>


    )
}