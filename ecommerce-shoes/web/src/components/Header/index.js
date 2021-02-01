import React from 'react';
import { Link } from 'react-router-dom'
import { MdShoppingBasket } from 'react-icons/md'
import { connect } from 'react-redux';

import { Container, Cart } from './style'
import logo from '../../assets/images/logo.png'

function Header({ cartSize }){
    return (
        <Container>

            <Link to="/">
                <img src={logo} alt="ROcketShoes" />
            </Link>

            <Cart to="/cart">
                <div>
                    <strong>Meu carrinho</strong>
                    <span>{cartSize} itens</span>
                </div>

                <MdShoppingBasket size={40} color='#fff' />
            </Cart>

        </Container>
    );
}

export default connect(state => ({
    cartSize: state.cart.length,
}))(Header);
