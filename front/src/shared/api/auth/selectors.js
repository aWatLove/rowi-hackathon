export const isLoggedIn = (state) => state.auth.isLoggedIn
export const ID = (state) => state.auth?.user.id
export const ROLE = (state) => state.auth?.user.role
export const ACCESS_TOKEN = (state) => state.auth?.user.access_token
export const isAuth = (state) => !!state.auth?.user
export const USER = (state) => state.auth?.user
