import React, { Component } from "react";

class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", job: "" };
  }

  onSubmit(e) {
    e.preventDefault();

    const { onSubmit } = this.props;

    onSubmit(this.state);
  }

  render() {
    return (
      <div className="create-contact">
        <span>Criar</span>
        <br />
        <form onSubmit={this.onSubmit.bind(this)} className="col s4">
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
              type="profissao"
              value={this.state.job}
              onChange={e => this.setState({ job: e.target.value })}
            />
          </div>
          <button className="btn">Adicionar</button>
        </form>
      </div>
    );
  }
}

export default CreateContact;
