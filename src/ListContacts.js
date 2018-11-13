import React, { Component } from "react";
import CardContact from "./CardContact";

class ListContacts extends Component {

  render() {
    const { cards } = this.props;
    return (
      <div className="list-contacts">
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
