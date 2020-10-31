import { useSelector } from "react-redux"

function Auth({ roles, userId, shouldRender, children }) {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)
    const user = useSelector(store => store.auth.user)

    if (!isLoggedIn) {
        return null
    }

    if (user.role.name === "Admin") {
        return children
    }

    if (roles && !roles.includes(user.role.name)) {
        return null
    }

    if (userId && userId !== user.id) {
        return null
    }

    if (shouldRender && !shouldRender(user)) {
        return null
    }

    return children
}

export default Auth