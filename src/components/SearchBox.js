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
	      toggle: true,
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
		if ( value.length == 0 ){
			this.setState({ results: [], toggle:true });
		}
		if ( value.length >= 3 ) {
			let results = this.getResults(value);
			this.setState({ results: results, toggle: true });
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

	renderCollapseButton(resultsAmount) {
		let button = null;
		if (resultsAmount > 0) {
			button = <div
					 	className="float-middle m-1 p-0 text-light"
					 	role="button"
					 	onClick={ this.onToggle }>
						
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="-20px"
								 width="3rem" height="1.5rem" viewBox="0 0 451.847 451.847" 
								 >
							<g>
								<path
									transform="translate(0, 100)" 
									fill="white" 
									d={ !this.state.toggle ? 
									"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
									:
									"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0 L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4 c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z"
									}
									/>
							</g>
						</svg>
					</div>;
		}
		return button;
	}

	render () {

		return (
			<Col>
				<Col className="w-100 bg-dark">
					<SearchInput
						currentValue={this.state.ingredientInput} 
						onInputChange={this.handleChange}
						inputRef = { el => this.searchInputRef = el } />
				</Col>

				<div className="w-100"></div>

				<Col className="text-left bg-dark left-0 zindex-dropdown pb-2">
			       <SearchResults 
					list={this.state.results}
					toggle={this.state.toggle} 
					handleAdd = { this.props.handleAdd }
					searchInputRef = { this.searchInputRef } />
					<div className="d-flex justify-content-center">
						{ this.renderCollapseButton(this.state.results.length) }
					</div>
				</Col>

				<div className="w-100"></div>


			</Col>
		);
	}

}

export default SearchBox;