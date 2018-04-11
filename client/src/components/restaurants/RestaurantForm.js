import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import RestaurantField from './RestaurantField';
import formFields from './formFields';
import Dropzone from 'react-dropzone';
import * as actions from '../../actions';

class RestaurantForm extends Component {

  constructor() {
    super()
    this.state = {
      files: [],
      dropError:''
    }
  }

  onDrop(files) {
    this.setState({
      files: files,
      dropError: ''
    });
    this.props.uploadRestaurantThumbnail(files);
  }

  onDropRejected(files) {
    this.setState({ dropError: 'error' });
  }

  renderFields() {
    return _.map(formFields, ({ label, name, placeholder }) => {
      return (
        <Field key={ name } type="text" name={ name } label={ label } placeholder={ placeholder } component={ RestaurantField } />
      );
    });
  }

  render() {
    const { restaurantThumbnails } = this.props;
    return (
      <div>
        <form onSubmit={ this.props.handleSubmit(this.props.onRestaurantSubmit) }>

          <div className="row">
            <div className="col s12 m5 l4">
              <section>
                <div className="dropzone" style={{ width: '200px', margin: 'auto' }}>
                  <Dropzone
                    onDrop={ this.onDrop.bind(this) }
                    onDropRejected={ this.onDropRejected.bind(this) }
                    accept="image/jpeg, image/png, image/gif"
                    maxSize={524288}
                    multiple={false}
                    style={{ backgroundColor: '#fff3e0', padding: '5px' }}>
                    <div className="row valign-wrapper center-align" style={{ height: '250px', marginBottom: '0' }}>
                      <div className="col" style={{ margin: 'auto' }}>
                        { restaurantThumbnails && restaurantThumbnails.length > 0 ? restaurantThumbnails.map((file) => <img key={ file.preview } src={ file.preview } alt="preview" style={{ maxWidth: '190px', maxHeight: '240px' }} /> ) : <div><div>餐廳圖片</div><div className="grey-text">點擊選擇圖片或拖曳圖片到這裡</div></div> }
                      </div>
                    </div>
                  </Dropzone>
                </div>
                <div>
                  { this.state.dropError && this.state.dropError !== '' ? <div className="red-text center">檔案格式錯誤；上傳圖片必須為 jpg/gif/png 及小於 512KB</div> : '' }
                </div>
              </section>
            </div>
            <div className="col s12 m7 l8">
              {this.renderFields()}
            </div>
          </div>

          <Link to="/" className="red btn-flat white-text">
            <i className="material-icons left">close</i>
            取消
          </Link>
          <button type="submit" className="btn waves-effect waves-light green darken-1 right white-text">
            下一步
            <i className="material-icons right">chevron_right</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name, errorEmpty }) => {
    if (!values[name]) {
      errors[name] = errorEmpty;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return {
    restaurantThumbnails: state.restaurantThumbnails
  };
}

export default reduxForm({
  validate: validate,
  form: 'restaurantForm',
  destroyOnUnmount: false
})(connect(mapStateToProps, actions)(RestaurantForm));
