export const API_BASE_URL = window.location.origin + "/api"
export const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=769821807770861568&redirect_uri${encodeURIComponent(process.env.DISCORD_OAUTH_URL)}=&response_type=code&scope=identify`
export const DISCORD_CDN_BASE_URL = "https://cdn.discordapp.com"

export const MAX_UPLOAD_FILE_SIZE = 1024 * 1024 * 5 // 5MB