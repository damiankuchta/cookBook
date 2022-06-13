import React, {useState} from "react"
import {Form, Row, Col, Container, Button} from "react-bootstrap";
import {StepField} from "./StepField/StepField";
import IngredientField from "./IngredientField/IngredientField";
import {useForm} from "react-hook-form";
import Errors from "./Errors/Errors";
import axios from "axios";
import {recipesAPI} from "../../App/axious";
import {useNavigate} from 'react-router-dom';

const maxTitleLength = 32
const minTitleLength = 2

const minDescriptionLength = 10
const maxDescriptionLength = 200

export default function CUDRecipe({}) {

    const navigate = useNavigate()
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
        let formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        //todo: I would rather have this on backend
        let filename = (Math.random() + 1).toString(36).substring(2);
        if(data.picture_file.length > 0) {
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


    return (
        <Container>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId={'title'} className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Title: </Form.Label>
                    <Col md={10} lg={9}>
                        <Form.Control type={'text'} placeholder={'Title'} {...register('title', {
                            required: true,
                            maxLength: maxTitleLength,
                            minLength: minTitleLength
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
                            required: true,
                            maxLength: maxDescriptionLength,
                            minLength: minDescriptionLength
                        })}/>
                        <Form.Text
                            className={'text-muted'}>Between {minDescriptionLength} and {maxDescriptionLength} chars</Form.Text>
                        <Errors errors={errors?.description}/>
                    </Col>
                </Form.Group>
                <Form.Group controlId="picture_file" className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Picture</Form.Label>
                    <Col md={10} lg={9}>
                        {/*todo :  check if accept img works*/}
                        <Form.Control type="file" {...register('picture_file')} accept={'image/*'}/>
                        <Errors errors={errors?.picture_file}/>
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