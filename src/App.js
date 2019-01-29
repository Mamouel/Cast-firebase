import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import Home from './components/home/Home'
import StoryDetails from './components/stories/StoryDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateStory from './components/stories/CreateStory';
import Profile from './components/profile/Profile';
import SearchResults from './components/stories/SearchResults';
import StoriesLibrary from './components/stories/StoriesLibrary';


import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/story/:id' component={StoryDetails} />
            <Route path='/stories' component={StoriesLibrary} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateStory} />
            <Route path='/profile' component={Profile} />
            <Route path='/search' component={SearchResults} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;