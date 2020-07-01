import React from 'react';
import AddedIngredient from './AddedIngredient';

class AddedIngredientsList extends React.Component {
	render () {
		return (
			<div>
				{(this.props.list.length > 0) ? 
						this.props.list.map( (item) => {
							return (
								<AddedIngredient
									key = {item.listId}
									ingredient = { item }
									amountInput = { this.props.amountInput } 
									handleDelete = { this.props.handleDelete }
									handleAmountChange = { this.props.handleAmountChange } 
								/>
								);
						}) 
					:
						'No items added' 
			}
			</div>
		);
	}
	
}

export default AddedIngredientsList;
