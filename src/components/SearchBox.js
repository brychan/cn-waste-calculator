import React from 'react';

import { Container, Row, Col, Button } from 'reactstrap';

import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	      ingredientInput: '',
	      results: [],
	      toggle: true
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	getResults(value) {
		let lowerCaseValue = value.toLowerCase();
		let results = this.props.list.filter((ingredient) => ingredient.rawName.toLowerCase().includes(lowerCaseValue));
		return results;
	}

	handleChange(value) {
		this.setState({ ingredientInput: value });
		if ( value.length >= 3 ) {
			let results = this.getResults(value);
			this.setState({ results: results });
		}
	}

	handleClose() {
		this.setState({ ingredientInput: '',
						results: [], 
					});
	}

	onToggle = () => {
		this.setState(state => ({ toggle: !state.toggle }))
	}

	render () {
		return (
			<Row xs="1" className="fixed-bottom bg-dark text-white p-1">
				<Col>
					<small className="">
					{ (this.state.toggle) ? 
						`Showing ${ this.state.results.length } results.` :
						`Hiding ${this.state.results.length} results.`
					}
					</small>
					{ (this.state.results.length > 0) ?
						<Button 
						color="danger"
						size="sm"
						className="float-right m-1 align-self-center"
						onClick={ this.handleClose }>&#9747;</Button> : ''
					 }
					 { (this.state.results.length > 0) ?
					 	<Button
						 	className="float-right m-1 align-self-center"
						 	size="sm"
						 	color={(this.state.toggle) ? 'secondary' : 'info'}
						 	onClick={ this.onToggle }>{
						 		(this.state.toggle) ?
						 			'\u2198' : '\u2196'
						 	}</Button>
					 	: ''
					 }
				</Col>
				<div className="w-100"></div>

				<Col>
			       <SearchResults 
					list={this.state.results}
					toggle={this.state.toggle} 
					handleAdd= { this.props.handleAdd } /> 
				</Col>
				<div className="w-100"></div>

				<Col className="px-4">
					<SearchInput
						currentValue={this.state.ingredientInput} 
						onInputChange={this.handleChange} />
				</Col>
			</Row>
		);
	}

}

export default SearchBox;