import React from "react"
import {Form} from "react-bootstrap";

function RecipeTypesCheckBoxes({register}) {
    return (
    <React.Fragment>
        <Form.Check value={'breakfast'} label={'Breakfasts'} id={'breakfast'} className={'mx-2'}
                                {...register('types')}/>

                    <Form.Check value={'dinner'} label={'Dinners'} id={'dinner'} className={'mx-2'}
                                {...register(('types'))}/>

                    <Form.Check value={'dessert'} label={'Desserts'} id={'dessert'} className={'mx-2'}
                                {...register(('types'))}/>

                    <Form.Check value={'salad'} label={'Salads'} id={'salad'} className={'mx-2'}
                                {...register(('types'))} />

                    <Form.Check value={'snack'} label={'Snacks'} id={'snack'} className={'mx-2'}
                                {...register(('types'))} />
    </React.Fragment>
    )
}

export default RecipeTypesCheckBoxes