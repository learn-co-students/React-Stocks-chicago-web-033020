import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      sortBy: "",
      filter: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then((resp) => resp.json())
      .then((stocks) => {
        const modifiedStocks = stocks.map((stock) => ({
          ...stock,
          bought: false,
        }));
        this.setState({ stocks: modifiedStocks });
      });
  }

  grabMine = () => {
    return this.state.stocks.filter((stock) => stock.bought === true);
  };

  toggleStockBuy = (stock) => {
    const updatedStocks = this.state.stocks.map((stockObj) => {
      return stockObj.id === stock.id
        ? { ...stock, bought: !stock.bought }
        : stockObj;
    });
    this.setState({
      stocks: updatedStocks,
    });
  };

  handleSortChange = (event) => {
    this.setState({
      sortBy: event.target.value,
    });
  };

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  filterIndustry = () => {
    let filteredStocks = this.state.stocks
    switch (this.state.filter) {
      case "Tech":
        return filteredStocks.filter(stock=> stock.type === "Tech")
      case "Sportswear":
        return filteredStocks.filter(stock=> stock.type === "Sportswear")
      case "Finance":
        return filteredStocks.filter(stock=> stock.type === "Finance")
      case "":
        return filteredStocks
    }
  }

  sortBy = () => {
    let sortedStocks = this.filterIndustry();
    switch (this.state.sortBy) {
      case "Alphabetically":
        return sortedStocks.sort((stock1, stock2) =>
          stock1.name.localeCompare(stock2.name)
        );
      case "Price":
        return sortedStocks.sort((stock1,stock2)=> stock1.price - stock2.price)
      default:
        return this.state.stocks;
    }
  };

  render() {
    return (
      <div>
        <SearchBar handleSortChange={this.handleSortChange} handleFilterChange={this.handleFilterChange} sorting={this.state.sortBy}/>
        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.sortBy()}
              toggleStockBuy={this.toggleStockBuy}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={this.grabMine()}
              toggleStockBuy={this.toggleStockBuy}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
