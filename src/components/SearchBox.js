import React from 'react';

import { Row, Col, Button } from 'reactstrap';

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
		let results = this.props.list.filter((ingredient) => ingredient.name.toLowerCase().includes(lowerCaseValue));
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

	renderButtonPanel(resultsAmount) {
		let text, hide, close = null;
		if (resultsAmount > 0) {
			text = 	<small className="float-left m-2">
						{ (this.state.toggle) ? 
							`Showing ${ resultsAmount } results.` :
							`Hiding ${ resultsAmount } results.`
						}
					</small>;
			hide = <Button 
						color="danger"
						size="sm"
						className="float-right m-1"
						onClick={ this.handleClose }>&#9747;
					</Button>;
			close = <Button
					 	className="float-right m-1"
					 	size="sm"
					 	color={(this.state.toggle) ? 'secondary' : 'info'}
					 	onClick={ this.onToggle }>
						 	{ (this.state.toggle) ? '\u2198' : '\u2196' }
					</Button>;
		}

		return (<div>
			{ text }
			{ hide }
			{ close }
		</div>);
	}

	render () {
		return (
			<Row className="fixed-bottom bg-dark text-white p-1 container-width mx-auto">
				<Col>
					{ this.renderButtonPanel(this.state.results.length) }
				</Col>
				<div className="w-100"></div>

				<Col>
			       <SearchResults 
					list={this.state.results}
					toggle={this.state.toggle} 
					handleAdd= { this.props.handleAdd } /> 
				</Col>
				<div className="w-100"></div>

				<Col className="px-2 bg-dark">
					<SearchInput
						currentValue={this.state.ingredientInput} 
						onInputChange={this.handleChange} />
				</Col>
			</Row>
		);
	}

}

export default SearchBox;