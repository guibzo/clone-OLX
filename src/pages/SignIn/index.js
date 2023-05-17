import React, { useState } from "react";

import useAPI from "../../utils/olxAPI";
import { doLogin } from "../../utils/authHandler";

import { PageArea } from "./styled"
import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents"

const Page = () => {
    const api = useAPI()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberPassword, setRememberPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)         // pra ser usado no loading e impedir o funcionamento dos campos
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisabled(true)
        setError("")

        const json = await api.login(email, password)

        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token, rememberPassword)       // salva o cookie
            window.location.href = "/"
        }

        setDisabled(false)
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>

            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
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
                        <div className="area-title">Lembrar Senha</div>
                        <div className="area-input">
                            <input
                                type="checkbox"
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={() => setRememberPassword(!rememberPassword)}      // toggle no checkbox de rememberPassword
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page