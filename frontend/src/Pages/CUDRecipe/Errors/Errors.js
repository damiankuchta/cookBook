import React from "react"

export default function Errors({errors}) {

    //todo make errors less ugly

    return (
        <p>
            {errors?.message}
        </p>
    )
}