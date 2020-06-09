import React, { Component } from "react";
import Stock from "../components/Stock";
const shortid = require('shortid');

class StockContainer extends Component {
  renderStocks = () => {
    return this.props.stocks.map((stockObj) => (
      <Stock key={shortid.generate()} stock={stockObj} toggleStockBuy={this.props.toggleStockBuy} />
    ));
  };

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.renderStocks()}
      </div>
    );
  }
}

export default StockContainer;
