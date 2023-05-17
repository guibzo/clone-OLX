import Cookies from "js-cookie"
import qs from "qs"

const BASEAPI = "http://alunos.b7web.com.br:501"

const apiFetchFile = async (endpoint, body) => {
    if(!body.token) {                           // cria o token automáticamente
        let token = Cookies.get("token")
        if(token) {
            body.append("token", token)
        }
    }

    const result = await fetch(BASEAPI+endpoint, {
        method: "POST",
        body
    })

    const json = await result.json()

    if(json.notallowed) {                   // verificação se o usuário realmente tá logado 
        window.location.href = "/signin"
        return
    }

    return json
}

const apiFetchPost = async (endpoint, body) => {
    if(!body.token) {                           // cria o token automáticamente
        let token = Cookies.get("token")
        if(token) {
            body.token = token
        }
    }

    const result = await fetch(BASEAPI+endpoint, {
        method: "POST",
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const json = await result.json()

    if(json.notallowed) {                   // verificação se o usuário realmente tá logado 
        window.location.href = "/signin"
        return
    }

    return json
}

const apiFetchGet = async (endpoint, body = []) => {
    if(!body.token) {                           // cria o token automáticamente
        let token = Cookies.get("token")
        if(token) {
            body.token = token
        }
    }

    const result = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`)
    const json = await result.json()

    if(json.notallowed) {                   // verificação se o usuário realmente tá logado 
        window.location.href = "/signin"
        return
    }

    return json
}

const olxAPI = {
    login: async (email, password) => {
        const json = await apiFetchPost(
            "/user/signin",
            {email, password}
        )
        return json
    },

    register: async(name, email, password, stateLocation) => {
        const json = await apiFetchPost(
            "/user/signup",
            {name, email, password, state: stateLocation}
        )
        return json
    },

    getStates: async () => {
        const json = await apiFetchGet(
            "/states"
        )
        return json.states
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            "/categories"
        )
        return json.categories
    },

    getAds: async (options) => {
        const json = await apiFetchGet(
            "/ad/list",
            options
        )
        return json
    },

    getAd: async (id, other = false) => {
        const json = await apiFetchGet(
            "/ad/item",
            {id, other}
        )
        return json
    },

    addAd: async (formData) => {
        const json = await apiFetchFile(
            "/ad/add",
            formData
        )
        return json
    }
}

export default () => olxAPI