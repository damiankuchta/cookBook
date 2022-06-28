import React from "react"
import {useForm} from "react-hook-form";

export default function EditableField({
                                          setItem,
                                          index,
                                          setEditIndex,
                                          isEdited = false,
                                          initialData = {},
                                          component: Component,
                                      }) {

    const {
        register, watch, reset, trigger, formState: {errors}
    } = useForm()

    const addEditItem = (e) => {
        const form = watch()
        e.preventDefault()

        function add(items) {
            return [...items, {...form}]
        }

        function edit(items) {
            let newItems = [...items]
            newItems[index] = {...newItems[index], ...form}
            setEditIndex(-1)
            return [...newItems]
        }


        trigger()
            .then(isOk => {
                if (isOk) {
                    setItem((items => {
                        return (isEdited ? edit(items) : add(items))
                    }))
                    reset()
                }
            })
    }
    return (
        <Component isEdited={isEdited}
                   register={register}
                   errors={errors}
                   initialData={initialData}
                   addEditItem={addEditItem}/>
    )
}