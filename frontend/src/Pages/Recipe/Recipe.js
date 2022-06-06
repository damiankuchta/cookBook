import React, {useEffect, useState} from "react"
import axios from "axios";
import Image from "react-bootstrap/Image"
import {useParams} from "react-router-dom";
import {recipeAPI} from "../../App/axious";

export default function Recipe() {

    const [useRecipe, setRecipe] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        axios.get(recipeAPI(id), {})
            .then((response) => {
                setRecipe(response.data)
                setIsLoaded(true)
            })
            .catch((error) => {
                //todo set client alert
                console.log(error)
            })
    },[])

    return (
        <div>
            {/*<Image src={useRecipe.recipePictureUrl} alt={}/>*/}
            {/*{isLoaded && useRecipe.title}*/}
        </div>
    )
}