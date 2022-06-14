import React, {Fragment, useEffect, useState} from "react"
import recipePlaceholder from "../../Static/recipePlaceholder.jpg"


export default function ImageWithPlaceholder({element, placeholder = recipePlaceholder,}) {

    const [isImgLoaded, setIsImgLoaded] = useState(false)

    useEffect(() => {
        React.Children.only(element)
        //todo validate -> children has no children
        //todo validate -> element is <IMG>
    }, [])

    return (
        <Fragment>
            {React.cloneElement(React.Children.toArray(element)[0], {
                onLoad: () => setIsImgLoaded(true),
                style: {display: isImgLoaded ? "block" : "none"},
                key: "loadedPictureKey"
            })}
            {React.cloneElement(React.Children.toArray(element)[0], {
                style: {display: isImgLoaded ? "none" : "block"},
                src: placeholder,
                key: "notLoadedPictureKey"
            })}
        </Fragment>
    )
}