import React from "react"

export default function Errors({errors}) {

    //todo dynamically added errors (yup schema?)

    return (
        <p>
            {errors?.message}
        </p>
    )
}