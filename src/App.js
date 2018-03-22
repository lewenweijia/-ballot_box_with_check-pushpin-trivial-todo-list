import React, { Component } from "react";
import "./App.css";

import { fetchCitysInfo, fetchCityWeatherInfo } from "./utils";

export default class extends Component {
  state = {
    text: "",
    citys: null,
    adcodes: [],
    weathers: {}
  };

  componentDidMount() {
    fetchCitysInfo().then(res => this.setState({ citys: res }));
  }

  handleClick = adcode => {
    if (this.state.adcodes.includes(adcode)) {
      return this.state.weathers[adcode];
    }
    fetchCityWeatherInfo(adcode).then(res => {
      const weather = res.lives[0];
      this.setState({ weathers: { [adcode]: { ...weather } } });
    });
  };

  render() {
    return (
      <div style={{ marginLeft: 50 }}>
        <h1>广东省市级天气查询</h1>
        <table>
          <thead>
            <tr>
              <th>城市</th>
            </tr>
          </thead>
          <tbody>
            {this.state.citys
              ? this.state.citys.map(city => (
                  <tr key={city.adcode}>
                    <td>{city.name}</td>
                    <td>
                      <button onClick={() => this.handleClick(city.adcode)}>
                        Get the Weather
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}
