import React, {useRef, useState} from 'react'
import {Button, Col, ListGroup, Row} from "react-bootstrap";
import {useDrag, useDrop} from 'react-dnd'

export default function DnDItem({
                                    component: Component,
                                    onDelete,
                                    onEdit,
                                    index,
                                    moveItem,
                                    id,
                                    editComponent: EditComponent
                                }) {

    const ref = useRef(null)

    const onDeleteButtonClick = () => {
        onDelete(index)
    }

    const onEditButtonClick = () => {
        onEdit(index)
    }

    const [{handlerId}, drop] = useDrop({
        accept: "listItem",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveItem(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{isDragging}, drag] = useDrag({
        type: "listItem",
        item: () => {
            return {id, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),

        }),
    })

    drag(drop(ref))
    const opacity = isDragging ? 0.5 : 1

    return (
        <ListGroup.Item ref={ref} data-handler-id={handlerId} style={{cursor: "grab", opacity: opacity}}
                        className={'mb-3'}>
            <Row>
                <Col md={2}/>
                <Col xs={6} md={5}>
                    {Component}
                </Col>

                <Col xs={3} md={2}>
                    <Button onClick={onEditButtonClick} variant={'warning'} className={'p-0 w-100'}>
                        Edit
                    </Button>
                </Col>

                <Col xs={3} md={2}>
                    <Button onClick={onDeleteButtonClick} variant={'danger'} className={'p-0 w-100'}>
                        Delete
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}