import React from 'react';
import { Row, Col, Button } from 'reactstrap';

class Header extends React.Component {
	render() {
		return (
			<Row className="w-100">
				<Col className="align-self-center">
					<span className="h2 display-8">Total { this.props.total.toFixed(2) } sek</span>
				</Col>
				<Col xs="3" className="float-right">
					<Button 
						color="danger"
						tabIndex="-1"
						onClick = { () => this.props.handleRemoveAll() }>
						Remove all
					</Button>
				</Col>
			</Row>

		);
	}
}

export default Header;