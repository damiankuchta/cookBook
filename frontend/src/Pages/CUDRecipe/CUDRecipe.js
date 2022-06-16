import React, {useState} from "react"
import {Form, Row, Col, Container, Button, Card, ListGroup} from "react-bootstrap";
import {useForm} from "react-hook-form";
import Errors from "./Errors/Errors";
import axios from "axios";
import {recipesAPI} from "../../App/axious";
import {useNavigate} from 'react-router-dom';
import ListContainer from "./ListContainer/ListContainer";

import IngredientListItem from "./ListContainer/IngredientListItem/IngredientListItem";
import StepListItem from "./ListContainer/StepListItem/StepListItem";
import IngredientField from "./IngredientField/IngredientField";

import {requiredValidator, maxValidator, minValidator} from "./utils";
import {maxTitleLength, minTitleLength, minDescriptionLength, maxDescriptionLength} from "./config";
import EditableField from "./EditableField/EditableField";
import StepField from "./StepField/StepField";


export default function CUDRecipe({}) {

    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm();

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

                <EditableField setItem={setIngredients} component={IngredientField}/>
                <ListContainer list={useIngredients}
                               listItem={IngredientListItem}
                               setItem={setIngredients}
                               editComponent={IngredientField}/>


                <EditableField setItem={setSteps} component={StepField}/>
                <ListContainer list={useSteps}
                               listItem={StepListItem}
                               setItem={setSteps}
                               editComponent={StepField}/>

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