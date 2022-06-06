import React, {useState, Fragment, useEffect} from "react"
import {Card, Placeholder} from "react-bootstrap";
import {Link} from "react-router-dom";
import recipePlaceholder from "../../../../Static/recipePlaceholder.jpg";


export default function RecipeCard({recipe}) {

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if(recipe) {
            setIsLoaded(true)
        }
    },[recipe])

    return (
        <Card>
            {isLoaded ?
                <Card.Img variant={'top'} src={recipe.recipePictureUrl}/>
                :
                <Card.Img variant={'top'} src={recipePlaceholder}/>
            }
            <Card.Body>
                {isLoaded ?
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
                        <Placeholder.Button variant="primary" xs={6}/>
                    </Fragment>
                }
            </Card.Body>


        </Card>
    )
}