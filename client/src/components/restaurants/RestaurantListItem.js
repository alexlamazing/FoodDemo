import React, { Component } from 'react';
import { Link } from "react-router-dom";

class RestaurantListItem extends Component {

  render() {

    const { _id, title, subTitle, thumbnail } = this.props.restaurant;

    return (
      <div className="col s6 m3 l2" key={ _id } style={ styles.restaurantItem } >
        <Link to={`/restaurant/${_id}`}>
          <div>
            <div className="card-image hoverable">
              <img src={ thumbnail ? thumbnail : 'https://www.classicposters.com/images/nopicture.gif' } alt={subTitle} title={title} className="responsive-img" />
            </div>
          </div>
        </Link>
      </div>
    );

  }

}

const styles = {
  restaurantItem: {
    marginLeft: '0',
    marginBottom: '20px'
  }
}

export default RestaurantListItem;
