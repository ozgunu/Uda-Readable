import React, { Component } from 'react';
import * as api from '../utils/api';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    api.fetchCategories().then(categories => {
      //categories.map(category => console.log(category.name));
      this.setState({categories});
    });
  }
  
  render() {
    return (
      <div>
        Hello world!
        <ul>
          {this.state.categories.map(category => (
            <li key={category.name}>
              <div>{category.name}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
