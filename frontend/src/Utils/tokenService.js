export const saveToken = (token) => {
    localStorage.setItem('isLoggedIn', true)
    localStorage.setItem('auth-token', token)
}
export const getToken = () => {
    return localStorage.getItem('auth-token')
}
export const hasToken = () => {
    return !!getToken()
}

export const removeToken = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('isLoggedIn')
}

export const saveDetails = (data) => {
   localStorage.setItem('user', data)
}