import React, {useState} from "react"
import {Row, Col, Container, Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import Errors from "../Errors/Errors";

import ListContainer from "../ListContainer/ListContainer";

import IngredientListItem from "../ListContainer/IngredientListItem/IngredientListItem";
import StepListItem from "../ListContainer/StepListItem/StepListItem";
import IngredientField from "../IngredientField/IngredientField";

import {requiredValidator, maxValidator, minValidator} from "../utils";
import {maxTitleLength, minTitleLength, minDescriptionLength, maxDescriptionLength} from "../config";

import EditableField from "../../../Components/EditableField/EditableField";
import StepField from "../StepField/StepField";


export default function RecipeForm({onSubmit, initialData = {}}) {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const [useSteps, setSteps] = useState(initialData.steps || [])
    const [useIngredients, setIngredients] = useState(initialData.ingredients || [])

    //todo: validate size of picture (use useForm validators??)
    //todo: display picture when loaded, and cut it accordingly

    const onFormSubmit = (data) => {
        let formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append('steps', JSON.stringify(useSteps))
        formData.append('ingredients', JSON.stringify(useIngredients))

        if (data.picture_file.length > 0) {
            //todo: I would rather have rename of picture on backend
            let filename = (Math.random() + 1).toString(36).substring(2);
            formData.append("picture_file", data.picture_file[0], filename + ".jpg");
        }

        onSubmit(formData)
    }

    const submitButton = initialData.length > 0 ? "save" : "create"

    return (
        <Container>
            <Form noValidate onSubmit={handleSubmit(onFormSubmit)}>
                <Form.Group controlId={'title'} className="mb-3" as={Row}>
                    <Form.Label column sm={2}>Title: </Form.Label>
                    <Col md={10} lg={9}>
                        <Form.Control type={'text'} placeholder={'Title'} {...register('title', {
                            required: requiredValidator(),
                            maxLength: maxValidator(maxTitleLength),
                            minLength: minValidator(minTitleLength),
                            value: initialData?.title
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
                            minLength: minValidator(minDescriptionLength),
                            value: initialData?.description
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
                        {/* todo: picture edit */}
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
                            {submitButton}
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>
    )
}