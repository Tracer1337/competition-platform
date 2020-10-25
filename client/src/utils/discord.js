import { DISCORD_CDN_BASE_URL } from "../config/constants.js"

export function getAvatarURL(user) {
    return `${DISCORD_CDN_BASE_URL}/avatars/${user.id}/${user.avatar}`
}