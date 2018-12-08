import React from 'react';
import './FormField.css';

const formField = (props) => {
  return (
    <div className={props.className}>
      <label htmlFor={props.name}>{props.name}</label>
      <div className={props.inputContainerClassName}>
        <input 
          type={props.type}
          id={props.name} 
          value={props.value}
          onChange={props.changed} />
      </div> 
    </div>
  )
}

export default formField;