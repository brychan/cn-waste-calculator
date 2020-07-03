import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col } from 'reactstrap';


import Header from './components/Header';
import AddedIngredientsList from './components/AddedIngredientsList';
import SearchBox from './components/SearchBox';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allIngredients: [],
      addedIngredients: [],
      total: 0,
      isLoading: true,
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  callAPI() {
    let PROD_URL = "https://ingredientsbook-api.herokuapp.com/book";
    let DEV_URL = "http://192.168.1.159:9001/book";
    fetch( process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL )
      .then(res => res.text())
      .then(res => {
        this.createSearchableTable(JSON.parse(res));
        this.setState({ allIngredients: this.createSearchableTable(JSON.parse(res)) });
      });
  }
  createSearchableTable(response) {
    /*
      Parse all to one single searchable table with
      id, name, avg price, unit, TYPE (for highlighting recipe etc.)
    */

    let table = [];
    response.ingredients.forEach((ingredient) => {
      let item = {
        id: ingredient.id,
        searchableId: uuidv4(),
        name: ingredient.name,
        avgPrice: ingredient.average_price_unit,
        unit: ingredient.unit,
        type: 'ingredient'
      }
      table.push(item);
    });
    response.processedIngredients.forEach((pIngredient) => {
      let baseIngredient = table.find( o => o.id === pIngredient.ingredient && o.type === 'ingredient');
      let item = {
        id: pIngredient.id,
        searchableId: uuidv4(),
        name: pIngredient.name,
        avgPrice: baseIngredient.avgPrice / pIngredient.yield,
        unit: baseIngredient.unit,
        type: 'processedIngredient'
      }
      table.push(item);
    });
    response.recipes.forEach((recipe) => {
      let output_weight = 0;
      let price = 0;
      response.recipesIngredients.forEach((ri) => {
        if (recipe.id === ri.recipe) {
          let ingredient = null; 
          if (ri.type === 'i') {
            ingredient = table.find( o => o.id === ri.ingredient && o.type === 'ingredient');
          } else {
            ingredient = table.find( o => o.id === ri.processed_ingredient && o.type === 'processedIngredient');
          }
          price = ingredient ? ((ingredient.avgPrice * ri.amount) + price) : price;
          output_weight = output_weight + ri.amount;
        }
      });
      let item = {
        id: recipe.id,
        searchableId: uuidv4(),
        name: recipe.name,
        avgPrice: price / output_weight,
        unit: recipe.output_weight_unit,
        type: 'recipe'
      }
      table.push(item);
    })
    this.setState({ isLoading: false });
    return table;
  }
  componentDidMount() {
    this.callAPI();
  }

  handleAdd(ingredient){
    let addedIngredient = {
      ...ingredient,
      amountInput: 0,
      listId: uuidv4(),
    }
    this.setState({ 
      addedIngredients: [...this.state.addedIngredients, addedIngredient],
    });

  }

  calculateTotal(list){
    let total = list.reduce((acc, item) => parseFloat(acc) + (parseFloat(item.avgPrice) * parseFloat(item.amountInput ? item.amountInput : 0)), 0);
    return total;
  }

  handleDelete(id) {
      let addedIngredients = this.state.addedIngredients.filter(item =>  item.listId !== id );
      let total = this.calculateTotal(addedIngredients);
      this.setState({ addedIngredients, total });
  }

  handleAmountChange(value, id){
    let total = 0;
    let updatedList = this.state.addedIngredients.map((item) => {
        if (item.listId === id) {
          const updatedItem = {
            ...item,
            amountInput: value
          }
          total += value * item.avgPrice;
          return updatedItem;
        }
      total += item.amountInput * item.avgPrice;
      return item;
    });
    this.setState({ addedIngredients:updatedList, total });
  }

  render() {
    return (
      <Container className="themed-container">
        <Row className="text-white bg-dark text-center pt-1">
          <Header total={ this.state.total } />
        </Row>
        <Row>
          <Col>
          { this.state.isLoading ? 'Loading...' : '' }
            <AddedIngredientsList 
              list={ this.state.addedIngredients }
              amountInput = {0}
              handleDelete = { this.handleDelete }
              handleAmountChange={ this.handleAmountChange }/>
          </Col>
        </Row>
          <SearchBox 
            list={ this.state.allIngredients }
            handleAdd={ this.handleAdd } />
      </Container>
    );
  }
}

export default App;
