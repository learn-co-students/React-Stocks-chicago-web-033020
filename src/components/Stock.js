import React from "react";

class Stock extends React.Component {

  handleClick = () => {
    this.props.buyStock ? this.props.buyStock(this.props.stock) : this.props.sellStock(this.props.stock)
  }

  render() {
    return (
      <div>
        <div className="card">
          <div
            className="card-body"
            onClick={this.handleClick}
          >
            <h5 className="card-title">{this.props.stock.name}</h5>
            <p className="card-text">
              {this.props.stock.ticker} : {this.props.stock.price}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Stock;
