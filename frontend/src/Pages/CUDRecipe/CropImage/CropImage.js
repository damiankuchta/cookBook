import React, {useEffect, useRef, useState} from "react"
import ReactCrop, {centerCrop, makeAspectCrop} from "react-image-crop";
import {Image} from "react-bootstrap";

import placeholderImg from "../../../Static/recipePlaceholder.jpg";

import 'react-image-crop/dist/ReactCrop.css'
import '../CropImage/CropImage.css'

export default function CropImage({defaultImage, setCroppedImage, uploadedFile}) {

    const [image, setImage] = useState()
    const [crop, setCrop] = useState()
    const imageRef = useRef(null)
    const canvasRef = useRef(document.createElement("canvas"))

    //set image for a preview
    useEffect(() => {
        if (!uploadedFile) {
            setImage(undefined)
            return
        }

        let objectUrl

        if (uploadedFile.length > 0) {
            objectUrl = URL.createObjectURL(uploadedFile[0])
            setImage(objectUrl)
        } else {
            setImage(null)
        }

        return () => URL.revokeObjectURL(objectUrl)
    }, [uploadedFile])

    //on image load, set the crop
    const onImageLoad = (e) => {
        const {naturalWidth: width, naturalHeight: height} = e.currentTarget;
        const higherValue = height > width ? {height: 100} : {width: 100}
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    ...higherValue
                },
                16 / 10.64,
                width,
                height
            ),
            width,
            height
        )
        //
        setCrop(crop)
    }

    const onCropComplete = (crop, percentCrop) => {

        let canvas = canvasRef.current
        let image = imageRef.current

        const ctx = canvas.getContext('2d')
        if (!ctx) {
            throw new Error('No 2d context')
        }
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const pixelRatio = window.devicePixelRatio
        canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio)
        ctx.scale(pixelRatio, pixelRatio)
        ctx.imageSmoothingQuality = 'high'
        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY
        const centerX = image.naturalWidth / 2
        const centerY = image.naturalHeight / 2
        ctx.save()
        ctx.translate(-cropX, -cropY)
        ctx.translate(centerX, centerY)
        ctx.translate(-centerX, -centerY)
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
        )

        setCroppedImage(canvas)
    }

    const defaultImgSrc = defaultImage ? defaultImage : placeholderImg

    return (

        image ?
            <ReactCrop onChange={(c, percentageCrop) => setCrop(percentageCrop)} crop={crop}
                       onComplete={(c, pc) => onCropComplete(c, pc)}
                       locked={true}>
                <Image ref={imageRef} src={image} alt={'recipe picture'} onLoad={onImageLoad}/>
            </ReactCrop> : <Image src={defaultImgSrc} alt={'recipe picture'}/>

    )
}