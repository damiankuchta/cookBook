import React from "react"
import {Card, Col, Form, ListGroup, Row} from "react-bootstrap";

export default function ListContainer({list, component: Component}) {


    return (
        <Row>
            <Col lg={2}/>
            <Col lg={9}>
                <ListGroup variant={"flush"}>
                    {list.map((item) =>
                        (
                            <ListGroup.Item className={'mb-3'}>
                                <Component {...item}/>
                            </ListGroup.Item>
                        )
                    )}
                </ListGroup>
            </Col>
        </Row>
    )
}