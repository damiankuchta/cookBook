import React, {Fragment} from "react"
import {Placeholder} from "react-bootstrap";

export default function Description({title, description, isRecipeLoaded}) {

    return (
        isRecipeLoaded ?
            <Fragment>
                <h2>{title}</h2>
                <p>{description}</p>
            </Fragment>
            :
            <Fragment>
                <Placeholder className={'w-50'}/> <br/>
                <Placeholder className={'w-75'}/>
                <Placeholder className={'w-75'}/>
                <Placeholder className={'w-75'}/>
                <Placeholder className={'w-75'}/> <br/>
                <Placeholder className={'w-25'}/>
            </Fragment>

    )
}