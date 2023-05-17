import styled from "styled-components"

export const Item = styled.div`
    a {
        display: block;
        border: 1px solid #fff;
        background-color: #fff;
        margin: 10px;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        color: #000;
        transition: all ease 0.3s;

        &:hover {
            background-color: #EEE;
            border: 1px solid #CCC;
        }

        .itemImage img {
            width: 100%;
            border-radius: 5px;   
        }
        .itemName {
            font-weight: bold;
        }
    }
`