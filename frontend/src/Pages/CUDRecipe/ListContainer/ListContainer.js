import React, {useCallback, useMemo} from "react"
import {Col, Row, ListGroup} from "react-bootstrap";
import update from 'react-addons-update';
import DnDItem from "../DnDItem/DnDItem";


export default function ListContainer({list, component: Component, setItem}) {


    const moveItem = useCallback((dragIndex, hoverIndex) => {
        setItem((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, [])



    return (
        <Row>
            <Col lg={2}/>
            <Col lg={9}>
                <ListGroup variant={'flush'}>
                        {list.map((item, index) =>
                            (
                                <DnDItem {...item.functions} index={index} moveItem={moveItem} id={item.props.id}>
                                    <Component {...item.props}/>
                                </DnDItem>
                            )
                        )}
                </ListGroup>
            </Col>
        </Row>
    )
}
