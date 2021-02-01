import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import main from './pages/Main/index'
import repository from './pages/Repository/index'

function Router(){

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={main} />,
                <Route path="/repository/:repository" exec component={repository} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
