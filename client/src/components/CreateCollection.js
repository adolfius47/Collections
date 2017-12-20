	import React, {Component} from "react";
	import {connect} from "react-redux";
  import * as actions from '../actions/actions'
  import Modal from 'react-modal'
  import { bindActionCreators } from 'redux'

	class CreateCollection extends Component {
		constructor(props){
			super(props)
			this.handlerGetDescription=this.handlerGetDescription.bind(this)
			this.handlerName=this.handlerName.bind(this)
			this.addNewCollection=this.addNewCollection.bind(this)


			this.state={
				name:'',
				description:'',

				errors:false,
			}
		}
		handlerName(e){
				this.setState({name:e.target.value})
		}
		handlerGetDescription(e){
				this.setState({description:e.target.value})
		}

		addNewCollection(){
			if(this.state.name.length>0&&this.state.description.length>2){
				this.props.actions.AddCollection({
					name:this.state.name,
					description:this.state.description,
				})
			this.props.actions.putFlagCloseModalCreateCollection(true)

			this.setState({
				name:'',
				description:'',
				errors:false})
			}else{
				this.setState({errors:true})
			}
		}



		render() {
			let errorsInForm


			if(this.state.errors){
				errorsInForm=<div className="all-data__errors"><h3>Write data correctly</h3></div>
			}else{
				errorsInForm=null
			}

			return <Modal
                  onRequestClose={this.props.closeModal}

                  isOpen={this.props.modalIsOpen}
              >
                <div className="close-button">
					<div className="form-group">

                      {/*<h4 className="modal-title">Купити відео</h4>*/}
                      <button type="button" onClick={this.props.closeModal} className="close-form"
                              data-dismiss="modal" aria-hidden="true">×
                      </button>

                  	</div>
                  </div>
      
						<div className='row'>
						{errorsInForm}
            <div className="col-md-12">
                              <div className="form-group">

                               <input type="text" className="form-control"
                                onChange={this.handlerName}
                                 placeholder="Name"
                                 value={this.state.name}/>
                               </div>
                               <div className="form-group">
                               <input type="text" className="form-control"
                                onChange={this.handlerGetDescription}
                                 placeholder="Description"
                                 value={this.state.description}/>
                               </div>
                               <div className="form-group text-right">
                                      <button className="btn btn-primary"
                                       onClick={this.addNewCollection} type="button">Save!</button>
                                     </div>
                         </div>

						</div>
					
        </Modal>
		}
	}

	function mapStateToProps(state) {
	  return {
	    Collections: state.Collections,
	  };
	}

	function mapDispatchToProps(dispatch) {
	  return {
	    actions: bindActionCreators(actions, dispatch),
	  };
	}

	export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection);
