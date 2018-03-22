import React, { Component } from "react";
import GithubCorner from "react-github-corner";

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
        <GithubCorner href="https://github.com/lewenweijia/vanilla-react-weather-app" />
        <h1>广东省市级天气查询</h1>
        <table style={{ background: "white", borderRadius: 5 }}>
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
                      <button
                        onClick={() => this.handleClick(city.adcode)}
                        style={{
                          border: "none",
                          padding: 10,
                          background: "#588DFF",
                          color: "white",
                          borderRadius: 5
                        }}
                      >
                        Get the Weather
                      </button>
                    </td>
                    <td>
                      <span>Weather Info: </span>
                      {this.state.weathers[city.adcode]
                        ? this.state.weathers[city.adcode].weather
                        : null}
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
