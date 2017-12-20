import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import CreateBook from './CreateBook'
import CreateCollection from './CreateCollection'

class Collections extends Component {
  constructor(props) {
    super(props);
		this.openModalCreateBook = this.openModalCreateBook.bind(this);
		this.openModalCreateCollection = this.openModalCreateCollection.bind(this);

		this.state={
			isModalCreateBookOpen:false,
			isModalCreateCollectionOpen:false
		}
  }

  componentWillMount() {
    this.props.actions.loadCollections();
  }
  componentWillReceiveProps(next){
    if(next.Collections.flagBook===true){
      this.openModalCreateBook()
      this.props.actions.putFlagCloseModalCreateBook(false)
    }
    if(next.Collections.flagCollection===true){
      this.openModalCreateCollection()
      this.props.actions.putFlagCloseModalCreateCollection(false)
    }
  }
	openModalCreateBook(){
		this.setState({isModalCreateBookOpen:!this.state.isModalCreateBookOpen})
	}
	openModalCreateCollection(){
		this.setState({isModalCreateCollectionOpen:!this.state.isModalCreateCollectionOpen})
	}
  render() {

    const {Collections}=this.props
    return (
      <div className="container">
        <div>

            <button className="btn btn-primary" onClick={this.openModalCreateCollection}>Add New Collection</button>
            <button className="btn btn-primary" onClick={this.openModalCreateBook}>Add New Book</button>

        </div>

        <div className="row">
          <div className="col-lg-12">
            {Collections.collections.length > 0
              ? <div className="table-scrollable">
                  <table className="table table-hover table-striped table-condensed">
                    <thead>
                      <tr>
                        <th />
                        <th>Name</th>
                        <th>Description</th>
                        {/* <th>Books</th> */}
                      </tr>
                    </thead>

                    <tbody>
                      {Collections.collections.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              <Link to={'/show/:id'.replace(':id', item._id)}>
                                <button className="btn btn-default yellow">
                                  Display Collection
                                </button>
                              </Link>
                            </td>
                            <td>
                              {item.name}
                            </td>
                            <td>
                              {item.description}
                            </td>
                            {/* <td>
                              <ul>
                                {item.books.map(book => {
                                  console.log(book)
                                  return (
                                    <li>
                                      {book}
                                    </li>
                                  );
                                })}
                              </ul>
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              : <h2>Empty</h2>}
							<CreateBook modalIsOpen={this.state.isModalCreateBookOpen}
               closeModal={this.openModalCreateBook}/>
							<CreateCollection modalIsOpen={this.state.isModalCreateCollectionOpen} 
              closeModal={this.openModalCreateCollection}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
