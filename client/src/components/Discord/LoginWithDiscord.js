import React, { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import LoadingButton from "../Styled/LoadingButton.js"
import { createListeners } from "../../utils"
import { DISCORD_OAUTH_URL } from "../../config/constants.js"
import { login } from "../../store/actions.js"
import { getProfile, setTokenHeader } from "../../config/api.js"

function LoginWithDiscord({ onSuccess }) {
    const dispatch = useDispatch()

    const popup = useRef()

    const [isLoading, setIsLoading] = useState(false)
    
    const handleClick = () => {
        const width = 1000
        const height = 800

        const x = window.innerWidth / 2 - width / 2
        const y = window.innerHeight / 2 - height / 2

        popup.current = window.open(DISCORD_OAUTH_URL, "Login with Discord", `width=${width},height=${height},left=${x},top=${y}`)
    }

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.source === "oauth" && popup.current) {
                popup.current.close()
                
                if (event.data.status === "ok") {
                    setIsLoading(true)

                    setTokenHeader(event.data.payload.token)

                    getProfile().then(res => {
                        dispatch(login({
                            user: res.data,
                            token: event.data.payload.token
                        }))
                        
                        setIsLoading(false)
                        onSuccess()
                    })
                }
            }
        }

        return createListeners(window, [
            ["message", handleMessage]
        ])
    })
    
    return (
        <LoadingButton isLoading={isLoading} variant="contained" onClick={handleClick}>Login With Discord</LoadingButton>
    )
}

export default LoginWithDiscord