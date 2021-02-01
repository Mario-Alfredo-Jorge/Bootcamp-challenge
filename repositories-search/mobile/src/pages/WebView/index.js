import React,{ Component } from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator, View } from 'react-native'

import api from '../../services/api'

class Webview extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('page').name
    })

    state = {
        repository: '',
        loading: false
    }

    async componentDidMount(){
        const { navigation } = this.props

        const repository = navigation.getParam('page')
        this.setState({ loading: true })

        try{
            const response = await api.get(`repos/${repository.owner.login}/${repository.name}`);

            this.setState({
                repository: response.data.html_url,
                loading: false,
            })
        }catch(err){
            console.log('error: ', err);
        }
    }

    render(){

        const { repository, loading } = this.state;
        return (
            <View style={{flex:1}}>
                {
                    loading ?
                            <ActivityIndicator color='#7159c1'
                                                size={60}
                                                style={{justifyContent:"center",
                                                alignItems:'center'}}
                            />
                            : <WebView
                                style={{ flex: 1 }}
                                source={{ uri: repository }}
                            />
                }
            </View>
        )
    }
}

export default Webview;
