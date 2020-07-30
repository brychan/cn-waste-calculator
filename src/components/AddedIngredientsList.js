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
						<div className="py-3">
							No items added.
						</div>
			}
			</div>
		);
	}
	
}

export default AddedIngredientsList;
