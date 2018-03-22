import React, { Component } from 'react';
import './App.css';

export default class extends Component {
  state = {
    text: "",
    citys: null
  }

  componentDidMount() {
    fetch("http://restapi.amap.com/v3/config/district?key=848da042ee8ec428269dea5432ede9f8&keywords=广东&subdistrict=1&extensions=base")
      .then(res => res.json())
      .then(result => result.districts[0].districts)
      .then(citys => citys.map(city => ({ adcode: city.adcode, name: city.name })))
      .then(filterCitysInfo => this.setState({citys: filterCitysInfo}))
  }

  render() {
    return (
      <div style={{ marginLeft: 50}}>
        <h1>广东省市级天气</h1>
        <table>
          <thead>
            <tr>
              <th>城市</th>
              <th>adcode</th>
            </tr>
          </thead>
          <tbody>
            {this.state.citys ? this.state.citys.map(city => (
              <tr>
                <td>{city.name}</td>
                <td>{city.adcode}</td>
              </tr>
            )) : null } 
      </tbody>
        </table>
      </div>
    )
  }
}
