import React, { Component } from "react";
import Stock from "../components/Stock";
const shortid = require('shortid');

class PortfolioContainer extends Component {
  renderStocks = () => {
    return this.props.stocks.map((stockObj) => (
      <Stock key={shortid.generate()} stock={stockObj} toggleStockBuy={this.props.toggleStockBuy}/>
    ));
  };

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.renderStocks()}
      </div>
    );
  }
}

export default PortfolioContainer;
