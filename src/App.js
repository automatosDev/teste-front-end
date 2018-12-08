import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Cards from './containers/Cards/Cards';
import Form from './containers/Form/Form';

class App extends Component {
  state = {
    cards: [],
    formFields: [
      {name: "Primeiro Nome", type: "text", value: "", className:"FormField", inputContainerClassName: "InputContainer"},
      {name: "Sobrenome", type: "text", value: "", className:"FormField", inputContainerClassName: "InputContainer"}
    ],
    picUploaded: null,
    page: 1
  }

  getData = () => {
    axios.get('https://reqres.in/api/users')
      .then( response => {
        this.setState({
          cards: response.data.data
        })
      })
      .catch( () => {
        console.log('error');
      });
  } 

  postData = () => {
    const firstName = this.state.formFields[0].value;
    const lastName = this.state.formFields[1].value;
    const picture = this.state.picUploaded;
    axios.post('https://reqres.in/api/users', { first_name: firstName, last_name: lastName, avatar: picture })
      .then( response => {
        const responseData = response.data
        this.setState({
          cards: [
            ...this.state.cards,
            responseData
          ],
          picUploaded: null
        })
      });
  }

  inputChanged = (fieldName, event) => {
    const inputIndex = this.state.formFields.findIndex( field => field.name === fieldName )
    this.setState({
      formFields: this.state.formFields.map( (field, index) => {
        if (index !== inputIndex) {
          return {
            ...field
          }
        }
        return {
          ...field,
          value: event.target.value
        }
      }),
    })
  }

  uploadPic = (event) => {
    let reader = new FileReader();

    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0])
    }

    reader.onload = event => {
      this.setState({
        picUploaded: event.target.result
      })
    }
  }

  clickPage = (index) => {
    this.setState({
      page: index + 1
    })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <div className="Container" >
          <Cards 
            cards={this.state.cards}
            page={this.state.page}
            pageClicked={this.clickPage} />
          <Form 
            formFields={this.state.formFields}
            changed={this.inputChanged}
            uploadedPic={this.uploadPic}
            posted={this.postData} />
        </div>
      </div>
    );
  }
}

export default App;
