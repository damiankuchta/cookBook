export const maxValidator = (max) => ({
    value: max,
    message: "Too many characters"
})

export const minValidator = (min) => ({
    value: min,
    message: "Too little characters"
})

export const requiredValidator = () => ({
    value: true,
    message: "Field required"
})