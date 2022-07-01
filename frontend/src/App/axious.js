import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/"
axios.defaults.timeout = 10000

export const recipesAPI = "recipes/"

export const recipeAPI = (id) => {
    return recipesAPI + id
}

export const ingredientsApi = "ingredient/"

export const ingredientApi = (id) => {
    return ingredientsApi + id
}

