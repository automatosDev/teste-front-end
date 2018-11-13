import React from "react";

const CardContact = ({ contact }) => {
  return (
    <li key={contact.first_name} className="contact-list-item">
      <div
        className="contact-avatar"
        style={{ backgroundImage: `url(${contact.avatar})` }}
      />
      <div className="contact-details">
        <p>{contact.first_name}</p>
        <p>{contact.last_name}</p>
      </div>
    </li>
  );
};

export default CardContact;
