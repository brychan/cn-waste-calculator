import React from 'react';
import { Col } from 'reactstrap';

class Header extends React.Component {
	render() {
		return (
			<Col>
				<h2 className="display-8">Total { this.props.total.toFixed(2) } sek</h2>
			</Col>
		);
	}
}

export default Header;