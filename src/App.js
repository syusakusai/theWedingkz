
import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
// import ProductList from './ProductList';
import AddProduct from './AddProduct/AddProduct';
import { urlAPI } from './Helper'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      response: {}
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    console.log('urlAPI:', urlAPI())
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    const apiUrl = urlAPI() + 'register';
    console.log(apiUrl)

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      // myHeaders
    };
    console.log('ini => ',options);

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddProduct: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>React Login</h1>
          {!this.state.isAddProduct && <Button variant="primary" onClick={() => this.onCreate()}>Login Here</Button>}
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {this.state.isAddProduct && <AddProduct onFormSubmit={this.onFormSubmit}/>}
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Container>
      </div>
    );
  }
}

export default App;