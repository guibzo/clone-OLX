import Cookies from "js-cookie"

export const isLogged = () => {              // verificação se tá logado
    let token = Cookies.get("token")
    return (token) ? true : false
}

export const doLogin = (token, rememberPassword = false) => {        // processo de login de fato
    if(rememberPassword) {
        Cookies.set("token", token, { expires:999 })                 // demora 999d pra expirar
    } else {
        Cookies.set("token", token)
    }
}

export const doLogout = () => {
    Cookies.remove("token") 
}