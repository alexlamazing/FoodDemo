import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import AllRestaurants from './restaurants/AllRestaurants';
import RestaurantCreate from './restaurants/RestaurantCreate';
import RestaurantShow from './restaurants/RestaurantShow';
import SearchResult from './search/SearchResult';

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container" style={{ margin: '20px auto 50px' }}>
                <Route exact={true} path="/" component={Landing} />
                <Route exact={true} path="/restaurants/create" component={RestaurantCreate} />
                <Route exact={true} path="/restaurants" component={AllRestaurants} />
                <Route exact={true} path="/restaurant/:id" component={RestaurantShow} />
                <Route path="/search/result/:pageNum" component={SearchResult} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
