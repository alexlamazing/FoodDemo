import _ from 'lodash';
import React, { Component } from 'react';
import RestaurantListItem from './RestaurantListItem';

class RestaurantList extends Component {

  renderRestaurantList() {

    const { restaurants } = this.props;

    if (!restaurants || restaurants.length === 0) {
      return (
        <div className="col s12">
          <div className="progress container" style={ styles.loading }>
            <div className="indeterminate"></div>
          </div>
        </div>
      );
    }

    if (restaurants.message) {
      return (
        <div className="col s12" style={{ textAlign: 'center' }}>
          對不起，沒有相關餐廳。
        </div>
      );
    }

    return _.map(restaurants, (restaurant) => {
      return (
        <RestaurantListItem restaurant={ restaurant } key={ restaurant._id } />
      );
    });

  }

  render() {
    return (
      <div className="row" style={ styles.flex }>
        { this.renderRestaurantList() }
      </div>
    );
  }
}

const styles = {
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flexStart'
  },
  loading: {
    marginTop: '30%'
  }
}

export default RestaurantList;
