import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import { signInRequest } from '../../store/module/auth/actions';

const schema = Yup.object().shape({
    email: Yup.string().email("Insira um e-mail válido")
        .required("O e-mail é obrigatório."),
    password: Yup.string().min(6, '6 caracteres no minímo')
        .required('Insira a sua password')
})

function SignIn() {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit({ email, password }){
        dispatch(signInRequest(email, password))
    }

    return (
        <>
            <img src={logo} alt="GoBarber"/>

            <Form onSubmit={handleSubmit} schema={schema} >
                <Input name="email" type="email" placeholder="Seu email" />
                <Input name="password" type="password" placeholder="Sua senha secreta" />

                <button type="submit">{loading? 'Carregando...' : 'Acessar' }</button>
                <Link to="/signup">Criar conta gratuita</Link>
            </Form>
        </>
    );
}

export default SignIn;
