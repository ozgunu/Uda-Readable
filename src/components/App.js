import React, { Component } from 'react';
import * as api from '../utils/api';
import DefaultView from './DefaultView';
import CategoryView from './CategoryView';
import PostDetailView from './PostDetailView';
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>

          { /* Default View */ }
          <Route exact path="/" render={({history}) => (
            <DefaultView history={history} />
          )}/>
      
          { /* Category View */ }
          <Route path="/category/:category" render={({history, match}) => (
            <DefaultView history={history} params={match.params}/>
          )}/>

          { /* Post Detail View */ }
          <Route path="/post/:postId" render={({history, match}) => (
            <PostDetailView history={history} params={match.params}/>
          )}/>

      </div>
    );
  }
}

export default App;
