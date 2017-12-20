import React from "react";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import App from './components/App'
import ListCollections from './components/ListCollections'
import EditCollection from './components/EditCollection'
import SingleCollection from './components/SingleCollection'

const createRouter = (getState, dispatch) => {


    return (
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={ListCollections}/>
                <Route path='/edit/:id' component={EditCollection}/>
                <Route path='/show/:id' component={SingleCollection}/>


            </Route>
        </Router>
    )
}

export default createRouter;
