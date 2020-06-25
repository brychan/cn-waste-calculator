import React from 'react';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

class AddedIngredientAmountInput extends React.Component {
	constructor(props) {
		super(props);
		this.amountInput = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.handleAmountChange(event.target.value, this.props.ingredient.listId);
		console.log('handleChange at AddedIngredientAmountInput',event.target.value);
	}

	componentDidMount() {
		this.amountInput.current.focus();
	}

	render () {
		return (
		<InputGroup>
			<Input 
				type="text" 
				name="amount" 
				placeholder="0"
				ref={ this.amountInput }
				value={ this.props.ingredient.amountInput } 
				onChange={ this.handleChange } />
	        <InputGroupAddon addonType="append">
	          	<Button 
	          		color="danger"
	          		onClick = { () => this.props.handleDelete(this.props.ingredient.listId) }>
	          		X
	          	</Button>
	        </InputGroupAddon>
      	</InputGroup>

		);
	}
}

export default AddedIngredientAmountInput;