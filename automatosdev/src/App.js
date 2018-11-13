import React, { Component } from 'react'
import ListUsers from './ListUsers'
import NavigationBar from './NavigationBar'
import CreateUser from './CreateUser'
import * as PagesAPI from './utils/GetPagesAPI'
import './CSS/normalize.css'
import './CSS/style.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  state = {
    actual_page: 0,
    total_pages: 0,
    page_info:{}
  }

  componentDidMount() {
    PagesAPI.getFirstPage().then((page) => {
      this.setState({
        actual_page: page.page,
        total_pages: page.total_pages,
        page_info: page
      })
    })
  }

  nextPage() {
    if(this.state.actual_page < this.state.total_pages) {
      PagesAPI.getPage(this.state.actual_page + 1).then((page) => {
        this.setState({
          actual_page: page.page,
          total_pages: page.total_pages,
          page_info: page
        })
      })
    }
  }

  previousPage() {
    if(this.state.actual_page !== 1) {
      PagesAPI.getPage(this.state.actual_page - 1).then((page) => {
        this.setState({
          actual_page: page.page,
          total_pages: page.total_pages,
          page_info: page
        })
      })
    }
  }

  createUser(event) {
    event.preventDefault();

    if(event.target.name.value !== '' && event.target.job.value !== '') {
      var userData = {
        name: event.target.name.value,
        job: event.target.job.value
      }

      PagesAPI.createUser(userData).then((val) => {
        console.log(val);
      })
    }
  }

  render(){
    return (
      <div>
      <div className='leftBar'>
      <ListUsers 
      users={typeof this.state.page_info.data != 'undefined' ? this.state.page_info.data : []} 
      />
      <NavigationBar 
      previousPage={this.previousPage}
      nextPage={this.nextPage}
      />
      </div>
      <div className='rightBar'>
      <CreateUser
      createUser={this.createUser}
      />
      </div>
      </div>
      )
  }

}

export default App;