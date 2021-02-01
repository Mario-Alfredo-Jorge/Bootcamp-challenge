import styled from 'styled-components';
import { Link } from 'react-router-dom'


export const Container = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 50px 0;


    img {
        width: 250px;
        height: 50px;
    }
`;

export const Cart = styled(Link)`
    display: flex;
    align-items: center;
    transition: opacity .2s;
    text-decoration: none;

    &:hover {
        opacity: .6;
    }

    div {
        margin-right: 10px;
        text-align: right;

        strong {
        font-weight: normal;
        display: block;
        color: #fff;
        }

        span {
            font-size: 12px;
            color: #999;
        }
    }


`;
