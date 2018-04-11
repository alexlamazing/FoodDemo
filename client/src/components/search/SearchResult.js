import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchRestaurants } from '../../actions';
import RestaurantList from '../restaurants/RestaurantList';

class SearchResult extends Component {

  componentDidMount() {
    const pageNum = this.props.match.params.pageNum;
    const { history } = this.props;
    const query = this.props.location.search.substring(9, this.props.location.search.length + 1);
    this.props.searchRestaurants(query, pageNum, history);
  }

  render() {
    const { searchResults } = this.props;
    return (
      <div>
        <RestaurantList restaurants={searchResults} />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults
  }
}

export default connect(mapStateToProps, { searchRestaurants })(withRouter(SearchResult));
