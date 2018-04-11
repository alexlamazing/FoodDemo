import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RestaurantShowItem from './RestaurantShowItem';
import RestaurantReviewForm from '../restaurantReviews/RestaurantReviewForm';
import RestaurantReviewListItem from '../restaurantReviews/RestaurantReviewListItem';
import { fetchRestaurant } from '../../actions';

class RestaurantShow extends Component {

  componentDidMount() {
    const restaurantId = this.props.match.params.id;
    this.props.fetchRestaurant(restaurantId);
  }

  renderRestaurantReviewForm(restaurantId) {
    return <RestaurantReviewForm restaurantId={restaurantId} />
  }

  renderRestaurantReviewList() {
    const { restaurantReviews } = this.props.restaurant;
    if (!restaurantReviews || restaurantReviews.length === 0) {
      return;
    }
    return _.map(restaurantReviews.reverse(), review => {
      return (<RestaurantReviewListItem review={ review } key={ review._id } />);
    });
  }

  renderRestaurantShowPage() {
    const { restaurant } = this.props;
    if (!restaurant || restaurant._id !== this.props.match.params.id) {
      return (
        <div className="col s12">
          <div className="progress container" style={ styles.loading }>
              <div className="indeterminate"></div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <RestaurantShowItem restaurant={ restaurant } />
        <div>
          <h5 style={ styles.restaurantReviewSectionTitle }>
            <span>{ restaurant.restaurantReviews.length } 則評價</span>
          </h5>
          <div>
            { this.renderRestaurantReviewForm(restaurant._id) }
          </div>
          <div>
            { this.renderRestaurantReviewList() }
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        { this.renderRestaurantShowPage() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    restaurant: state.restaurants.restaurant
  };
}

const styles = {
  loading: {
    marginTop: '30%'
  }
}

export default connect(mapStateToProps, { fetchRestaurant })(RestaurantShow);
