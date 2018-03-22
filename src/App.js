import React, { Component } from 'react';
import './App.css';


export default class extends Component {
  state = {
    text: ""
  }

  render() {
    return (
      <div>
        <h1>Todo Lists With LocalStorage</h1>
        <form onSubmit={this.onSearch}>
          <input type="text"
                 value={this.state.text}
                 onChange={ (e) => this.setState({ text: e.target.value})} />
          <button type="button">Search</button>
        </form>
      </div>
    )
  }
}
