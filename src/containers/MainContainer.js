import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      allStocks: [],
      displayedStocks: [],
      portfolio: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          allStocks: json,
          displayedStocks: json
        });
      });
  }

  buyStock = (stock) => {
    if (!this.state.portfolio.includes(stock)) {
      this.setState((prevState) => ({
        portfolio: [...prevState.portfolio, stock],
      }));
    }
  };

  sellStock = (soldStock) => {
    this.setState((prevState) => ({
      portfolio: prevState.portfolio.filter((stock) => stock !== soldStock),
    }));
  };

  handleFilter = (value) => {
    this.setState({
      displayedStocks: this.state.allStocks.filter((stock) => stock.type === value)
    })
  }

  handleSort = (value) => {
    if (value === "Alphabetically"){
      this.setState((prevState) => ({
        displayedStocks: prevState.displayedStocks.sort((a, b) => (a.name > b.name) ? 1 : -1)
      }))
    } else {
      this.setState((prevState) => ({
        displayedStocks: prevState.displayedStocks.sort((a, b) => (a.price < b.price) ? 1: -1)
      }))
    }
  }

  render() {
    return (
      <div>
        <SearchBar 
          handleFilter={this.handleFilter}
          handleSort={this.handleSort}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.state.displayedStocks}
              buyStock={this.buyStock}
              portfolio={this.state.portfolio}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              portfolio={this.state.portfolio}
              sellStock={this.sellStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
