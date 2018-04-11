import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import RestaurantForm from './RestaurantForm';
import RestaurantFormReview from './RestaurantFormReview';

class RestaurantCreate extends Component {

  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <RestaurantFormReview onCancel={() => this.setState({ showFormReview: false })} />;
    }
    return <RestaurantForm onRestaurantSubmit={() => this.setState({ showFormReview: true })} />
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'restaurantForm'
})(RestaurantCreate);
