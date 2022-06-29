import React, {useEffect, useState} from "react"
import ReactPaginate from 'react-paginate';

import axios from "axios";
import {recipeApiPage, recipesAPI} from "../../App/axious";
import {Col, Container, Row} from "react-bootstrap"

import RecipeCard from "./Components/RecipeCard/RecipeCard";

const amountPlaceHolderRecipes = 20

export default function RecipesDashboard() {

    const [recipesResponse, setRecipesResponse] = useState()
    const [isRecipesLoaded, setIsRecipesLoaded] = useState(false)

    const [pageCount, setPageCount] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        axios.get(recipesAPI, {})
            .then((response) => {
                setRecipesResponse(response)
                setPageCount(response.data.pages_amount)
                setIsRecipesLoaded(true)
            }).catch(function (error) {
                //todo: set up client alert
                console.log(error.message)
            }
        )
    }, [])

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1)
        setIsRecipesLoaded(false)
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        axios.get(recipeApiPage(currentPage), {})
            .then((response) => {
                setRecipesResponse(response)
                setIsRecipesLoaded(true)
            }).catch(function (error) {
                //todo: set up client alert
                console.log(error.message)
            }
        )
    }, [currentPage])

    return (
        <React.Fragment>
            <Row xs={1} sm={2} md={3} lg={4} xl={5} className={"g-3"}>
                {isRecipesLoaded ?
                    recipesResponse.data.results.map((recipe) => {
                        return <Col><RecipeCard recipe={recipe}/></Col>
                    }) : [...Array(amountPlaceHolderRecipes)].map(() => {
                        return <Col><RecipeCard/></Col>
                    })}
            </Row>
            <Row>
                    <Container>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next"
                            previousLabel="Previous"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            activeClassName="active"
                            className='pagination d-flex justify-content-center mt-3'
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                        />
                    </Container>
            </Row>
        </React.Fragment>
    )
}