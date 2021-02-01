import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main/index';
import User from './pages/User/index';
import Webview from './pages/WebView/index';

const Routes = createAppContainer(
    createStackNavigator({
        Main,
        User,
        Webview,
    },{
        defaultNavigationOptions:{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#7159c1'
            }
        }
    })
)

export default Routes;
