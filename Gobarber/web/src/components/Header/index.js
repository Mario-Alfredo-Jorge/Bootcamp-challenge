import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Notifications from '../Notifications';
import { Container, Content, Profile } from './styles';
import logo from '../../assets/logo-purple.svg'
import perfil from '../../assets/mario.jpg'

function Header(){

    const profile = useSelector(state => state.user.profile);
    console.tron.log(profile)
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="GoBarber"/>
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>

                <aside>
                    <Notifications />
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img src={ profile.avatar || perfil} alt="MAJ"/>
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}

export default Header;
