import RecipeForm from "./RecipeForm/RecipeForm";
import axios from "axios";
import {recipesAPI} from "../../App/axious";
import {useNavigate} from "react-router-dom";

export default function Add() {

    const navigate = useNavigate()

    const onSubmit = (data) => {
        axios.post(recipesAPI, data, {
            headers: {
                'Content-type': 'multipart/form-data',
                'Content-Disposition': 'inline; name=picture_file; filename=picture_file'
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    navigate("/" + response.data.id)
                }
            })
            .catch((error) => {

                //todo: error
                console.log(error)
            })
    }

    return (
        <RecipeForm onSubmit={onSubmit}/>
    )
}