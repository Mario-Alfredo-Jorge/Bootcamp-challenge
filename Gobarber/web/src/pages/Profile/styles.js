import styled from 'styled-components';
import { darken } from 'polished'

export const Container = styled.div`
    margin: 50px auto;
    max-width: 600px;
  
    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        span {
            color: #fb6f91;
            align-self: flex-start;
            margin-bottom: 8px;
            font-weight: bold;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #3b9eff;
            font-weight: bold;
            color: #fff;
            border-radius: 4px;
            border: 0;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.04, '#3b9eff')};
            }
        }

        hr {
            height: 1px;
            margin: 10px 0 20px;
        }
    }

    > button {
        margin: 15px 0 0;
        height: 44px;
        width: 100%;
        background: #f64c75;
        font-weight: bold;
        color: #fff;
        border-radius: 4px;
        border: 0;
        font-size: 16px;
        transition: background 0.2s;

        &:hover {
            background: ${darken(0.08, '#f64c75')};
        }
        }
`;
