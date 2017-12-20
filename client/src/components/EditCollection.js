import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions/actions';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

class EditCollection extends Component {
  constructor(props) {
    super(props);
    this.handlerGetDescription = this.handlerGetDescription.bind(this);
    this.handlerName = this.handlerName.bind(this);
    this.handlerChangeRating = this.handlerChangeRating.bind(this);
    this.handlerAddBookToCollection = this.handlerAddBookToCollection.bind(this);
    this.handlerSaveData = this.handlerSaveData.bind(this);
    this.handlerRemoveBookFromCollection = this.handlerRemoveBookFromCollection.bind(this);

    this.state = {
      name: '',
      description: '',

      errors: false
    };
  }
  componentWillMount() {
    this.props.actions.loadSingleCollection(this.props.params.id);
    this.props.actions.loadBooks();
  }
  componentWillReceiveProps(next) {
    if (
      this.props.Collections.singleCollection !==
      next.Collections.singleCollection
    ) {
      this.setState({
        name: next.Collections.singleCollection.name,
        description: next.Collections.singleCollection.description
      });
    }
  }
  handlerName(e) {
    this.setState({ name: e.target.value });
  }
  handlerGetDescription(e) {
    this.setState({ description: e.target.value });
  }

  handlerSaveData() {
    if (this.state.name.length > 0 && this.state.description.length > 2) {
      this.props.actions.putCollection(this.props.params.id,{
        name: this.state.name,
        description: this.state.description
      });
      this.setState({
        name: '',
        description: '',
        errors: false
      });
    } else {
      this.setState({ errors: true });
    }
  }

  handlerChangeRating(id, item, e) {

    this.props.actions.setRating(id, e.value);
    item.rating=e.value
    this.props.actions.putBook(id, item);
  }
  handlerAddBookToCollection(id) {
    let data={
			bookId:id
		}

    this.props.actions.AddBookToCollection(this.props.params.id, data);
  }
  handlerRemoveBookFromCollection(id){


    this.props.actions.RemoveBookFromCollection(this.props.params.id, id);
  }
  render() {
    let errorsInForm;
    const { books,singleCollection } = this.props.Collections;

    if (this.state.errors) {
      errorsInForm = (
        <div className="all-data__errors">
          <h3>Write data correctly</h3>
        </div>
      );
    } else {
      errorsInForm = null;
    }
    let options = [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 }
    ];
		let booksByIDForAdd=singleCollection&&singleCollection.books?singleCollection.books.map(item=>{
			return item._id
		}):[]
		let filteredBooksForAdd=books.filter(item=>{

			if(booksByIDForAdd.indexOf(item._id)==-1){
			return true}		})
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {errorsInForm}
            <Link to="/">
              <button className="btn btn-default">
                Back to Collections List
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                onChange={this.handlerName}
                placeholder="Name"
                value={this.state.name}
              />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                onChange={this.handlerGetDescription}
                placeholder="Description"
                value={this.state.description}
              />
            </div>
						<div className="form-group">
              <h2>Books in collection</h2>
              {singleCollection&&singleCollection.books&&singleCollection.books.length > 0
                ? <table className="table table-hover table-striped table-condensed">
                    <thead>
                      <tr>
                        <th />
                        <th>Name</th>
                        <th>Price</th>
                        <th>Author</th>
                        <th>Rating</th>
                      </tr>
                    </thead>

                    <tbody>
                      {singleCollection.books.map((item, key) => {
                        let rating = { label: item.rating, value: item.rating };
                        return (
                          <tr key={key}>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={this.handlerRemoveBookFromCollection.bind(this,item._id)}
                              >
                                Remove book from collection
                              </button>
                            </td>
                            <td>
                              {item.name}
                            </td>
                            <td>
                              {item.price}
                            </td>
                            <td>
                              {item.author}
                            </td>
                            <td>
                              <Select
                                value={rating}
                                options={options}
                                onChange={this.handlerChangeRating.bind(
                                  this,
                                  item._id,
                                  item
                                )}
                                clearable={false}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                : null}
            </div>
            <div className="form-group">
              <h2>All Books</h2>
              {filteredBooksForAdd.length > 0
                ? <table className="table table-hover table-striped table-condensed">
                    <thead>
                      <tr>
                        <th />
                        <th>Name</th>
                        <th>Price</th>
                        <th>Author</th>
                        <th>Rating</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredBooksForAdd.map((item, key) => {
                        let rating = { label: item.rating, value: item.rating };

                        return (
                          <tr key={key}>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={this.handlerAddBookToCollection.bind(this,item._id)}
                              >
                                Add book to collection
                              </button>
                            </td>
                            <td>
                              {item.name}
                            </td>
                            <td>
                              {item.price}
                            </td>
                            <td>
                              {item.author}
                            </td>
                            <td>
                              <Select
                                value={rating}
                                options={options}
                                onChange={this.handlerChangeRating.bind(
                                  this,
                                  item._id,
                                  item
                                )}
                                clearable={false}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                : null}
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary"
                onClick={this.handlerSaveData}
                type="button"
              >
                Save!
              </button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCollection);
