import React, {useState} from "react"
import {Form, Row, Col, Container, Button} from "react-bootstrap";
import {StepField} from "./StepField/StepField";
import IngredientField from "./IngredientField/IngredientField";
import {useForm} from "react-hook-form";
import Errors from "./Errors/Errors";
import axios from "axios";
import {recipesAPI} from "../../App/axious";


export default function CUDRecipe({}) {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [useStepsFields, setStepsFields] = useState([<StepField number={1}
                                                                  onInitialFocus={() => addStep()}
                                                                  register={register}/>])

    const [useIngredientFields, setIngredientsFields] = useState([<IngredientField register={register}
                                                                                   onInitialFocus={() => addIngredient()}
                                                                                   number={1}/>])

    const addStep = () => {
        setStepsFields(stepForms => {
            const stepFormsCount = stepForms.length + 1
            return [...stepForms, <StepField number={stepFormsCount}
                                             onInitialFocus={addStep}
                                             register={register}
                                             errors={errors['step' + stepFormsCount]}/>]
        })
    }

    const addIngredient = () => {
        setIngredientsFields(ingredients => {
            const ingredientsCount = ingredients.length + 1
            return [...ingredients, <IngredientField onInitialFocus={addIngredient}
                                                     number={ingredientsCount}
                                                     register={register}
                                                     errors={{
                                                         product: errors['product' + ingredientsCount],
                                                         amount: errors['amount' + ingredientsCount],
                                                         unit: errors['unit' + ingredientsCount]
                                                     }
                                                     }/>]
        })
    }

    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <Container>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId={'title'} className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Title: </Form.Label>
                    <Col md={10} lg={9}>
                        <Form.Control type={'text'} placeholder={'Title'} {...register('title', {
                            required: true,
                            maxLength: 32,
                            minLength: 3
                        })}/>
                        <Form.Text className={'text-muted'}>Between 3 and 32 chars</Form.Text>
                        <Errors errors={errors?.title}/>
                    </Col>
                </Form.Group>
                <Form.Group controlId={'description'} className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Description: </Form.Label>
                    <Col md={10} lg={9}>
                        <Form.Control type={'text'} style={{height: "200px"}} {...register('description', {
                            required: true,
                            maxLength: 200,
                            minLength: 20
                        })}/>
                        <Form.Text className={'text-muted'}>Between 2 0 and 200 chars</Form.Text>
                        <Errors errors={errors?.description}/>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Picture</Form.Label>
                    <Col md={10} lg={9}>
                        {/*todo :  check if accept img works*/}
                        <Form.Control type="file" {...register('picture')} accept={'image/*'}/>
                        <Errors errors={errors?.picture}/>
                    </Col>
                </Form.Group>

                {useIngredientFields.map(ingredientField => {
                    return ingredientField
                })}

                {useStepsFields.map((stepField) => {
                    return stepField
                })}
                <Col lg={11}>
                    <Button type={'submit'} className={'w-100'}>
                        Create recipe
                    </Button>
                </Col>
            </Form>
        </Container>
    )
}