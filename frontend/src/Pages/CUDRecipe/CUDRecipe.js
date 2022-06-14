import React, {useState} from "react"
import {Form, Row, Col, Container, Button, Card, ListGroup} from "react-bootstrap";
import {useForm} from "react-hook-form";
import Errors from "./Errors/Errors";
import axios from "axios";
import {recipesAPI} from "../../App/axious";
import {useNavigate} from 'react-router-dom';
import ListContainer from "./ListContainer/ListContainer";

import Ingredient from "./Ingredient/Ingredient";
import Step from "./Step/Step";

const maxTitleLength = 32
const minTitleLength = 2

const minDescriptionLength = 10
const maxDescriptionLength = 200

const maxProductLength = 20
const minProductLength = 2

const maxValidator = (max) => ({
    value: max,
    message: "Too many characters"
})

const minValidator = (min) => ({
    value: min,
    message: "Too little characters"
})

const requiredValidator = () => ({
    value: true,
    message: "Field required"
})


export default function CUDRecipe({}) {

    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm();

    const {
        register: registerIngredients,
        watch: watchIngredients,
        reset: resetIngredientFields,
        trigger: triggerIngredients,
        formState: {errors: errorsIngredients}
    } = useForm()


    const {
        register: registerStep,
        watch: watchStep,
        reset: resetFieldStep,
        trigger: triggerStep,
        formState: {errors: errorsStep}
    } = useForm()

    const [useSteps, setSteps] = useState([])
    const [useIngredients, setIngredients] = useState([])

    const onSubmit = (data) => {
        let formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        //todo: validate size of picture (use useForm validators??)
        //todo: display picture when loaded, and cut it accordingly

        //todo: I would rather have rename of picture on backend
        let filename = (Math.random() + 1).toString(36).substring(2);
        if (data.picture_file.length > 0) {
            formData.append("picture_file", data.picture_file[0], filename + ".jpg");
        }

        axios.post(recipesAPI, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
                'Content-Disposition': 'inline; name=picture_file; filename=picture_file'
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    navigate("/" + response.data.id)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const addIngredient = (e) => {
        e.preventDefault()
        triggerIngredients()
            .then(isOk => {

                if (isOk) {
                    const form = watchIngredients()
                    setIngredients((ingredients => {
                        return [...ingredients, {product: form.product, amount: form.amount, unit: form.unit}]
                    }))
                    resetIngredientFields()
                }
            })
    }

    const addStep = (e) => {
        e.preventDefault()
        triggerStep('step')
            .then(isOK => {
                if (isOK) {
                    const form = watchStep()
                    setSteps((step => {
                        return [...step, {description: form.step}]
                    }))
                    resetFieldStep()
                }
            })
    }

    return (
        <Container>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId={'title'} className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Title: </Form.Label>
                    <Col md={10} lg={9}>
                        <Form.Control type={'text'} placeholder={'Title'} {...register('title', {
                            required: requiredValidator(),
                            maxLength: maxValidator(maxTitleLength),
                            minLength: minValidator(minTitleLength)
                        })}/>
                        <Form.Text
                            className={'text-muted'}>Between {minTitleLength} and {maxTitleLength} chars</Form.Text>
                        <Errors errors={errors?.title}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId={'description'} className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Description: </Form.Label>
                    <Col md={10} lg={9}>
                        <Form.Control type={'text'} style={{height: "200px"}} {...register('description', {
                            required: requiredValidator(),
                            maxLength: maxValidator(maxDescriptionLength),
                            minLength: minValidator(minDescriptionLength)
                        })}/>
                        <Form.Text
                            className={'text-muted'}>Between {minDescriptionLength} and {maxDescriptionLength} chars</Form.Text>
                        <Errors errors={errors?.description}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId="picture_file" className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Picture</Form.Label>
                    <Col md={10} lg={9}>
                        <Form.Control type="file" {...register('picture_file')} accept={'image/*'}/>
                        <Errors errors={errors?.picture_file}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId={"ingredient"} className="mb-3" as={Row}>
                    <Form.Label column sm={10} md={2}>Ingredient</Form.Label>
                    <Col xs={5} md={3} lg={4}>
                        <Form.Control type="text" placeholder={'Product'} {...registerIngredients('product', {
                            maxLength: maxValidator(maxProductLength),
                            minLength: minValidator(minProductLength),
                            required: requiredValidator()
                        })}/>
                        <Errors errors={errorsIngredients?.product}/>
                    </Col>

                    <Col xs={3} md={2}>
                        <Form.Control type="number" placeholder={'Amount'}
                                      {...registerIngredients('amount', {
                                          required: requiredValidator()
                                      })}/>
                        <Errors errors={errorsIngredients?.amount}/>
                    </Col>
                    <Col xs={4} md={2} lg={1}>
                        <Form.Select {...registerIngredients('unit', {
                            required: requiredValidator(),
                            validate: value => value !== "Chose product unit" || "Chose product unit!",
                        })}>
                            <option>Chose product unit</option>
                            <option>KG</option>
                            <option>g</option>
                            <option>L</option>
                            <option>ml</option>
                            <option>Units</option>
                        </Form.Select>
                        <Errors errors={errorsIngredients?.unit}/>
                    </Col>
                    <Col xs={12} md={3} lg={2}>
                        <Button className={'w-100'} onClick={addIngredient}>
                            Add Ingredient
                        </Button>
                    </Col>
                </Form.Group>

                <ListContainer list={useIngredients} component={Ingredient}/>

                <Form.Group controlId={"step"} className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Add step</Form.Label>
                    <Col md={10} lg={7}>
                        <Form.Control type="text" placeholder={'Step'}
                                      {...registerStep("step", {
                                          required: requiredValidator()
                                      })}/>

                        <Errors errors={errorsStep?.step}/>
                    </Col>

                    <Col xs={12} md={3} lg={2}>
                        <Button className={'w-100'} onClick={addStep}>
                            Add Step
                        </Button>
                    </Col>
                </Form.Group>

                <ListContainer list={useSteps} component={Step}/>

                <Row>
                    <Col lg={11}>
                        <Button type={'submit'} className={'w-100'}>
                            Create recipe
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>
    )
}