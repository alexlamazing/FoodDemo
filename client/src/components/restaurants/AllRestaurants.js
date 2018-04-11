import React, { Component } from 'react';
import RestaurantList from './RestaurantList';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';

const RESTAURANTS_PER_PAGE = 12;

class AllRestaurants extends Component {

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      restaurants: []
    }
  }

  loadRestaurantsFromServer() {
    $.ajax({
      url      : '/api/restaurants',
      data     : {limit: RESTAURANTS_PER_PAGE, offset: this.state.offset},
      dataType : 'json',
      type     : 'GET',

      success: data => {
        this.setState({restaurants: data.docs, pageCount: Math.ceil(data.total / data.limit)});
      },

      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }


  componentDidMount() {
    this.loadRestaurantsFromServer();
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * RESTAURANTS_PER_PAGE);

    this.setState({offset: offset}, () => {
      this.loadRestaurantsFromServer();
    });
  };

  render() {
    return (
      <div>
        <div>
          <RestaurantList restaurants={ this.state.restaurants } />
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} />
        </div>
      </div>
    );
  }

}

export default AllRestaurants;
