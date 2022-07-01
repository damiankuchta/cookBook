import axios from "axios";

// axios.defaults.baseURL = "https://mockend.com/damiankuchta/cookBook/"
axios.defaults.baseURL = "http://127.0.0.1:8000/api/"
axios.defaults.timeout = 10000

export const recipesAPI = "recipes/"
export const recipeAPI = (id) => {
    return recipesAPI + id
}
export const recipeApiPage = (page) => {
    return recipesAPI + "?page=" + page
}

export const recipeApiPageSort = (page, sortBy, sortDirection) => {
    return recipeApiPage(page) + "&ordering=" + sortDirection + sortBy
}

export const recipeApiPageSortTypes = (page, sortBy, sortDirection, types, title) => {
    return recipeApiPageSort(page, sortBy, sortDirection) + "&types="
        + encodeURIComponent(types) + "&title=" + title
}

export const ingredientsApi = "ingredient/"
export const ingredientApi = (id) => {
    return ingredientsApi + id
}

