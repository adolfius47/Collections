import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';


class CollectionsList extends Component {
  constructor(props) {
    super(props);
    this.getNewPageNew = this.getNewPageNew.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadCollectionById(this.props.params.id);
  }

  render() {
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
              ><Link to={'/edit/:id'.replace(':id', this.props.params.id)}>
                <button className="btn btn-primary">Edit collection</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            {this.props.Invoices.invoices.length > 0
              ? <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Label</label>
                    <h4>
                      {this.props.Collection.id}
                    </h4>
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
    Invoices: state.Collections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsList);
