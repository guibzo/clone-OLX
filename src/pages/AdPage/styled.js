import styled from "styled-components";

export const Fake = styled.div`
    background-color: #ddd;
    height: ${props => props.height || 20}px;
`

export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .box {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 4px #999;
        margin-bottom: 20px;
    }
    .box-padding {
        padding: 10px;
    }

    .leftSide {
        flex: 1;
        margin-right: 20px;

        .box {
            display: flex;
        }

        .adImage {
            width: 320px;
            height: 320px;
            margin-right: 20px;

            .each-slide img {
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: cover;
                height: 320px;
            }
        }
        .adInfo {
            flex: 1;

            .adName {
                margin-bottom: 20px;

                h2 {
                    margin: 0;
                    margin-top: 20px;
                }
                small {
                    color: #999;
                }
            }
            .adDescription {

                small {
                    color: #999;
                }
            }
        }
    }
    .rightSide {
        width: 250px;

        .price span {
            color:#00f;
            display: block;
            font-size: 27px;
            font-weight: bold;
        }

        .contactSellerLink {
            background-color: #00f;
            color: #fff;
            height: 30px;
            border-radius: 5px;
            box-shadow: 0px 0px 4px #999;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            margin-bottom: 20px;
        }

        .createdBy small {
            display: block;
            color: #887;
            margin-top: 10px;
        }
    }

    @media (max-width: 600px) {
        flex-direction: column;

        .leftSide {
            margin: 0;

            .box {
                margin: auto;
                width: 320px;
                flex-direction: column;

                .adInfo {
                    padding: 10px;
                }
            }
        }

        .rightSide {
            width: auto;
            margin-top: 20px;

            .box {
                width: 320px;
                margin: auto;
            }

            .contactSellerLink {
                width: 320px;
                margin: 20px auto;
            }
        }
    }
`

export const OthersArea = styled.div`
    h2 {
        font-size: 20px;   
    }
    .list {
        display: flex;
        flex-wrap: wrap;

        .aditem {
            width: 25%;
        }
    }

    @media (max-width: 600px) {
        &, h2 {
            margin: 10px;
        }

        .list .aditem {
            width: 50%;
        }
    }
`

export const BreadCrumb = styled.div`
    font-size: 13px;
    margin-top: 20px;

    a {
        display: inline-block;
        margin: 0 5px;
        text-decoration: underline;
        color: #000;
    }

    @media (max-width: 600px) {
        margin: 20px;
    }
`