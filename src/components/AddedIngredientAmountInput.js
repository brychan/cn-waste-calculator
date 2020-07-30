import React from 'react';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

class AddedIngredientAmountInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.handleAmountChange(event.target.value, this.props.ingredient.listId);
	}

	render () {
		return (
		<InputGroup>
			<Input 
				type="text" 
				name="amount"
				placeholder="0"
				value={ this.props.ingredient.amountInput > 0 ? this.props.ingredient.amountInput : ''} 
				onChange={ this.handleChange } />
	        <InputGroupAddon addonType="append">
	          	<Button 
	          		color="danger"
	          		tabIndex="-1"
	          		onClick = { () => this.props.handleDelete(this.props.ingredient.listId) }>
	          		X
	          	</Button>
	        </InputGroupAddon>
      	</InputGroup>

		);
	}
}

export default AddedIngredientAmountInput;