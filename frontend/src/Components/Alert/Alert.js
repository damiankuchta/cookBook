import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {hideAlert} from "../../Reducers/alertSlice";
import {Alert as BAlert} from "react-bootstrap";

export default function Alert() {

    const message = useSelector((state) => state.alert.messages)
    const dispatch = useDispatch()
    const displayAlert = useSelector(state => (state.alert.displayAlert))

    console.log(displayAlert)

    const closeAlert = () => {
        dispatch(hideAlert())
    }

    return (
        displayAlert && <BAlert show={displayAlert} key={'danger'} variant={'danger'} onClose={closeAlert} dismissible>
            {message}
        </BAlert>
    )
}