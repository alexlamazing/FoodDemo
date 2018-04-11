import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const RestaurantFormReview = ({ onCancel, formValues, submitRestaurant, history, restaurantThumbnails }) => {
  const reviewFields = _.map(formFields, (field) => {
    return (
      <div key={ field.name }>
        <h6 className="grey-text">{ field.label }</h6>
        <div>
          { formValues[field.name] ? formValues[field.name] : '(沒有數值)' }
        </div>
      </div>
    )
  })

  return (
    <div>
      <h5 className="center">請確認以下資料無誤</h5>
      <div style={{ margin: '30px auto' }}>
        {reviewFields}
      </div>
      { restaurantThumbnails && restaurantThumbnails.length > 0 ?
      <div className="row">
        <div className="col s12">
          <label style={{ fontSize: '16px', display: 'block' }}>餐廳圖片：</label>
          { restaurantThumbnails.map((file) => <img key={ file.preview } alt="preview" src={ file.preview } />) }
        </div>
      </div>
      : '' }
      <button className="yellow darken-3 btn-flat white-text" onClick={ onCancel }>
        <i className="material-icons left">chevron_left</i>
        返回
      </button>
      <button className="green darken-1 btn-flat right white-text" onClick={() => submitRestaurant(formValues, restaurantThumbnails, history)}>
        提交
        <i className="material-icons right">done</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.restaurantForm.values,
    restaurantThumbnails: state.restaurantThumbnails
  };
}

export default connect(mapStateToProps, actions)(withRouter(RestaurantFormReview));
