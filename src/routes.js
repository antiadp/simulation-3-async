import React from 'react';
import { Route, Switch} from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search';

export default (
 <Switch>
    <Route exact path= '/' component={Landing}/>
    <Route exact path='/Dashboard' component={Dashboard}/>
    <Route path='/Profile' component={Profile}/>
    <Route path='/Search' component={Search}/>
 </Switch>   
)