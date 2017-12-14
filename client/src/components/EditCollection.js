	import React, {Component} from "react";
	import {connect} from "react-redux";
	import {Link} from 'react-router'
  import * as actions from '../actions/actions'
import { bindActionCreators } from 'redux'

	class CreateCollection extends Component {
		constructor(props){
			super(props)
			this.handlerGetDescription=this.handlerGetDescription.bind(this)
			this.handlerGetAuthor=this.handlerGetAuthor.bind(this)
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

			return  <div className="container">
						<div className='row'>
              <div className="col-md-12">
						{errorsInForm}
            <Link to="/">
              <button className="btn btn-default">
                Back to Collections List
              </button>
            </Link>
          </div>
        </div>
        <div className='row'>
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
                               <div className="form-group">

                                      <button className="new-post__button"
                                       onClick={this.addNewCollection} type="button">Save!</button>
                                     </div>
                         </div>

						</div>
					</div>

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
