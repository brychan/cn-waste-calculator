import React from 'react';
import { Spring, animated } from 'react-spring/renderprops';
//import { useTransition, animated } from 'react-spring';
import FilteredIngredientsList from './FilteredIngredientsList';



function SearchResults(props) {
  /*const animationProps = useSpring({
      dspl: props.toggle ? 1 : 0,
      height: props.toggle ? 'auto' : 0, 
      //opacity: props.toggle ? 1 : 0,
  })*/
	//return (
    /*<animated.div 
      style={{
        ...animationProps,
        display: animationProps.dspl.interpolate((displ) =>
          displ === 0 ? 'none' : 'initial'
        ),
      }}>


    <FilteredIngredientsList  
                  list={ props.list }
                  handleAdd = { props.handleAdd } />
    </animated.div>);*/
			/*return (<Spring
            native
            force
            config={{ tension: 2000, friction: 100, precision: 1 }}
            to={{ height: props.toggle ? 'auto' : 0, opacity: props.toggle ? 1 : 0 }}>
            { animationProps => (
              <animated.div 
                className="item" 
                style={{
                  ...animationProps,
                  display: props.toggle ? 'initial' : 'none'
                }}>
        				<FilteredIngredientsList  
                  list={ props.list }
                  handleAdd = { props.handleAdd } />
              </animated.div>
            )}
      </Spring>);*/

      return <Spring
            native
            force
            config={{ tension: 2000, friction: 100, precision: 1 }}
            to={{ 
              height: props.toggle ? 'auto' : 0,
              display: props.toggle ? 'block' : 'none'
            }}>
            {aprops => (
              <animated.div className="item" style={aprops}>
                <FilteredIngredientsList  
                  list={ props.list }
                  handleAdd = { props.handleAdd } />
              </animated.div>
            )}
          </Spring>



}

export default SearchResults;