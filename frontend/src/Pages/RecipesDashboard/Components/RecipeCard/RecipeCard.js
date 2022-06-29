import React, {useState, Fragment, useEffect} from "react"
import {Card, Placeholder} from "react-bootstrap";
import {Link} from "react-router-dom";
import recipePlaceholder from "../../../../Static/recipePlaceholder.jpg"


export default function RecipeCard({recipe={}}) {

    return (
        <Card>
            <Card.Img variant={'top'} src={recipe?.picture_file || recipePlaceholder}/>
            <Card.Body>
                {Object.keys(recipe).length > 0 ?
                    <Fragment>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Text>{recipe.description.substring(0, 100)}...</Card.Text>
                        <Link to={"/" + recipe.id}>Go to recipe</Link>
                    </Fragment>
                    :
                    <Fragment>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={6}/>
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
                            <Placeholder xs={6}/> <Placeholder xs={8}/>
                        </Placeholder>
                        <Placeholder xs={3}/>
                    </Fragment>
                }
            </Card.Body>


        </Card>
    )
}