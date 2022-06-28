import React from "react"

export default function IngredientListItem({product, amount, unit}) {
    return (
        <React.Fragment>
            {product}
            {amount}
            {unit}
        </React.Fragment>
    )
}