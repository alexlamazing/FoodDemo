import React, { Component } from 'react';

const timeZone = {timeZone:"Asia/Hong_Kong"};

class RestaurantReviewListItem extends Component {

  render() {

    const { _id, message, rating, _createdBy, createdAt } = this.props.review;

    var stars = [];
    for (var i = 0; i < rating; i++) {
      stars.push(<span key={i} style={{ display: 'inline' }}><img src="http://www.iconhot.com/icon/png/colobrush/16/star-53.png" alt="star" /></span>);
    }

    return (
      <div className="row" key={ _id }>
        <div className="col s12 m12 l12">
          <div className="row">
            <div className="col s2 m1 l1">
              <img src={ _createdBy.avatarURL ? _createdBy.avatarURL : 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png' } alt="Profile pic" className="circle responsive-img" />
            </div>
            <div className="col s6 m8 l9">
              <div>
                <span className="black-text"><strong>{ _createdBy.displayName ? _createdBy.displayName : '' }</strong></span>
                <div>
                  <span className="blue-grey-text text-lighten-3" style={ styles.restaurantReviewDate }>{ new Date(createdAt).toLocaleDateString('en-GB',timeZone) }</span>
                </div>
              </div>
              <div>{message}</div>
            </div>
            <div className="col s4 m3 l2">
              <div className="blue-grey-text text-darken-1">{ rating ? stars : '' }</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const styles = {
  restaurantReviewSectionTitle: {
    marginBottom: '20px'
  },
  restaurantReviewDate: {
    fontSize: '0.8em'
  }
}

export default RestaurantReviewListItem;
