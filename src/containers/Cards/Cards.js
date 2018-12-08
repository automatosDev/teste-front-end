import React, { Component } from 'react';
import './Cards.css';
import Card from '../../components/Card/Card'

class Cards extends Component {
  render() {
    let pages = parseInt(this.props.cards.length / 6 + 1);

    if (this.props.cards.length % 6 === 0)
      pages--
    
    const pagesComponents = [];
    
    for (let index = 0; index < pages; index++) {
      pagesComponents[index] = (
        <div key={index} className="PageComponent" onClick={() => this.props.pageClicked(index)}>
          {index + 1}
        </div>
      );
    }

    const page = this.props.page;

    return (
      <div className="Cards">
        <div className="CardsContainer">
          {this.props.cards.map( (card, index) => {
            if (index < page * 6 && index + 1 > page * 6 - 6) {
              return (
                <Card 
                  key={card.id}
                  firstName={card.first_name}
                  lastName={card.last_name}
                  avatar={card.avatar} />
              )
            }
          }
          )}
        </div>
        <div className="Pages">
          {pagesComponents}
        </div>
      </div>
    );
  }
}

export default Cards;