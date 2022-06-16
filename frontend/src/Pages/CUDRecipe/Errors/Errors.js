import React from "react"

export default function Errors({errors}) {

    //todo dynamically added errors (yup schema?)
    //todo make errors less ugly

    return (
        <p>
            {errors?.message}
        </p>
    )
}