import React from 'react'

export default function Ingredient({product, amount, unit}) {

    return (
        <React.Fragment>
            {product}
            {amount}
            {unit}
        </React.Fragment>
    )
}