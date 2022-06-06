import axios from "axios";

axios.defaults.baseURL = "https://mockend.com/damiankuchta/cookBook"
axios.defaults.timeout = 10000

export const recipesAPI = "/recipes"
export const recipeAPI = (id) => {
    return recipesAPI + "/" + id
}