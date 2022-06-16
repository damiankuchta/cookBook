import React, {useCallback, useMemo, useState} from "react"
import {Col, Row, ListGroup} from "react-bootstrap";
import update from 'react-addons-update';
import DnDItem from "./DnDItem/DnDItem";
import EditableField from "../EditableField/EditableField";


export default function ListContainer({list, listItem: ListItem, setItem, editComponent: EditComponent}) {

    const [editIndex, setEditIndex] = useState(-1)

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

    const deleteItem = (index) => {
        setItem(item => {
            let newItemList = [...item]
            newItemList.splice(index, 1)
            return [...newItemList]
        })
    }

    const editItem = (index) => {
        setEditIndex(index)
    }

    return (
        <React.Fragment>
            <ListGroup variant={'flush'}>
                {list.map((item, index) =>
                    (
                        editIndex === index ?
                            <EditableField setItem={setItem}
                                           isEdited={true}
                                           index={index}
                                           setEditIndex={setEditIndex}
                                           initialData={item} component={EditComponent}/>
                            :
                            <DnDItem onEdit={editItem}
                                     onDelete={deleteItem}
                                     index={index}
                                     moveItem={moveItem}
                                     id={item.props.id}
                                     component={<ListItem {...item.props} index={index}/>}
                            />

                    )
                )}
            </ListGroup>
        </React.Fragment>
    )
}
