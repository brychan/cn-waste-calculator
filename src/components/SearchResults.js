import React from 'react';
import { Spring, animated } from 'react-spring/renderprops';
import FilteredIngredientsList from './FilteredIngredientsList';

class SearchResults extends React.Component {
	render () {
		return (


			<Spring
            native
            force
            config={{ tension: 2000, friction: 100, precision: 1 }}
            from={{ height: this.props.toggle ? 0 : 'auto', opacity: this.props.toggle ? 0: 1 }}
            to={{ height: this.props.toggle ? 'auto' : 0, opacity: this.props.toggle ? 1 : 0}}>
            {props => (
              <animated.div className="item" style={props}>
				<FilteredIngredientsList  
					list={ this.props.list }
					handleAdd = { this.props.handleAdd } />
              </animated.div>
            )}
          </Spring>
		);
	}
}

export default SearchResults;