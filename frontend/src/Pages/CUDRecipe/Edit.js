import RecipeForm from "./RecipeForm/RecipeForm";
import {useEffect, useState} from "react";
import axios from "axios";
import {recipeAPI} from "../../App/axious";
import {useNavigate, useParams} from 'react-router-dom';



export default function Edit() {

    const navigate = useNavigate()
    const {id} = useParams()

    const [useRecipe, setRecipe] = useState()
    const [isRecipeLoaded, setRecipeLoaded] = useState(false)

    const onSubmit = (data) => {
        axios.put(recipeAPI(id) + "/", data, {
            headers: {
                'Content-type': 'multipart/form-data',
                'Content-Disposition': 'inline; name=picture_file; filename=picture_file'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    navigate("/" + id)
                }
            })
            .catch(error => {

                //todo
                console.log(error)
            })
    }

    useEffect(() => {
        if (id) {
            axios.get(recipeAPI(id), {})
                .then(response => {
                    if (response.status === 200) {
                        setRecipe({...response.data, ingredients: response.data.ingredients, steps: response.data.steps})
                        setRecipeLoaded(true)
                    }
                })
                .catch(error => {

                    //todo: alert
                    console.log(error)
                })
        } else {
            setRecipeLoaded(true)
        }
    }, [id])

    return (
        isRecipeLoaded && <RecipeForm onSubmit={onSubmit} initialData={useRecipe}/>
    )
}