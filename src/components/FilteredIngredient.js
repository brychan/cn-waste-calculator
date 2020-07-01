import React from 'react';
import { Row, Col, Button } from 'reactstrap';

class FilteredIngredient extends React.Component {
	constructor(props) {
		super(props);
		this.handleAdd = this.handleAdd.bind(this);
	}

	handleAdd() {
		this.props.handleAdd(this.props.ingredient);
	}

	render() {
		return(
			<Row className="border-top border-secondary py-1">
				<Col className="align-self-center">
					<span>
						{this.props.ingredient.name}
					</span>
				</Col>
				<Col xs="3" className="float-right">
					<Button
						className="" 
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