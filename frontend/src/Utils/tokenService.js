export const saveToken = (token) => {
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
}

export const saveDetails = (data) => {
   localStorage.setItem('user', data)
}