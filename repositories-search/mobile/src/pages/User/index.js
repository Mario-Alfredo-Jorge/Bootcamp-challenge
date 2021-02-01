import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native'

import {
    Container,
    Avatar,
    Name,
    Bio,
    Header,
    Stars,
    Starred,
    Info,
    OwnerAvatar,
    Title,
    Author
} from './style'
import api from '../../services/api'


class User extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name,
    })

    state = {
        star: [],
        loading: false,
        pages: 2,
        refreshing: false,
    }

    takeUserData(){
        const { navigation } = this.props;
        const  users = navigation.getParam('user')

        return users;
    }

    async componentDidMount(){

        const users = this.takeUserData();

        try{
            this.setState({ loading: true });
            const response = await api.get(`users/${users.login}/starred`);

            this.setState({
                star: response.data,
                loading: false,
            });

        }catch(err){
            console.log('error:', err)
        }
    }

    readMore = async () => {

        const users = this.takeUserData();
        const { pages } = this.state;
        this.setState({ loading: true })

        try{
            const response = await api.get(`/users/${users.login}/starred?page=${pages}`)

            await this.setState({
                star: response.data,
                loading: false,
                pages: pages + 1,
            });

        }catch(err){
            console.log('error: ', err);
        }

    }

    refreshList = async () => {

        await this.setState({ refreshing: true, pages: 1});

        const users = this.takeUserData();

        const { pages } = this.state;

        try{
            const reponse = await api.get(`/users/${users.login}/starred?page=${pages}`);

            this.setState({
                star: reponse.data,
                refreshing: false,
                pages: 1,
            })
        }catch(err){
            console.log('error: ', err);
        }
    }

    handlenavigate = (page) => {
        const { navigation } = this.props;

        navigation.navigate('Webview', { page })
    }

    render(){

        const { star, loading } = this.state

        const { navigation } = this.props;
        const user = navigation.getParam('user');

        return(
            <Container>

                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                {
                    loading ? <ActivityIndicator color='#7159c1' size={60} /> : (
                        (star.length != 0) ? (
                            <Stars
                                onEndReachedThreshold={0.2}
                                onEndReached={this.readMore}
                                onRefresh={this.refreshList}
                                refreshing={this.state.refreshing}
                                data={star}
                                keyExtractor={star => String(star.id)}
                                renderItem={({ item }) => (
                                    <Starred>

                                        <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                                        <Info>
                                            <Title onPress={() => this.handlenavigate(item)}>{item.name}</Title>
                                            <Author>{item.owner.login}</Author>
                                        </Info>

                                    </Starred>
                                )}
                            />
                        ): (
                            <View style={{ flex: 1, color:'#333', alignItems: "center", marginTop: 70, }}>
                                <Text>There are not starred repositories</Text>
                            </View>
                        )
                    )
                }

            </Container>

        )
    }
}

export default User;
