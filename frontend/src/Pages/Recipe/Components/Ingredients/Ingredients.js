import React from "react"
import {Col, ListGroup, Placeholder, Row} from "react-bootstrap";


export default function Ingredients({isRecipeLoaded, ingredients = []}) {

    const renderIngredients = () => {
        const recipeHasIngredients = ingredients?.length !== 0

        return (recipeHasIngredients ?
                <React.Fragment>
                    <Row className={'fw-bolder mx-1'}>
                        <Col >Name</Col>
                        <Col>Amount</Col>
                    </Row>
                    {ingredients.map((ingredient) =>
                        (<ListGroup.Item as={'li'} className={'w-100'}>
                            <Row>
                                <Col> {ingredient.product} </Col>
                                <Col> {ingredient.amount}{ingredient.unit} </Col>
                            </Row>
                        </ListGroup.Item>))}
                </React.Fragment>
                :
                <ListGroup.Item className={'fw-bolder'}>Recipe has no Ingredients</ListGroup.Item>
        )

    }


    const renderPlaceholders = () =>
        ([...Array(12)].map((i) =>
            (<ListGroup.Item as={"li"}>
                <Placeholder animation="glow">
                    <Placeholder className={'w-75'}/>
                    <Placeholder className={'w-100'}/>
                    <Placeholder className={'w-25'}/>
                </Placeholder>
            </ListGroup.Item>)))


    return (
        <ListGroup className={"mt-3"} variant={'flush'}>
            {isRecipeLoaded ? renderIngredients() : renderPlaceholders()}
        </ListGroup>
    )
}