import React, { Component } from "react";
import {
  postUser
} from "./api/ContactAPI";


class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", job: "" };
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault();

    postUser(this.state).then(data => {
          if (data.hasOwnProperty("id")) {
            alert("Usuário inserido com sucesso.");
          } else {
            alert("Não foi possível inserir o usuário.");
          }})
        .then(this.setState({name:"",job:""}));
  }

  render() {
    return (
      <div className="create-contact col s6">
        <span className="label-create-container">Criar</span>
        <div className="create-container row s6">
          <form onSubmit={this.onSubmit}>
            <label>Nome</label>
            <div className="input-field">
              <input
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <label>Profissão</label>
            <div className="input-field">
              <input
                value={this.state.job}
                onChange={e => this.setState({ job: e.target.value })}
              />
            </div>
            <button className="btn">Adicionar</button>
          </form>
        </div>
        <div className="error-messages row s6"></div>
      </div>
    );
  }
}

export default CreateContact;
