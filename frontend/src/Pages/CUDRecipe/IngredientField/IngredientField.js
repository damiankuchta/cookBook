import React, {useState} from "react"
import {Button, Col, Form, Row} from "react-bootstrap";
import Errors from "../Errors/Errors";

import {maxValidator, minValidator, requiredValidator} from "../utils";
import {maxProductLength, minProductLength} from "../config";
import {useForm} from "react-hook-form";

export default function IngredientField({
                                            errors,
                                            register,
                                            addEditItem,
                                            isEdited = false,
                                            initialData = {}
                                        }) {

    const button = !isEdited ? "Add ingredient" : "Save"
    const label = !isEdited ? <Form.Label column sm={10} md={2}>Ingredient</Form.Label> : <Col sm={10} md={2}/>

    return (
        <Form.Group controlId={"ingredient"} className="mb-3" as={Row}>
            {label}
            <Col xs={5} md={3} lg={4}>
                <Form.Control type="text" placeholder={'Product'} {...register('product', {
                    maxLength: maxValidator(maxProductLength),
                    minLength: minValidator(minProductLength),
                    required: requiredValidator(),
                    value: initialData?.props?.product
                })}/>
                <Errors errors={errors?.product}/>
            </Col>

            <Col xs={3} md={2}>
                <Form.Control type="number" placeholder={'Amount'}
                              {...register('amount', {
                                  required: requiredValidator(),
                                  value: initialData?.props?.amount
                              })}/>
                <Errors errors={errors?.amount}/>
            </Col>
            <Col xs={4} md={2} lg={1}>
                <Form.Select {...register('unit', {
                    required: requiredValidator(),
                    validate: value => value !== "Chose product unit" || "Chose product unit!",
                    value: initialData?.props?.unit
                })}>
                    <option>Chose product unit</option>
                    <option>KG</option>
                    <option>g</option>
                    <option>L</option>
                    <option>ml</option>
                    <option>Units</option>
                </Form.Select>
                <Errors errors={errors?.unit}/>
            </Col>
            <Col xs={12} md={3} lg={2}>
                <Button className={'w-100'} onClick={addEditItem}>
                    {button}
                </Button>
            </Col>
        </Form.Group>
    )
}