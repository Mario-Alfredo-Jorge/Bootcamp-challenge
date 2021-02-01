import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'

import logo from '../../assets/logo.svg'
import { signUpRequest } from '../../store/module/auth/actions'

function SignUp() {

    const dispatch = useDispatch()

    const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório.'),
        email: Yup.string().email("Insira um e-mail válido")
            .required("O e-mail é obrigatório."),
        password: Yup.string().min(6, '6 caracteres no minímo')
            .required('Insira a sua password')
    })

    function handleSubmit({ name, email, password }) {
        dispatch(signUpRequest(name, email, password))
    }

    return (
        <>
            <img src={logo} alt="GoBarber"/>

            <Form onSubmit={handleSubmit} schema={schema}>
                <Input name="name" type="text" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="Seu email" />
                <Input name="password" type="password" placeholder="Sua senha secreta" />

                <button type="submit">Acessar</button>
                <Link to="/">Já tenho conta</Link>
            </Form>
        </>
    );
}

export default SignUp;
