import MaterializeJS from 'materialize-css/dist/js/materialize.js';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const renderField = ({ input, label, type, textarea, meta: { touched, error, warning, invalid } }) => {
  const textareaType = <textarea {...input} placeholder={label}  type={type} className={`materialize-textarea form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
  const inputType = <input {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;

  return (
    <div>
      <div>
        {textarea ? textareaType : inputType}
        {touched && ((error && <span className="red-text">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

const ratingSelectOptions = [
  {text: '1', value: '1'},
  {text: '2', value: '2'},
  {text: '3', value: '3'},
  {text: '4', value: '4'},
  {text: '5', value: '5'}
];

class RestaurantReviewForm extends Component {

  componentDidMount() {
    const elem = document.querySelector('select');
    MaterializeJS.FormSelect.init(elem);
  }

  renderTextArea() {
    return (<Field name="message" component={ renderField } type="text" label="發表評論..." textarea={true} />);
  }

  renderSubmitButton() {
    return (
      <button type="submit" className="btn waves-effect waves-light orange right white-text" style={{marginTop: '0px'}}>
        提交
        <i className="material-icons right">send</i>
      </button>
    );
  }

  renderScoreAndSubmitButton() {

    const renderRatingField = ({ input, type, meta: { touched, error }, children }) => (
      <div className="row valign-wrapper" style={{ marginBottom: '0px' }}>
        <div className="col s6 m6 l6">
          <select {...input} style={{ display:'inline' }}>
            <option value="" disabled >評分:</option>
            {children}
          </select>
        </div>
        <div className="col s6 m6 l6">
          { touched && error && <span className="error" style={{ color:'red' } }>{ error }</span>}
        </div>
      </div>
    );

    return (
      <div className="row">
        <div className="col s8 m8 l8">
          <Field name="rating" component={ renderRatingField }>
            { ratingSelectOptions.map(option => <option value={ option.value } key={ option.value }>{ option.text }</option>) }
          </Field>
        </div>
        <div className="col s4 m4 l4">
          { this.props.auth ? this.renderSubmitButton() : '' }
        </div>
      </div>
    );
  }

  render() {
    const { auth, handleSubmit, submitRestaurantReview, formValues, restaurantId, history } = this.props;

    return (
      <div>
        <form
          onSubmit={
            handleSubmit(() => {
              submitRestaurantReview(formValues, restaurantId, history);
            })
          }
        >
          <div className="row valign-wrapper">
            <div className="col s2 m1 l1">
              <img src={ auth && auth.avatarURL ? auth.avatarURL : 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png' } alt="Profile pic" className="circle responsive-img" />
            </div>
            <div className="col s10 m11 l11">
                { auth ? this.renderTextArea() : <div><a href="/auth/google">登入</a>後方可評論</div> }
                { auth ? this.renderScoreAndSubmitButton() : '' }
            </div>
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.restaurantReviewForm.values,
    auth: state.auth
  };
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name, errorEmpty }) => {
    if (!values[name]) {
      errors[name] = errorEmpty;
    }
  });

  if (!values["message"]) {
    errors["message"] = '請輸入評論';
  }

  if (!values["rating"]) {
    errors["rating"] = '請評分';
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'restaurantReviewForm'
})(connect(mapStateToProps, actions)(withRouter(RestaurantReviewForm)));
