import React from 'react';
import './Card.css';

const card = (props) => {
  const avatarStyle = {
    backgroundImage: 'url(' + props.avatar + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }

  return (
    <div className="Card">
      <div className="CardAvatar" style={avatarStyle}>
      </div>
      <div className="CardInfo">
        <div className="NameContainer">
          <p>{props.firstName}</p>
          <p>{props.lastName}</p>
        </div>
      </div>
    </div>
  )
}

export default card;