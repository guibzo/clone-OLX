import React, { useState , useEffect} from "react";

import useAPI from "../../utils/olxAPI";
import { doLogin } from "../../utils/authHandler";

import { PageArea } from "./styled"
import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents"

const Page = () => {
    const api = useAPI()

    const [name, setName] = useState("")
    const [stateLocation, setStateLocation] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [stateList, setStateList] = useState([])          // referente aos estados brasileiros

    const [disabled, setDisabled] = useState(false)         // pra ser usado no loading e impedir o funcionamento dos campos
    const [error, setError] = useState("")

    useEffect(() => {
        const getStates = async () => {
            const stList = await api.getStates()
            setStateList(stList)
        }
        getStates()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisabled(true)
        setError("")

        if(password !== confirmPassword) {
            setError("As senhas digitadas não são as mesmas.")
            setDisabled(false)
            return
        }

        const json = await api.register(name, email, password, stateLocation)       // retorna o token
        
        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token)                 // ao fim cadastro, usuário já entra logado
            window.location.href = "/"
        }
        

        setDisabled(false)
    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>

            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">Nome Completo</div>
                        <div className="area-input">
                            <input
                                type="text"
                                disabled={disabled}
                                value={name}
                                onChange={event => setName(event.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Estado</div>
                        <div className="area-input">
                            <select value={stateLocation} onChange={event => setStateLocation(event.target.value)} required>
                                <option></option>
                                {stateList.map((i, key) =>
                                    <option key={key} value={i._id}>{i.name}</option>    
                                )}
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Email</div>
                        <div className="area-input">
                            <input
                                type="email"
                                disabled={disabled}
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Senha</div>
                        <div className="area-input">
                            <input
                                type="password" 
                                disabled={disabled}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                required
                             />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Confirmar senha</div>
                        <div className="area-input">
                            <input
                                type="password" 
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={event => setConfirmPassword(event.target.value)}
                                required
                             />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page