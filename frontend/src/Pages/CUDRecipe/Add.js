import RecipeForm from "./RecipeForm/RecipeForm";
import axios from "axios";
import {recipesAPI} from "../../App/axious";
import {useNavigate} from "react-router-dom";
import {axiosErrors} from "../../utils/axiosErrors";
import {setError} from "../../Reducers/alertSlice";
import {useDispatch} from "react-redux";

export default function Add() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
           .catch((error) => axiosErrors(error, dispatch, setError));
    }

    return (
        <RecipeForm onSubmit={onSubmit}/>
    )
}