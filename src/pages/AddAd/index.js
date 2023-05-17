import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import MaskedInput from "react-text-mask"
import createNumberMask from "text-mask-addons/dist/createNumberMask"

import useAPI from "../../utils/olxAPI";

import { PageArea } from "./styled"
import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents"

const Page = () => {
    const api = useAPI()
    const fileField = useRef()
    const history = useNavigate()

    const [categories, setCategories] = useState([])        // !! não confundir com o abaixo

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")            // !! não confundir com o acima
    const [price, setPrice] = useState("")
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [desc, setDesc] = useState("")

    const [disabled, setDisabled] = useState(false)         // pra ser usado no loading e impedir o funcionamento dos campos
    const [error, setError] = useState("")

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories()
            setCategories(cats)
        }
        getCategories()
    }, []) 

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisabled(true)
        setError("")
        let errors = []

        if(!title.trim()) {
            errors.push("Sem título adicionado")
        }
        if(!category) {
            errors.push("Sem categoria adicionada")
        }

        if(errors.length === 0) {

            const formData = new FormData()
            formData.append("title", title)
            formData.append("price", price)
            formData.append("priceneg", priceNegotiable)
            formData.append("desc", desc)
            formData.append("cat", category)

            if(fileField.current.files.length > 0) {
                for(let i = 0; i < fileField.current.files.length; i++) {
                    formData.append("img", fileField.current.files[i])
                }
            }

            const json = await api.addAd(formData)

            if(!json.error) {
                history(`/ad/${json.id}`)
                return
            } else {
                setError(json.error)
            }

        } else {
            setError(errors.join("\n"))
        }

        setDisabled(false)
    }

    const priceMask = createNumberMask({
        prefix: "R$ ",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ".",
        allowDecimal: true,
        decimalSymbol: ","
    })

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>

            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">Título</div>
                        <div className="area-input">
                            <input
                                type="text"
                                disabled={disabled}
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Categoria</div>
                        <div className="area-input">
                            <select
                                disabled={disabled}
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option></option>
                                {categories && categories.map(i =>
                                    <option key={i._id} value={i._id}>{i.name}</option>    
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Preço</div>
                        <div className="area-input">
                            <MaskedInput 
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Preço Negociável</div>
                        <div className="area-input checkbox-reset">
                            <input
                                type="checkbox"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e => setPriceNegotiable(!priceNegotiable)}        // inverte os valores
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Descrição</div>
                        <div className="area-input">
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            ></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Imagens (1 ou mais)</div>
                        <div className="area-input">
                            <input 
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple                // atributo pra declarar que é aceito mais de 1 arquivo
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page