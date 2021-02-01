import React, { Component } from 'react'
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../services/api'
import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Name,
    Bio,
    Avatar,
    ProfileButton,
    ProfileButtonText
} from './style';


export default class Main extends Component{
    static popTypes = {
        navogatin: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,

    }
    state = {
        newUser: '',
        Users: [],
        loading: false,
    }

    async componentDidMount(){
        const users = await AsyncStorage.getItem('users');

        if(users)
            this.setState({ Users: JSON.parse(users) })
    }

    async componentDidUpdate(_, prevState){

        const { Users } = this.state;

        if(prevState.Users != Users)
            await AsyncStorage.setItem('users', JSON.stringify(Users))

    }

    handleNavigate = (user) => {
        const { navigation } = this.props;

        navigation.navigate('User', { user });
    }

    handleSubmitButtom = async() => {

        const { newUser, Users } = this.state;
        this.setState({ loading: true })
        try {
            const response = await api.get(`/users/${newUser}`);

            const data = {
                name: response.data.name,
                login: response.data.login,
                bio: response.data.bio,
                avatar: response.data.avatar_url,
            }

            this.setState({
                Users: [...Users, data],
                newUser: '',
                loading: false,
            })

            Keyboard.dismiss();
        }
        catch(err){
            console.log('error', err);
        }
    }

    render(){
        const { newUser, Users, loading } = this.state
        return(
            <Container>
                <Form>

                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="add users"
                        value={newUser}
                        onChangeText={text => this.setState({ newUser: text })}
                        returnKeyType='send'
                        onSubmitEditing={this.handleSubmitButtom}
                    />

                    <SubmitButton loading={loading} onPress={this.handleSubmitButtom}>
                        {
                            loading ? <ActivityIndicator color='#fff' /> : <Icons name='add' size={20} color='#fff' />
                        }

                    </SubmitButton>
                </Form>

                <List
                    data={Users}
                    keyExtractor={Users => Users.login}
                    renderItem = { ({ item }) => (
                        <User>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>
                                {item.name}
                            </Name>
                            <Bio>
                                {item.bio}
                            </Bio>
                            <ProfileButton onPress={() => this.handleNavigate( item )}>
                                <ProfileButtonText>Ver perfil</ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                />
            </Container>
        );
    }
}

Main.navigationOptions = {
    title: 'Users',
}
