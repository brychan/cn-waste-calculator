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
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  callAPI() {
    fetch("http://192.168.1.159:9001/ingredients")
      .then(res => res.text())
      .then(res => this.setState({ allIngredients: JSON.parse(res) }));
  }
  componentWillMount() {
    this.callAPI();
  }

  handleAdd(ingredient){
    let addedIngredient = {
      listId: uuidv4(),
      id: ingredient.id,
      amountInput: '',
      rawName: ingredient.rawName,
      gramprice: ingredient.gramprice
    }

    this.setState({ 
      addedIngredients: [...this.state.addedIngredients, addedIngredient],
    });

  }

  calculateTotal(list){
    console.log(list);
    let total = list.reduce((acc, item) => parseFloat(acc) + (parseFloat(item.gramprice) * parseFloat(item.amountInput ? item.amountInput : 0)), 0);
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
          total += value * item.gramprice;
          return updatedItem;
        }
      total += item.amountInput * item.gramprice;
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
            <AddedIngredientsList 
              list={ this.state.addedIngredients }
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
