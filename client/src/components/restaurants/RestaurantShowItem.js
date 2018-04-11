import React, { Component } from 'react';

const timeZone = {timeZone:"Asia/Hong_Kong"};

class RestaurantShowItem extends Component {

  render() {

    const { nameEng, nameBig5, thumbnail, address, tel, _createdBy, createdAt, updatedAt } = this.props.restaurant;

    return (
      <div className="row">
        <div className="col s4 m3 l2" style={ styles.restaurantItem }>
          <div className="card-image">
            <img src={ thumbnail ? thumbnail : 'https://www.classicposters.com/images/nopicture.gif' } alt={ nameBig5 } className="responsive-img" />
          </div>
        </div>
        <div className="col s8 m9 l10">
          <h5 style={ styles.restaurantTitle }>{nameBig5}</h5>
          { nameEng ? <h6 style={ styles.restaurantSubTitle }>{nameEng}</h6> : '' }
          <div className="row" style={ styles.restaurantDetails }>
            { address ? <div><div className="col s4 m3 l2" style={ styles.restaurantDetailsRow }>地址</div><div className="col s8 m9 l10">{ address }</div></div> : '' }
            { tel ? <div><div className="col s4 m3 l2" style={ styles.restaurantDetailsRow }>電話</div><div className="col s8 m9 l10">{ tel }</div></div> : '' }
          </div>
          <div>
            <div>以上資料由 { _createdBy.displayName } 於 { new Date(createdAt).toLocaleDateString('en-GB',timeZone) } 提供</div>
            <div>最後更新：{ new Date(updatedAt).toLocaleDateString('en-GB',timeZone) } { new Date(updatedAt).toLocaleTimeString('en-GB',timeZone) }</div>
          </div>
        </div>
      </div>
    );
  }

}

const styles = {
  restaurantItem: {
    paddingLeft: '0'
  },
  restaurantTitle: {
    margin: '0 auto'
  },
  restaurantSubTitle: {
    margin: '0 auto',
    color: 'grey'
  },
  restaurantDetails: {
    margin: '20px 0'
  },
  restaurantDetailsRow: {
    padding: '0'
  }
}

export default RestaurantShowItem;
