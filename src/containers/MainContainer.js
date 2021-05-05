import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor(){
    super()
    this.state = {
      stocks: [],
      portfolioStocks: []
    }
  }

  componentDidMount() {
    fetch (`http://localhost:3001/stocks`)
    .then (res => res.json())
    .then (data => {
      this.setState({
        stocks: data 
      })
    })
  }

  buyStock = (stockObj) => {
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stockObj]
    })
  }

  sellStock = (stockObj) => {
    this.state.portfolioStocks.findIndex(stockObj)
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(stock => stock.id !== stockObj.id)
    })
  }

  render() {
    return (
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer sellStock={this.sellStock} portfolioStocks={this.state.portfolioStocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
