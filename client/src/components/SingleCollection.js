import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';


class CollectionsList extends Component {
  

  componentWillMount() {
    this.props.actions.loadSingleCollection(this.props.params.id);
    this.props.actions.loadBooks();
  }

  render() {
    const {Collections}=this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <Link to="/">
                <button className="btn btn-default">
                  Back to Collections List
                </button>
              </Link>
              <Link to={'/edit/:id'.replace(':id', this.props.params.id)}>
                <button className="btn btn-primary">Edit collection</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            {Collections.singleCollection
              ? <div>
                <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <h4>
                    {Collections.singleCollection.name}
                  </h4>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Description</label>
                  <h4>
                    {Collections.singleCollection.description}
                  </h4>
                </div>
              </div>
                <div className="row">
                <div className="col-md-12">
                  <label className="form-label">Books</label>
                  <h4>
                    {Collections.singleCollection&&Collections.singleCollection.books.length>0?
                      <table className="table table-hover table-striped table-condensed">
                      <thead>
                        <tr>

                          <th>Name</th>
                          <th>Price</th>
                          <th>Author</th>
                          <th>Rating</th>
                        </tr>
                      </thead>

                      <tbody>
                      {Collections.singleCollection.books.map(item=>{
                      return <tr>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.author}</td>
                        <td>{item.rating}</td>
                      </tr>
                    })}</tbody></table>:null}
                  </h4>
                </div>
                </div>
              </div>
              : <h2>Empty</h2>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Collections: state.Collections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsList);
