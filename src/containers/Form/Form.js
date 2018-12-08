import React, { Component } from 'react';
import './Form.css';

import FormField from '../../components/FormField/FormField';

class Form extends Component {
  picInput = React.createRef();

  render() {
    const formFields = this.props.formFields.map( formField => (
      <FormField
        key={formField.name}
        name={formField.name}
        type={formField.type}
        value={formField.value}
        className={formField.className}
        inputContainerClassName={formField.inputContainerClassName}
        changed={(event) => this.props.changed(formField.name, event)} />
    ))

    return (
      <div className="Form">
        <div className="FormTitle">
          Criar
        </div>
        {formFields}
        <div className="PictureUploadButton" onClick={() => this.picInput.click()}>
          <input 
            id="uploadPicture"
            type="file"
            ref={input => this.picInput = input}
            onChange={event => this.props.uploadedPic(event)} />
          Foto
        </div>
        <div className="AddButton" onClick={this.props.posted}>
          Adicionar
        </div> 
      </div>
    );
  }
}

export default Form;