import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
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

class SearchBar extends Component {

  render() {
    const { handleSubmit, searchRestaurants, formValues, history } = this.props;
    return (
      <div className="search-bar" style={{ margin:'50px 50px' }}>
        <form
          onSubmit={
            handleSubmit(() => {
              searchRestaurants(formValues.keyword, 1, history);
            })
          }
        >
          <div className="search">
            <button className="fa fa-search" style={{ border: 'none', background: 'none' }}></button>
            <Field name="keyword" component={renderField} type="text" label="餐廳名稱 / 地址" />
          </div>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    formValues: state.form.simpleSearchForm ? state.form.simpleSearchForm.values : ''
  };
}

export default reduxForm({
  form: 'simpleSearchForm'
})(connect(mapStateToProps, actions)(withRouter(SearchBar)));
