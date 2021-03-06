import React, {useEffect, useState} from "react"
import ReactPaginate from 'react-paginate';

import axios from "axios";
import {recipesAPI} from "../../App/axious";
import {Button, Col, Container, Dropdown, Form, Row} from "react-bootstrap"
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai"

import RecipeCard from "./Components/RecipeCard/RecipeCard";
import {useForm} from "react-hook-form";
import RecipeTypesCheckBoxes from "../../Components/RecipeTypesCheckBoxes/RecipeTypesCheckBoxes";
import {axiosErrors} from "../../utils/axiosErrors";
import {setError} from "../../Reducers/alertSlice";
import {useDispatch} from "react-redux";

const amountPlaceHolderRecipes = 20

export default function RecipesDashboard() {

    const [recipesResponse, setRecipesResponse] = useState()
    const [isRecipesLoaded, setIsRecipesLoaded] = useState(false)

    const [pageCount, setPageCount] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const [sortBy, setSortBy] = useState({sort: "created_timestamp"})
    const [sortByDirection, setSortByDirection] = useState("")

    const [searchData, setSearchData] = useState({search: "", types: []});

    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1)
        setIsRecipesLoaded(false)
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (!isRecipesLoaded) {
            axios.get(recipesAPI, {
                params: {
                    page: currentPage,
                    ordering: sortByDirection + sortBy.sort,
                    types: encodeURIComponent(searchData.types),
                    title__contains: searchData.search,
                }
            })
                .then((response) => {
                    setPageCount(response.data.pages_amount)
                    setRecipesResponse(response)
                    setIsRecipesLoaded(true)
                }).catch((error) => axiosErrors(error, dispatch, setError));
        }
    }, [currentPage, sortByDirection, sortBy, isRecipesLoaded])

    const onSortSelect = (eventKey, event) => {
        setIsRecipesLoaded(false)
        if (eventKey === sortBy.sort) {
            setSortByDirection(direction => (direction === "" ? "-" : ""))
        } else {
            setSortBy({name: event.target.innerHTML, sort: eventKey})
        }
    }

    const onFormSubmit = (data) => {
        setSearchData(data)
        setIsRecipesLoaded(false)
    }

    const directionArrow = sortByDirection === '' ? <AiOutlineArrowUp/> : <AiOutlineArrowDown/>

    //todo: shared config between back and frontend??
    //todo: boiler code
    const titleArrow = sortBy.sort === "title" && directionArrow
    const createdArrow = sortBy.sort === "created_timestamp" && directionArrow
    const updateArrow = sortBy.sort === "last_update_timestamp" && directionArrow
    const stepsArrow = sortBy.sort === "number_of_steps" && directionArrow
    const ingredientsArrow = sortBy.sort === "number_of_ingredients" && directionArrow

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <Row className={'mt-2'}>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder={"Search"}
                                                  aria-label={"Search"}
                                                  {...register('search', {})}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button type={'submit'}>Search</Button>
                            </Col>
                        </Row>

                        <Form.Group className={'d-flex m-2 flex-wrap'}>
                            <RecipeTypesCheckBoxes register={register}/>
                        </Form.Group>

                    </Form>
                </Col>
                <Col sm={{span: 2}}>
                    <Dropdown onSelect={onSortSelect} className={'d-inline-block my-2 w-100'}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className={'w-100'}>
                            {sortBy?.name || "Sort by"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={'title'}>Title {titleArrow}</Dropdown.Item>
                            <Dropdown.Item eventKey={'created_timestamp'}>Creation date {createdArrow}</Dropdown.Item>
                            <Dropdown.Item eventKey={'last_update_timestamp'}>Update date {updateArrow}</Dropdown.Item>
                            <Dropdown.Item eventKey={'number_of_steps'}>Amount of steps {stepsArrow}</Dropdown.Item>
                            <Dropdown.Item eventKey={'number_of_ingredients'}>Amount of
                                ingredients {ingredientsArrow}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            <Row className={"g-3"}>
                {isRecipesLoaded ?
                    recipesResponse.data.results.map((recipe) => {
                        return <Col xs={"auto"} sm={6} md={4} lg={4} xl={3}><RecipeCard recipe={recipe}/></Col>
                    }) : [...Array(amountPlaceHolderRecipes)].map(() => {
                        return <Col xs={"auto"} sm={6} md={4} lg={4} xl={3}><RecipeCard/></Col>
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