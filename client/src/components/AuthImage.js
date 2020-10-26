import React, { useState, useEffect } from "react"

import { getFileFromStorage } from "../config/api.js"

const cache = new Map()

function AuthImage({ filename, alt = "", ...props }) {
    const [image, setImage] = useState(cache.get(filename))

    useEffect(() => {
        if (!image) {
            getFileFromStorage(filename)
                .then(async res => {
                    const src = URL.createObjectURL(res.data)
                    cache.set(filename, src)
                    setImage(src)
                })
        }

        // eslint-disable-next-line
    }, [filename])

    return (
        <img src={image} alt={alt} {...props}/>
    )
}

export default AuthImage