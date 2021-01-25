import React from 'react';
import { Row, Col, Button } from 'reactstrap';

class Header extends React.Component {
	render() {
		return (
			<Row className="w-100">
				<Col className="text-left ml-3">
					<span className="h2 display-8">Total { this.props.total.toFixed(1) }kr</span>
				</Col>
				<Col className="float-right col-auto">
					{ this.props.list.length > 0 && (
					<Button 
						color="danger"
						onClick = { () => this.props.handleRemoveAll() }>
						Remove all({this.props.list.length})
					</Button> 
					)}
				</Col>
			</Row>

		);
	}
}

export default Header;