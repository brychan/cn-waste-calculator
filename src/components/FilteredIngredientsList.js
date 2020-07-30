import React from 'react';
import { Container } from 'reactstrap';

import FilteredIngredient from './FilteredIngredient';

class FilteredIngredientsList extends React.Component {
	render () {
		return (
			<Container fluid={true} className="px-0">
				{ this.props.list.map((item) => {
					return (
						<FilteredIngredient 
							key = { item.searchableId }
							ingredient = { item }
							handleAdd = { this.props.handleAdd } 
						/>);
				})} 
			</Container>
		);
	}
}

export default FilteredIngredientsList;