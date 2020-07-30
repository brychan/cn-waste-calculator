import React from 'react';
import { Row, Col, Button } from 'reactstrap';

class FilteredIngredient extends React.Component {
	constructor(props) {
		super(props);
		this.handleAdd = this.handleAdd.bind(this);
	}

	handleAdd() {
		this.props.handleAdd(this.props.ingredient);
		this.props.searchInputRef.focus();
	}

	render() {
		const badge = () => {
			switch(this.props.ingredient.type) {
			  case 'recipe':
				return <span className="badge badge-pill badge-info mx-2">
					Recipe
				</span>
			  case 'processedIngredient':
				return <span className="badge badge-pill badge-success mx-2">
					Processed
				</span>
			  default:
				return <span className="badge badge-pill badge-warning mx-2">
					Ingredient
				</span>
			} 
		}

		return(
			<Row className="border-top border-secondary py-1">
				<Col className="align-self-center">
					<span>
						{this.props.ingredient.name}
					</span>
					{ badge() }
				</Col>
				<Col xs="3" className="float-right">
					<Button
						className="float-right" 
						color="info"
						onClick={ this.handleAdd }>
						Add
					</Button>
				</Col>
			</Row>
		);
	}
}

export default FilteredIngredient;