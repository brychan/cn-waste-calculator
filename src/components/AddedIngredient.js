import React from 'react';
import { Row, Col } from 'reactstrap';
import AddedIngrentAmountInput from './AddedIngredientAmountInput';

class AddedIngredient extends React.Component {

	componentWillLeave() {
		console.log('AddedIngredient Will Leave');
	}
	render() {
	return (
		<Row 
			key={ this.props.ingredient.listId }
			className="border-bottom py-1">
			<Col className="align-self-center">
				{ this.props.ingredient.name }<br/>
				<small className="text-muted">Add amount in <b>grams</b>.</small>
			</Col>
			<Col xs="4" className="align-self-center">
				<AddedIngrentAmountInput
					//currentValue = {1}
					ingredient = { this.props.ingredient }
					amountInput = { this.props.amountInput }
					handleAmountChange = { this.props.handleAmountChange }
					handleDelete = { this.props.handleDelete } />
			</Col>
		</Row>
	);
	}
}

export default AddedIngredient;