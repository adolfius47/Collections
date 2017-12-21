import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../actions/actions';
import Modal from 'react-modal'
import { bindActionCreators } from 'redux'

class CreateBook extends Component {
  constructor(props) {
    super(props);


    this.state = {
      name: '',
      author: '',
      price: '',
      markForBook: 1,
      errors: false
    };
  }
  handlerName=(e)=> {
    this.setState({ name: e.target.value });
  }
  handlerGetAuthor=(e)=> {
    this.setState({ author: e.target.value });
  }
  handlerGetPrice=(e)=> {
    this.setState({ price: e.target.value });
  }
  handlerGetMark=(e)=> {
    this.setState({ markForBook: e });
  }
  addNewBook=() =>{
    if (
      this.state.name.length > 0 &&
      this.state.author.length > 2 &&
      this.state.price > 0
    ) {
      this.props.actions.AddBook({
          name: this.state.name,
          author: this.state.author,
          price: this.state.price,
          mark: this.state.markForBook
        })
      this.props.actions.putFlagCloseModalCreateBook(true)
      this.setState({
        valueNewPost: '',
        userForNewPost: '',
        errors: false
      });
    } else {
      this.setState({ errors: true });
    }
  }

  render() {
    let errorsInForm;

    if (this.state.errors) {
      errorsInForm = (
        <div className="red">
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
    return (<Modal
                onRequestClose={this.props.closeModal}
                ariaHideApp={false}
                isOpen={this.props.modalIsOpen}
            >
              <div className="close-button text-right">
              <div className="form-group">

                    {/*<h4 className="modal-title">Купити відео</h4>*/}
                    <button type="button" onClick={this.props.closeModal} className="close-form"
                            data-dismiss="modal" aria-hidden="true">×
                    </button>

                </div>
                </div>
        
        {errorsInForm}
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
              <input
                type="text"
                className="form-control"
                onChange={this.handlerGetAuthor}
                placeholder="Author"
                value={this.state.author}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                onChange={this.handlerGetPrice}
                placeholder="Price"
                type="number"
                value={this.state.price}
              />
            </div>
            <div className="form-group">
              <Select
                
                placeholder="Выберите оценку посту"
                options={options}
                onChange={this.handlerGetMark}
                value={this.state.markForBook}
              />
            </div>
            <div className="form-group text-right">
              <button
                className="btn btn-primary yellow"
                onClick={this.addNewBook}
                type="button"
              >
                Сохранить!
              </button>
            </div>
          </div>
        </div>
      
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);
