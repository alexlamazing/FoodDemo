import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './search/SearchBar';
import RestaurantList from './restaurants/RestaurantList';
import * as actions from '../actions';

class Landing extends Component {

  componentDidMount() {
    this.props.fetchRecentRestaurants();
  }

  renderLandingPageContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        return (
          <div className="fixed-action-btn">
            <Link to="/restaurants/create" className="btn-floating btn-large orange">
              <i className="small material-icons">add</i>
            </Link>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <SearchBar />
        <div>
          <h1 style={ styles.sectionTitle }><span style={{ paddingLeft: '12px' }}>最近新增</span></h1>
          <RestaurantList restaurants={ this.props.restaurants } />
        </div>
        { this.renderLandingPageContent() }
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    restaurants: state.restaurants.recentRestaurants
  };
}

const styles = {
  sectionTitle: {
    fontSize: '2em'
  }
}

export default connect(mapStateToProps, actions)(Landing);
