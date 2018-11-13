import React, { Component } from "react";
import CardContact from "./CardContact";

class ListContacts extends Component {
  constructor() {
    super();
    this.state = { cards: [], actualPage: 1 };
  }

  componentDidMount() {
    const { actualPage } = this.state;
    fetch(`https://reqres.in/api/users?page=${actualPage}`)
      .then(response => response.json())
      .then(result => {
        this.setState({ cards: result.data });
      });
  }
  render() {
    const { cards } = this.state;
    console.log(cards);
    return (
      <div className="list-contacts">
        Lista Contatos
        <ul>
          {cards.map(card => (
            <CardContact contact={card} />
          ))}
        </ul>
      </div>
    );
  }
}

export default ListContacts;
