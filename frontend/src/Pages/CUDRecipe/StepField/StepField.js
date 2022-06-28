import React from "react"
import {Button, Col, Form, Row} from "react-bootstrap";
import {requiredValidator} from "../utils";
import Errors from "../Errors/Errors";

export default function StepField({
                                      errors,
                                      register,
                                      addEditItem,
                                      isEdited = false,
                                      initialData = {}
                                  }) {

    const button = !isEdited ? "Add Step" : "Save"

    return (
        <Form.Group controlId={"step"} className="mb-3" as={Row}>
            <Form.Label column sm={2}>Add step</Form.Label>
            <Col md={7} lg={7}>
                <Form.Control type="text" placeholder={'Step'}
                              {...register("step", {
                                  required: requiredValidator(),
                                  value: initialData?.step
                              })}/>

                <Errors errors={errors?.step}/>
            </Col>

            <Col xs={12} md={3} lg={2}>
                <Button className={'w-100'} onClick={addEditItem}>
                    {button}
                </Button>
            </Col>
        </Form.Group>
    )
}