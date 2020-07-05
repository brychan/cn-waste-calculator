import React from 'react';
import { Input } from 'reactstrap';

class SearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onInputChange(event.target.value);
	}

	render () {
		return (
			<Input 
				type="text"
				placeholder="Type an ingredient..." 
				name="ingredient"
				className="my-1 mx-0 px-3 text-white border-0 bg-secondary" 
				value={ this.props.currentValue } 
				onChange={ this.handleChange } />
		);
	}
}

export default SearchInput;